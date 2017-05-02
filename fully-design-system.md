---
layout: page
title: Design System
permalink: /design-system/
published: true
author: Jonas Sandstedt
date: 2017-04-24
---

<header class="ds-header" markdown='1'>
## Colors
</header>

<div class="c-signal-bg" markdown='1' style="padding-top: 30px; padding-bottom: 30px">

### signal - `#5F11E8`

This color will be the main association with Fully. A strong signal that shows tech and takes place.

</div>


<div class="c-people-bg" markdown='1' style="padding-top: 30px; padding-bottom: 30px">

### people - `#FFC1B4`

This color stands for the personal side of Fully. Things that describe people or personal things uses this color.

</div>


<div class="c-business-bg" markdown='1' style="padding-top: 30px; padding-bottom: 30px">

### business - `#7BD75E`

This color is used for business inqueries and other parts concerning contact with client.

</div>


<div class="c-curiosities-bg" markdown='1' style="padding-top: 30px; padding-bottom: 30px">

### curiosities - `#FFDE7F`

This color primarily for the current and constant curiosity, but also for explorations and ideas.

</div>


<div class="c-metal-bg" markdown='1' style="padding-top: 30px; padding-bottom: 30px">

### metal - `#666666`

This color is mainly here because of Joakim and his ocult ways :) No in all seriousness this color is a good option to use when we don’t want to go all black and gives a softer look to texts.

</div>


<div class="c-light-bg" markdown='1' style="padding-top: 30px; padding-bottom: 30px">

### light - `#f8f8f8`

This color is used for backgrounds and such. This light grey gives a small contrast to white but stil enough to be usefull and nice and light.

</div>


<div class="c-white-bg" markdown='1' style="padding-top: 30px; padding-bottom: 30px">

### white - `#ffffff`

Just whit. Not much to say here. A very usefull color in many situations.

</div>


<div class="c-dark-bg" markdown='1' style="padding-top: 30px; padding-bottom: 30px">

### dark - `#0A2A4F`

Use this on dark text on lighter backgrounds. But make sure the contrast is good.

</div>


<header class="ds-header" markdown='1'>
## Typography
Headlines, textblock etc.
</header>

# H1 headline

## H2 headline

### H3 headline

#### H4 headline

##### H5 headline

###### H6 headline

Paragraph text Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis maiores hic quo optio alias odit voluptas debitis autem voluptate, facilis quaerat numquam, porro maxime repellendus sapiente a illum eius adipisci.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. At illo, vero placeat, voluptas corporis voluptatum architecto sequi fuga. Earum ipsam commodi nisi soluta ut officiis eligendi culpa repudiandae ipsum cupiditate.

<p class="ingress">
Ingress Lorem ipsum dolor sit amet, consectetur adipisicing elit. At illo, vero placeat, voluptas corporis voluptatum architecto sequi fuga. Earum ipsam commodi nisi soluta ut officiis eligendi culpa repudiandae ip`um cupiditate.
</p>

``` html
<p class="ingress"></p>
```

<header class="ds-header" markdown='1'>
## Buttons
</header>

Standard button:
<a class="button" href="#"><span>Explore</span></a>

``` html
<a class="button" href="#"><span>Explore</span></a>
```

<div class="c-signal-bg" style="padding: 4em">
    Inverted button:

    <a class="button button--inv" href="#"><span>Explore</span></a>

</div>

``` html
<a class="button button--inv" href="#"><span>Explore</span></a>
```

<header class="ds-header" markdown='1'>
## Boxes
Boxes with different dropshadows for text and images.
</header>

<div class="box" markdown="1">

## The secret clubhouse
Lorem ipsum dolor sit amet, consectetur adipisicing elit. At illo, vero placeat, voluptas corporis voluptatum architecto sequi fuga. Earum ipsam commodi nisi soluta ut officiis eligendi culpa repudiandae ipsum cupiditate.

``` html
<div class="box" markdown="1">
```

</div>

<div class="box box--right box--people" markdown="1" style="background-image:url(http://placekitten.com/g/1920/600); color:white">

``` html
<div class="box box--right box--people" markdown="1" style="background-image:url(http://placekitten.com/g/1920/600)">
```
</div>

<div class="box box--business" markdown="1">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. At illo, vero placeat, voluptas corporis voluptatum architecto sequi fuga. Earum ipsam commodi nisi soluta ut officiis eligendi culpa repudiandae ipsum cupiditate.

``` html
<div class="box box--business" markdown="1"></div>
```
</div>

<div class="box box--right box--curiosities" markdown="1">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. At illo, vero placeat, voluptas corporis voluptatum architecto sequi fuga. Earum ipsam commodi nisi soluta ut officiis eligendi culpa repudiandae ipsum cupiditate.

``` html
<div class="box box--right box--curiosities" markdown="1">
```
</div>

<div class="box box--metal" markdown="1">
Lorem ipsum dolor sit amet, consectetur adipisicing elit. At illo, vero placeat, voluptas corporis voluptatum architecto sequi fuga. Earum ipsam commodi nisi soluta ut officiis eligendi culpa repudiandae ipsum cupiditate.

``` html
<div class="box box--metal" markdown="1">
```
</div>

<div class="box box--bgsignal" markdown="1">
Also works with `.box--bgpeople`, `.box--bgcuriosities`, `.box--bgbusiness` and  `.box--bgmetal`

``` html
<div class="box box--metal" markdown="1">
```
</div>




<header class="ds-header" markdown='1'>
## boxgrid
a grid with images and texts. Used in "other projects"
</header>

<div class="boxgrid">
<h2 class="boxgrid__header h4">Check out our other projects</h2>
<figure class="boxgrid__box">
    {% comment %}Change this color to an average color from the image{% endcomment %}
    <div class="image-loader" style="background: #ccc"> 
        <img 
        src=" http://placekitten.com/g/644/400"
        alt="A beautiful cat">	
    </div>
    <figcaption>
        <h3>A beautiful cat</h3>
        <p>lorem ipsum</p>
    </figcaption>
</figure>

<figure class="boxgrid__box">
    <div class="image-loader" style="background: #c1c1c1">
        <img 
        src="http://placekitten.com/g/644/400"
        alt="A beautiful cat">	
    </div>
    <figcaption>
        <h3>Another beautiful cat</h3>
        <p>Lorem ipsum dolem es simet</p>
    </figcaption>
</figure>
</div>

``` html
<div class="boxgrid">
    <h2 class="boxgrid__header h4">Boxgrid title</h2>

    <figure class="boxgrid__box">
        <div class="image-loader" style="background: #c1c1c1"> <!--Change this color to an average color from the image-->
            <img src="" alt="Fig title">	
        </div>
        <figcaption>
            <h3>Fig title</h3>
            <p>Fig Description</p>
        </figcaption>
    </figure>
</div>
```

### A compat boxgrid:

<div class="boxgrid boxgrid--compact">
<h2 class="boxgrid__header h4">Recent work</h2>
    <figure class="boxgrid__box">
        {% comment %}Change this color to an average color from the image{% endcomment %}
        <div class="image-loader" style="background: #ccc"> 
            <img 
            src=" http://placekitten.com/g/644/400"
            alt="A beautiful cat">	
        </div>
        <figcaption>
            <h3 class="h4">A beautiful cat</h3>
            <p>lorem ipsum</p>
            <a href="#" class="button"><span>View case</span></a>
        </figcaption>
    </figure>
    <figure class="boxgrid__box">
        <div class="image-loader" style="background: #c1c1c1">
            <img 
            src="http://placekitten.com/g/644/400"
            alt="A beautiful cat">	
        </div>
        <figcaption>
            <h3 class="h4">Another beautiful cat</h3>
            <p>Lorem ipsum</p>
            <a href="#" class="button"><span>View case</span></a>
        </figcaption>
    </figure>
    <figure class="boxgrid__box">
        <div class="image-loader" style="background: #c1c1c1">
            <img 
            src="http://placekitten.com/g/644/400"
            alt="A beautiful cat">	
        </div>
        <figcaption>
            <h3 class="h4">Another beautiful cat</h3>
            <p>Lorem ipsum dolem es simet es lorem ipsum</p>
            <a href="#" class="button"><span>View case</span></a>
        </figcaption>
    </figure>
    <figure class="boxgrid__box">
        <div class="image-loader" style="background: #c1c1c1">
            <img 
            src="http://placekitten.com/g/644/400"
            alt="A beautiful cat">	
        </div>
        <figcaption>
            <h3 class="h4">Another beautiful cat</h3>
            <p>Lorem ipsum</p>
            <a href="#" class="button"><span>View case</span></a>
        </figcaption>
    </figure>
    <figure class="boxgrid__box">
        <div class="image-loader" style="background: #c1c1c1">
            <img 
            src="http://placekitten.com/g/644/400"
            alt="A beautiful cat">	
        </div>
        <figcaption>
            <h3 class="h4">Lorem ipsum</h3>
            <p>Lorem ipsum dolem es simet lorem</p>
            <a href="#" class="button"><span>View case</span></a>
        </figcaption>
    </figure>
    <figure class="boxgrid__box">
        <div class="image-loader" style="background: #c1c1c1">
            <img 
            src="http://placekitten.com/g/644/400"
            alt="A beautiful cat">	
        </div>
        <figcaption>
            <h3 class="h4">Another beautiful cat</h3>
            <p>Lorem ipsum dolem es simet</p>
            <a href="#" class="button"><span>View case</span></a>
        </figcaption>
    </figure>
</div>

``` html
<div class="boxgrid boxgrid--compact">
...
</div>
```

<header class="ds-header" markdown='1'>
## images
Load images with style
</header>

<div class="image-loader" style="background: #c1c1c1">
    <img 
    src="http://placekitten.com/g/644/400"
    alt="A beautiful cat">	
</div>

``` html
<div class="image-loader" style="background: #c1c1c1">
    <img 
    src="http://placekitten.com/g/644/400"
    alt="A beautiful cat">	
</div>

```

<br><br><br>