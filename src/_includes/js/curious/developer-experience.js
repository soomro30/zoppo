var hasRun = false;
function runScripts(pos) {
  // Only run first time
  if (hasRun) return;

  var data = [
    { 
      action: 'type',
      strings: ["npm install happiness-index -g^400"],
      output: '<span class="term-gray">> happiness-index@1.8.4 install /Users/fullystudios/node_modules/happiness-index<br>> node install<br><br>[happiness-index] Success: "/Users/fullystudios/node_modules/happiness-index" installed</span><br>&nbsp;',
      postDelay: 1000
    },
    { 
      action: 'type',
      strings: ['happiness-index --generate^400'],
      output: $('.mimik-run-output').html()
    }
  ];
  var prompt = $('.prompt'),
      script = data[pos];
  if(script.clear === true) {
    $('.history').html(''); 
  }
  switch(script.action) {
      case 'type':
        // cleanup for next execution
        prompt.removeData();
        $('.typed-cursor').text('');
        prompt.typed({
          strings: script.strings,
          typeSpeed: 30,
          callback: function() {
            var history = $('.history').html();
            history = history ? [history] : [];
            history.push('$ ' + prompt.text());
            if(script.output) {
              history.push(script.output);
              prompt.html('');
              $('.history').html(history.join('<br>'));
            }
            // scroll to bottom of screen
            $('section.terminal').scrollTop($('section.terminal').height());
            // Run next script
            pos++;
            if(pos < data.length) {
              setTimeout(function() {
                runScripts(pos);
                hasRun = true;
              }, script.postDelay || 1000);
            }
          }
        });
        break;
      case 'view':

        break;
  }
}

runScripts(0);
console.log('include me');
