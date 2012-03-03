// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require bootstrap
//= require jquery.fittext
//
//= require private_pub
//
//= require stopwatch
//

$(function() {
  $(".stopwatch").fitText(0.5, { minFontSize: '20px'});

  var stopwatch = new StopWatch();

  $('.timer-event').on('click', function() {
    var event = ($(this).attr('class').match(/start|stop|reset/) || [])[0];

    if (event) {
      $.ajax({
        url: '/timer/event',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({timer: {
          event: event
        }})
      });
    }
  });

  PrivatePub.subscribe('/timer/event', function(data, channel) {
    switch(data.event) {
      case 'start':
        stopwatch.start(data.time);
        break;
      case 'stop':
        stopwatch.stop();
        break;
      case 'reset':
        stopwatch.reset(data.time);
        break;
    }
  });
});

