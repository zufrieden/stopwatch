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
//= require bootstrap

   jQuery(document).ready(function() {
      
      $('#countdown_dashboard').countDown({
         targetDate: {
            'day':   4,
            'month': 3,
            'year':  2012,
            'hour':  16,
            'min':   0,
            'sec':   0
         }
      });
   });


$.fn.countDown = function (options) {

      config = {};

      $.extend(config, options);

      diffMilliSecs = this.setCountDown(config);

      $('#' + $(this).attr('id') + ' .digit').html('<div class="top"></div><div class="bottom"></div>');
      $(this).doCountDown($(this).attr('id'), diffMilliSecs, 500);

      if (config.onComplete)
      {
         $.data($(this)[0], 'callback', config.onComplete);
      }
      if (config.omitWeeks)
      {
         $.data($(this)[0], 'omitWeeks', config.omitWeeks);
      }

      var id = $(this).attr('id');      
      if(diffMilliSecs > 0) {
         var hack = function() {
            if(!this.n || this.n < 0) {
               this.n = 99;
            } else {
               this.n = this.n-1;
            }
            $(this).dashChangeTo(id, 'miseconds_dash', this.n, 100);
         };
         var hackTimer = setInterval(hack, 10);
         $('#'+id).data('hackTimer', hackTimer);
         
      } else {
         $(this).dashChangeTo(id, 'miseconds_dash', 0, 100);
      }
            
      return this;

   };

   $.fn.stopCountDown = function () {
      clearTimeout($.data(this[0], 'timer'));
   };

   $.fn.startCountDown = function () {
      this.doCountDown($(this).attr('id'),$.data(this[0], 'diffMilliSecs'), 500);
   };

   $.fn.setCountDown = function (options) {
      var targetTime = new Date();

      if (options.targetDate)
      {
         targetTime.setDate(options.targetDate.day);
         targetTime.setMonth(options.targetDate.month-1);
         targetTime.setFullYear(options.targetDate.year);
         targetTime.setHours(options.targetDate.hour);
         targetTime.setMinutes(options.targetDate.min);
         targetTime.setSeconds(options.targetDate.sec);
      }
      else if (options.targetOffset)
      {
         targetTime.setDate(options.targetOffset.day + targetTime.getDate());
         targetTime.setMonth(options.targetOffset.month + targetTime.getMonth());
         targetTime.setFullYear(options.targetOffset.year + targetTime.getFullYear());
         targetTime.setHours(options.targetOffset.hour + targetTime.getHours());
         targetTime.setMinutes(options.targetOffset.min + targetTime.getMinutes());
         targetTime.setSeconds(options.targetOffset.sec + targetTime.getSeconds());
      }
      

      var nowTime = new Date();

      diffMilliSecs = Math.floor((targetTime.valueOf()-nowTime.valueOf()));

      $.data(this[0], 'diffMilliSecs', diffMilliSecs);

      return diffMilliSecs;
   };

   $.fn.doCountDown = function (id, diffMilliSecs, duration) {
      $this = $('#' + id);

      if (diffMilliSecs <= 0)
      {
         diffMilliSecs = 0;
         if ($.data($this[0], 'timer'))
         {
            clearTimeout($.data($this[0], 'timer'));
         }
         
         if($this.data('hackTimer')) {
            clearTimeout($this.data('hackTimer'));
         }
      }
      
      var diffSecs = diffMilliSecs/1000;
      dixSecs = Math.floor(diffMilliSecs/10) % 100;
      
      secs = Math.floor(diffSecs) % 60;
      mins = Math.floor(diffSecs/60)%60;
      hours = Math.floor(diffSecs/60/60)%24;
      if ($.data($this[0], 'omitWeeks') == true)
      {
         days = Math.floor(diffSecs/60/60/24);
         weeks = Math.floor(diffSecs/60/60/24/7);
      }
      else 
      {
         days = Math.floor(diffSecs/60/60/24)%7;
         weeks = Math.floor(diffSecs/60/60/24/7);
      }

      //$this.dashChangeTo(id, 'miseconds_dash', dixSecs, 100);
      $this.dashChangeTo(id, 'seconds_dash', secs, duration ? duration : 800);
      $this.dashChangeTo(id, 'minutes_dash', mins, duration ? duration : 1200);
      $this.dashChangeTo(id, 'hours_dash', hours, duration ? duration : 1200);
      $this.dashChangeTo(id, 'days_dash', days, duration ? duration : 1200);
      $this.dashChangeTo(id, 'weeks_dash', weeks, duration ? duration : 1200);

      $.data($this[0], 'diffMilliSecs', diffMilliSecs);
      if (diffMilliSecs > 0)
      {
         e = $this;
         t = setTimeout(function() { e.doCountDown(id, diffMilliSecs-1000) } , 1000);
         $.data(e[0], 'timer', t);
      } 
      else if (cb = $.data($this[0], 'callback')) 
      {
         $.data($this[0], 'callback')();
      }

   };

   $.fn.dashChangeTo = function(id, dash, n, duration) {
      $this = $('#' + id);
      d2 = n%10;
      d1 = (n - n%10) / 10

      if ($('#' + $this.attr('id') + ' .' + dash))
      {
         $this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit:first', d1, duration);
         $this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit:last', d2, duration);
      }
   };

   $.fn.digitChangeTo = function (digit, n, duration) {
      
      // don't spend time to animate if duration < 200 millisecond...
      if(duration < 200) {
         $(digit + ' div.top').html((n ? n : '0'));
         return;
      }
      
      if (!duration)
      {
         duration = 800;
      }
      if ($(digit + ' div.top').html() != n + '')
      {

         $(digit + ' div.top').css({'display': 'none'});
         $(digit + ' div.top').html((n ? n : '0')).slideDown(duration);

         $(digit + ' div.bottom').animate({'height': ''}, duration, function() {
            $(digit + ' div.bottom').html($(digit + ' div.top').html());
            $(digit + ' div.bottom').css({'display': 'block', 'height': ''});
            $(digit + ' div.top').hide().slideUp(10);

         
         });
      }
   };


