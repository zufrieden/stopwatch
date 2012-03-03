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
//= require moment
//= require jquery.fittext



$(function() {
  var stopwatch = new StopWatch();

  stopwatch.start();

  $(".stopwatch").fitText(0.5, { minFontSize: '20px'});
});

(function($, undefined) {
  StopWatch = window.StopWatch = function(options) {
    this.options = _.extend({
      el:  $('.stopwatch'),
      time: { minutes: 5, seconds: 30 }
    }, (options || {}));

    this.el = this.options.el;

    this.reset();
  }

  _.extend(StopWatch.prototype, {

    // reset timer
    reset: function() {
      this._endAt = moment().add(this.options.time);
      this._render();
    },

    // start timer
    start: function() {
    },

    // update timer
    _timer: function() {
    },

    // render timer
    _render: function() {
      var diff = this._endAt.diff(moment()) / 1000;

      var that = this;
      _.each(['days', 'hours', 'minutes', 'seconds'], function(dash) {
        var digit;

        switch(dash) {
          case 'days':
            digit = Math.floor(diff/60/60/24);
            break;
          case 'hours':
            digit = Math.floor(diff/60/60) % 60;
            break;
          case 'minutes':
            digit = Math.floor(diff/60) % 60;
            break;
          case 'seconds':
            digit = Math.floor(diff) % 60;
            break;
        }

        that._renderDash(dash, digit);
      });
    },

    _renderDash: function(dash, digit) {
      this.el.find('.dash.' + dash + '_dash .digit:first').html((digit - (digit % 10)) / 10);
      this.el.find('.dash.' + dash + '_dash .digit:last').html((digit % 10));
    }

  });

})(jQuery);
