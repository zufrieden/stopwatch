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
//= require jquery.ui
//= require impress
//= require stopwatch
//
$(function() {

var stopwatch = new StopWatch({
  time: {
    hours: 0,
    minutes: 5,
    seconds: 0
  }
});

var startTimer = function() {
  if (window.location.hash.match(/\/timer/)) {
    setTimeout(function() {
      stopwatch._time -= 1;
      stopwatch.start();
    }, 350);
  } else {
    setTimeout(startTimer, 100);
  }
}
startTimer();

var colorAnimation = function() {
  $('#brandable').animate({backgroundColor: 'red'}, 1000, function() {
    setTimeout(function() {
      $('#brandable').animate({backgroundColor: 'yellow'}, 1000, function() {
        setTimeout(function() {
          $('#brandable').animate({backgroundColor: 'blue'}, 1000, function() {
            setTimeout(function() {
              $('#brandable').animate({backgroundColor: 'green'}, 1000, function() {
                setTimeout(function() {
                  colorAnimation();
                }, 1000);
              });
            }, 1000);
          });
        }, 1000);
      });
    }, 1000);
  });
}
colorAnimation();

});

