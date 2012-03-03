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
//= require impress
//= require stopwatch
//

var stopwatch = new StopWatch({
  time: {
    hours: 0,
    minutes: 10,
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

