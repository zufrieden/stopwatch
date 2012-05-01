//= require jquery
//= require underscore

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

    // start timer
    start: function(time) {
      if (this._started || time) {
        this.reset(time);
      }

      this._started = true;
      this._timer();
    },

    // stop timer
    stop: function() {
      clearTimeout(this._timerID);
      this._started = false;
    },

    // reset timer
    reset: function(time) {
      // ensure timer is stopped
      if (this._started) {
        this.stop();
      }

      // get default time
      if (!time) {
        time = this.options.time;
      }

      // translate time in seconds
      var timerLength = 0;
      timerLength += (time.days || 0) * 24 * 60 * 60;
      timerLength += (time.hours || 0) * 60 * 60;
      timerLength += (time.minutes || 0) * 60;
      timerLength += (time.seconds || 0);

      // reset time
      this._time = this._timerLength = timerLength;

      // reset timer view
      this._render(this._time);
    },

    isStarted: function() {
      return !!this._started;
    },

    timeInSeconds: function() {
      return this._time;
    },

    setTwitterHashtag: function(twitter_hashtag) {
      this.twitterHashtag = this.options.twitterHashtag = twitter_hashtag;
    },

    //
    // PRIVATE METHODS
    //

    // update timer
    _timer: function() {
      // timer do not contimue to iterate if stopped or reach zero
      if (this._started && this._time >= 0) {
        var timestamp = new Date().getTime();

        this._render(this._time);
        this._time -= 1;

        this._timerID = _.delay(_.bind(this._timer, this), 1000 - ((new Date().getTime()) - timestamp));
      // ensure timer is stopped if reach zero
      } else if (this._time < 0) {
        this.stop();
      }
    },

    // render timer view
    //
    // @param [Integer] diff timer value to rending
    _render: function(diff) {
      // render digits
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

      // render progress bar
      this.el.find('.line .inner-line').css({ width: 100 - Math.round((diff / this._timerLength) * 100) + '%' });
    },

    // render timer dash view
    //
    // @params [String] dash dash name
    // @params [Integer] digit dash value
    _renderDash: function(dash, digit) {
      this.el.find('.dash.' + dash + '_dash .digit:first').html((digit - (digit % 10)) / 10);
      this.el.find('.dash.' + dash + '_dash .digit:last').html((digit % 10));
    }

  });

})(jQuery);

