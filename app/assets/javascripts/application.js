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

  $('.btn.start').on('click', stopwatch.start);
  $('.btn.stop').on('click', stopwatch.stop);
  $('.btn.reset').on('click', stopwatch.reset);

  $(".stopwatch").fitText(0.5, { minFontSize: '20px'});
});

(function($, undefined) {
  StopWatch = window.StopWatch = function(options) {
    _.bindAll(this, 'start', 'stop', 'reset');

    // default options
    this.options = _.extend({
      el:  $('.stopwatch'),
      time: { minutes: 5, seconds: 30 }
    }, (options || {}));

    // init attributes
    this.el = this.options.el;
    this._started = false;

    // reset timer
    this.reset();
  }

  _.extend(StopWatch.prototype, {

    // reset timer
    reset: function() {
      this.stop();
      this._endAt = moment().add(this.options.time);
      this._render(((this._endAt.diff(moment())) / 1000));
    },

    // start timer
    start: function() {
      this._started = true;
      this._timer();
    },

    // stop timer
    stop: function() {
      this._started = false;
    },

    // update timer
    _timer: function() {
      if (this._started) {
        this._render(((this._endAt.diff(moment())) / 1000));
        _.delay(_.bind(this._timer, this), 1000);
      }
    },

    // render timer
    _render: function(diff) {
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
