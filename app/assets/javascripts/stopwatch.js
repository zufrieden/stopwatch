//= require jquery
//= require underscore
//= require moment

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
      if (this._started) {
        this.stop();
      }

      this._time = Math.round(moment().add(this.options.time).diff(moment()) / 1000);
      this._render(moment().add('milliseconds', this._time).diff(moment()));
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
        var timestamp = new Date().getTime();
        this._render(this._time);
        this._time -= 1;
        _.delay(_.bind(this._timer, this), 1000 - ((new Date().getTime()) - timestamp));
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

