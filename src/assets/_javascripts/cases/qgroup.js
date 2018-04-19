import { FileLoader, ObjectLoader, WebGLRenderer, BoxGeometry, MeshStandardMaterial, Mesh, Fog } from 'three';
// import { Stats } from 'three-stats';
// require('intersection-observer');

const TWEEN = require('@tweenjs/tween.js');

const Tunnel = {

    init: function () {
        const self = this;
        var dom = document.getElementById('tunnel');
        // var manager = new LoadingManager();

        // var textureLoader = new TextureLoader(manager);
        // var textures = {
        // 	"tunnel": textureLoader.load('tunnel_v2.png')
        // };

        // init only if the element with id tunnel excist and has not been initialized before
        if (dom && dom.hasChildNodes() === false) {
            var loader = new FileLoader();

            loader.load('/assets/work/qgroup/tunnel.json', function (text) {
                const player = new Tunnel.Player(self);
                player.load(JSON.parse(text));
                player.setSize(window.innerWidth, window.innerHeight);
                //player.play(); // start in intersectionObserver instead

                // document.body.appendChild(player.dom); // already in dom

                window.addEventListener('resize', function () {
                    player.setSize(window.innerWidth, window.innerHeight);
                });
            });
        }

    },

    Player: function () {
        var dom = document.getElementById('tunnel');

        let debug = false;
        var stats;
        var self = this;
        var loader = new ObjectLoader();
        var camera, scene, controls, renderer, cameraOrgPos;
        var mouseX = 0, mouseY = 0;
        var gyroPresent = false;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        var events = {};

        let touchCounter = 0;

        var domModal = document.getElementById('loginModal');
        var heroContent = document.querySelector('hero__header');
        var heroMetabox = document.querySelector('metabox');
        var domCloseModal = document.getElementById('closeModal');

        this.dom = dom;

        this.width = 500;
        this.height = 500;

        var gyro = {
            absolute: 0,
            alpha: 0,
            beta: 0,
            gamma: 0
        };

        // Settings for the tunnel
        let sizes = {
            height: 4,
            width: 0.1,
            depth: 0.02,
            end: 60 // the end of the tunnel
        }
        let numberOfRows = 20;
        let rowDistance = 4;
        let offset = 5;

        //Animation settings camera zoom
        this.cameraMinPos = 0;
        this.cameraMaxPos = sizes.end;
        this.zoomSpeed = 2000;

        let isPlaying = false;


        // load


        this.load = function (json, models) {
            if (debug) {
                stats = new Stats();
                dom.appendChild(stats.dom);
            }

            renderer = new WebGLRenderer({ antialias: true });
            renderer.setClearColor(0x5f11e8);
            // renderer.setPixelRatio(1);
            renderer.setPixelRatio(window.devicePixelRatio); // change this later if bad performence
            // renderer.setPixelRatio(0.5);


            var project = json.project;

            if (project.gammaInput) renderer.gammaInput = true;
            if (project.gammaOutput) renderer.gammaOutput = true;
            if (project.shadows) renderer.shadowMap.enabled = false;
            if (project.vr) renderer.vr.enabled = true;

            dom.appendChild(renderer.domElement);

            this.setScene(loader.parse(json.scene), json, models);
            this.setCamera(loader.parse(json.camera));
            this.setControls();

            events = {
                init: [],
                start: [],
                stop: [],
                keydown: [],
                keyup: [],
                mousedown: [],
                mouseup: [],
                mousemove: [],
                touchstart: [],
                touchend: [],
                touchmove: [],
                update: [],
                click: []
            };

            var scriptWrapParams = 'player,renderer,scene,camera';
            var scriptWrapResultObj = {};

            for (var eventKey in events) {

                scriptWrapParams += ',' + eventKey;
                scriptWrapResultObj[eventKey] = eventKey;

            }

            var scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(/\"/g, '');

            for (var uuid in json.scripts) {

                var object = scene.getObjectByProperty('uuid', uuid, true);

                if (object === undefined) {

                    console.warn('APP.Player: Script without object.', uuid);
                    continue;

                }

                var scripts = json.scripts[uuid];

                for (var i = 0; i < scripts.length; i++) {

                    var script = scripts[i];

                    var functions = (new Function(scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';').bind(object))(this, renderer, scene, camera);

                    for (var name in functions) {

                        if (functions[name] === undefined) continue;

                        if (events[name] === undefined) {

                            console.warn('APP.Player: Event type not supported (', name, ')');
                            continue;

                        }

                        events[name].push(functions[name].bind(object));

                    }

                }

            }

            dispatch(events.init, arguments);

        };

        this.setCamera = function (value) {

            camera = value;
            camera.aspect = this.width / this.height;
            camera.updateProjectionMatrix();
            cameraOrgPos = camera.position;

            if (renderer.vr.enabled) {

                dom.appendChild(WEBVR.createButton(renderer));

            }
        };

        this.setScene = function (jsonscene, json, models) {

            scene = jsonscene;

            let lightListGeometry = new BoxGeometry(sizes.depth, sizes.height, sizes.width);
            let lightListGeometryTop = new BoxGeometry(sizes.height * 0.754, sizes.depth, sizes.width);
            let lightListMaterial = new MeshStandardMaterial({
                "color": 0xb389ff,
                "roughness": 1,
                "metalness": 0,
                "emissive": 0xb389ff,
                "side": 0,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
                "skinning": true
            });

            // light strip wall left
            let lightlistLeft = new Mesh(lightListGeometry, lightListMaterial);
            lightlistLeft.position.set(3, 0, rowDistance + offset);
            scene.add(lightlistLeft);

            // light strip roof left
            let lightlistLeftTop = new Mesh(lightListGeometryTop, lightListMaterial);
            lightlistLeftTop.position.set(1.5, sizes.height / 2, rowDistance + offset);
            scene.add(lightlistLeftTop);

            // light strip wall right
            let lightlistRight = new Mesh(lightListGeometry, lightListMaterial);
            lightlistRight.position.set(-3, 0, 7);
            scene.add(lightlistRight);

            // light strip roof right
            let lightlistRightTop = new Mesh(lightListGeometryTop, lightListMaterial);
            lightlistRightTop.position.set(-1.5, sizes.height / 2, (1 * rowDistance + (rowDistance / 2)) + offset);
            scene.add(lightlistRightTop);

            for (let rowNr = 1; rowNr < numberOfRows; rowNr++) {
                let newLightlistLeft = lightlistLeft.clone();
                lightlistLeft.position.set(3, 0, (rowNr * rowDistance) + offset);
                scene.add(newLightlistLeft);

                // light strip roof left
                let newLightlistLeftTop = lightlistLeftTop.clone();
                lightlistLeftTop.position.set(1.5, sizes.height / 2, (rowNr * rowDistance) + offset);
                scene.add(newLightlistLeftTop);

                // light strip wall right
                let newLightlistRight = lightlistRight.clone();
                lightlistRight.position.set(-3, 0, (rowNr * rowDistance + (rowDistance / 2)) + offset);
                scene.add(newLightlistRight);

                // light strip roof right
                let newLightlistRightTop = lightlistRightTop.clone();
                lightlistRightTop.position.set(-1.5, sizes.height / 2, (rowNr * rowDistance + (rowDistance / 2)) + offset);
                scene.add(newLightlistRightTop);
            }


            let tunnel = scene.getObjectByName('tunnel', true);

            /// Tunnels forwards
            for (let i = 0; i < numberOfRows; i++) {
                let newTunnel = tunnel.clone();
                newTunnel.position.z = (i * 4) + offset;
                scene.add(newTunnel);
            }

            scene.fog = new Fog(0x5f11e8, 0, 50);
        };

        this.setControls = function () {
            // controls = new OrbitControls(camera, dom);
            // controls.enableKeys = false;
            // controls.enableZoom = false;
            // controls.mouseButtons = false;
        };

        this.setSize = function (width, height) {

            this.width = width;
            this.height = height;

            if (camera) {

                camera.aspect = this.width / this.height;
                camera.updateProjectionMatrix();

            }

            if (renderer) {

                renderer.setSize(width, height);

            }

        };

        function dispatch(array, event) {

            for (var i = 0, l = array.length; i < l; i++) {

                array[i](event);

            }

        }

        function openModal() {
            domModal.classList.remove('tunnel__modal--hidden');
            heroContent.classList.add('hero__header--hidden');
            heroMetabox.classList.add('metabox--hidden');
        }
        function closeModal() {
            domModal.classList.add('tunnel__modal--hidden');
            window.location.reload();
            heroContent.classList.remove('hero__header--hidden');
            heroMetabox.classList.remove('metabox--hidden');


            // this.stopTweenFrameUpdate = false;
            // camera.position = cameraOrgPos; // does not work
        }

        function countTouchTaps() {
            touchCounter++;
            if (touchCounter === 5) {
                self.speedZoom = true; // start tunnel animation
            }
        }

        this.speedZoomRunning = false;
        this.speedTweenActive = false;
        this.isTouch = false;
        this.stopTweenFrameUpdate = false;

        function speedUpZoom() {
            if (camera.position.z <= self.cameraMaxPos && !self.speedTweenActive) { // 267
                //controls.enabled = false;
                self.speedTweenActive = true;

                var animCam = { z: camera.position.z, x: camera.rotation.z };
                var tween = new TWEEN.Tween(animCam)
                    .to({ z: self.cameraMaxPos, x: -2 }, self.zoomSpeed)
                    .easing(TWEEN.Easing.Quintic.InOut)
                    .onUpdate(function () {
                        camera.position.z = animCam.z;
                        camera.rotation.z = animCam.x;
                    }).onComplete(function () {
                        self.stopTweenFrameUpdate = true;
                        openModal();
                    })
                    .start();
            }
        }

        function zoomCamera() {
            if (camera.position.z <= self.cameraMinPos + 8.01) { // 267
                camera.position.z = camera.position.z + 0.05;
            } else {
                camera.position.z = self.cameraMinPos;
            }
        }


        var prevTime;
        var lastCalledTime = Date.now()
        var fps = 0;
        var frameDrops = 0;
        var changedPerformeceOnce = false;

        // check if there is more then 15 frame drops under 45 fps, then lower performence
        function checkPerformence() {
            let delta = (Date.now() - lastCalledTime) / 1000;
            lastCalledTime = Date.now();
            fps = 1 / delta;
            if (fps <= 45) {
                frameDrops++;
            } else {
                frameDrops = 0;
            }
            if (frameDrops === 15 && !changedPerformeceOnce) {
                renderer.setPixelRatio(0.5);
                changedPerformeceOnce = true;
            }
        }

        function animate(time) {
            if (!changedPerformeceOnce && isPlaying) checkPerformence();

            //Camera rotation on mousemove & gyroscope movement
            if (!self.speedTweenActive) {
                if (gyroPresent) {
                    //Lite buggigt. Snygga till och sätt variabler. Sätt maxvärde.
                    if (window.innerHeight > window.innerWidth) {
                        camera.rotation.y = -gyro.gamma * 0.002;
                        camera.rotation.x = (-gyro.beta * 0.002) - 91.05;
                    } else {
                        //Fixa till, lite buggig
                        camera.rotation.y = -gyro.beta * 0.002;
                        camera.rotation.x = (gyro.gamma * 0.002) + 91.05;
                    }
                } else {
                    var ratioX = mouseX / windowHalfX;
                    var ratioY = mouseY / windowHalfY;
                    camera.rotation.x = 91.1 + (ratioY * 0.08);
                    camera.rotation.y = 0 + (ratioX * 0.1);
                }

            } else {
                camera.rotation.x = 91.1;
                camera.rotation.y = 0;
            }

            if (camera.position.z < self.cameraMinPos) {
                camera.position.z = self.cameraMinPos;
            }

            if (self.speedZoom) {
                speedUpZoom();
            } else {
                zoomCamera();
            }

            try {

                dispatch(events.update, { time: time, delta: time - prevTime });

            } catch (e) {

                console.error((e.message || e), (e.stack || ""));

            }

            // controls.movementSpeed = 0.33;
            // controls.update(time);

            if (!self.stopTweenFrameUpdate) {
                TWEEN.update();
            }

            renderer.render(scene, camera);

            prevTime = time;

            if (debug) stats.update();
        }

        this.play = function () {
            isPlaying = true;
            prevTime = performance.now();

            document.addEventListener('keydown', onDocumentKeyDown);
            document.addEventListener('keyup', onDocumentKeyUp);
            document.addEventListener('mousedown', onDocumentMouseDown);
            document.addEventListener('mouseup', onDocumentMouseUp);
            document.addEventListener('mousemove', onDocumentMouseMove);
            document.addEventListener('touchstart', onDocumentTouchStart);
            document.addEventListener('touchend', onDocumentTouchEnd);
            document.addEventListener('touchmove', onDocumentTouchMove);
            document.addEventListener('click', onDocumentClick);
            domCloseModal.addEventListener('click', onCloseModal);

            dispatch(events.start, arguments);

            renderer.animate(animate);

        };

        this.stop = function () {
            isPlaying = false;
            document.removeEventListener('keydown', onDocumentKeyDown);
            document.removeEventListener('keyup', onDocumentKeyUp);
            document.removeEventListener('mousedown', onDocumentMouseDown);
            document.removeEventListener('mouseup', onDocumentMouseUp);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            document.removeEventListener('touchstart', onDocumentTouchStart);
            document.removeEventListener('touchend', onDocumentTouchEnd);
            document.removeEventListener('touchmove', onDocumentTouchMove);
            document.removeEventListener('click', onDocumentClick);

            dispatch(events.stop, arguments);

            renderer.animate(null);

        };

        this.dispose = function () {

            while (dom.children.length) {
                console.log('dispose;', dom);
                dom.removeChild(dom.firstChild);

            }

            renderer.dispose();

            camera = undefined;
            scene = undefined;
            renderer = undefined;

        };

        function onDocumentKeyDown(event) {
            if (event["code"] === "KeyF") {
                self.speedZoom = true;
            }
            dispatch(events.keydown, event);

        };

        function onDocumentKeyUp(event) {

            dispatch(events.keyup, event);

        }

        function onDocumentMouseDown(event) {

            dispatch(events.mousedown, event);

        }

        function onDocumentMouseUp(event) {
            //self.speedZoom = false;
            //self.zoomRunning = false;
            dispatch(events.mouseup, event);

        }

        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);

            dispatch(events.mousemove, event);

        }

        function onDocumentTouchStart(event) {
            self.isTouch = true;
            dispatch(events.touchstart, event);

        }

        function onDocumentTouchEnd(event) {
            if (event.target.offsetParent.matches('.hero__content') || event.target.offsetParent.matches('.tunnel')) {
                countTouchTaps();
            }

            dispatch(events.touchend, event);

        }

        function onDocumentTouchMove(event) {
            dispatch(events.touchmove, event);

        }

        function onDocumentClick(event) {
            if (self.isTouch)
                dispatch(events.click, event);

        }

        function onCloseModal(event) {
            event.preventDefault();
            closeModal();
            dispatch(events.click, event);

        }

        // function animateTweens() {
        //     if (!self.stopTweenFrameUpdate) {
        //         requestAnimationFrame(animateTweens);
        //         TWEEN.update();
        //     }
        // }

        // animateTweens();

        window.addEventListener("devicemotion", function (event) {
            // if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {
            gyroPresent = true;
            window.addEventListener("deviceorientation", handleOrientation, true);
            // }
        });

        function handleOrientation(event) {
            gyro.absolute = event.absolute;
            gyro.alpha = event.alpha;
            gyro.beta = event.beta;
            gyro.gamma = event.gamma;
        }

        // Pause tunnel when it's not vissible
        var observerCallback = function (entries, observer) {
            entries.forEach(entry => {
                // Check if the target is more than 50% visible
                if (entry.isIntersecting) {
                    // console.log('HEY!', entry.isIntersecting)
                    self.play();
                    // entry.target.classList.add('visible');
                }
                // Check if the target is completely hidden
                else {
                    // console.log('BYE!', entry.isIntersecting)
                    self.stop();
                    // entry.target.classList.remove('visible');
                }
            });
        };

        var options = {
            threshold: 0.0
        }

        var observer = new IntersectionObserver(observerCallback, options);

        var target = dom;
        observer.observe(target);

    }

};

Tunnel.init();
