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
//= require moment
//
//= require stopwatch
//

$(function() {
  $(".stopwatch").fitText(0.5, { minFontSize: '20px'});

  $('#gopro').popover();

  var stopwatch = new StopWatch(JSON.parse(timerData));
  var timer_url_key = window.location.pathname.match(/^\/(timer\/)?([^\/]+)/)[2];

  var lastTweetID, tweets = [];

  $('.timer-event').on('click', function() {
    var event = ($(this).attr('class').match(/start|stop|reset/) || [])[0];

    if (event) {
      $.ajax({
        url: '/timer/' + timer_url_key + '/event',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({timer: {
          event: event
        }})
      });
    }
  });

  var fayeClient = new Faye.Client('/faye', {
    timeout: 30,
    retry: 5
  });
  fayeClient.disable('websocket');

  fayeClient.subscribe('/timer/' + timer_url_key + '/event', function(data) {
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

  // init configuration form
  $('a[href=#configure]').on('click', function(event) {
    var time = stopwatch.options.time;

    $('#configure input[name=timer_hours]').val((time.hours && (time.hours >= 10 ? '' : '0') + time.hours) || '');
    $('#configure input[name=timer_minutes]').val((time.minutes && (time.minutes >= 10 ? '' : '0') + time.minutes) || '00');
    $('#configure input[name=timer_seconds]').val((time.seconds && (time.seconds >= 10 ? '' : '0') + time.seconds) || '00');
    $('#configure input[name=timer_twitter_hashtag]').val(stopwatch.options.twitterHashtag);
  });

  // focus on first configuration input when shown
  $('#configure').on('shown', function(event) {
    $('#configure input[name=timer_hours]').focus();
  });

  // update data when configuration saved
  $('#configure').on('click', 'button.save', function(event) {
    event.preventDefault();

    var options = {
      time: {
        hours: parseInt($('#configure input[name=timer_hours]').val()) || 0,
        minutes: parseInt($('#configure input[name=timer_minutes]').val()) || 0,
        seconds: parseInt($('#configure input[name=timer_seconds]').val()) || 0
      },
      twitter_hashtag: $('#configure input[name=timer_twitter_hashtag]').val().match(/^#?([^\s]*)/)[1]
    };

    // update timer on client
    stopwatch.setTwitterHashtag(options.twitter_hashtag);
    stopwatch.reset(options.time);

    // reset tweets
    tweets = [], lastTweetID = null;

    // close modal
    $('#configure').modal('hide');

    // update timer on server
    $.ajax({
      url: '/timer/' + timer_url_key,
      type: 'PUT',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({timer: {
        time: stopwatch.options.time,
        twitter_hashtag: stopwatch.options.twitterHashtag || ''
      }})
    });
  });

  // twitter integration
  var updateTweets = function() {
    if (stopwatch.options.twitterHashtag) {
      $.getJSON('http://search.twitter.com/search.json?q=' + stopwatch.options.twitterHashtag + '&since_id=' + lastTweetID + '&result_type=recent&rpp=100&include_entities=true&callback=?',
        function(results) {
          results = _.filter(results.results, function(result) {
            return _.any(result.entities.hashtags, function(hashtag) {
              return (hashtag.text == stopwatch.options.twitterHashtag);
            });
          });

          if (results.length > 0) {
            tweets = _.union(results, _.initial(tweets, results.length));
            lastTweetID = _.last(tweets).id;
          }

          var tweet = _.first(_.shuffle(_.first(tweets, 10)))
          $('.twitter_feed .profile_pic img').attr({src: tweet.profile_image_url});
          $('.twitter_feed .tweet p:first').html(tweet.text);
          $('.twitter_feed .tweet p:last a').html('@' + tweet.from_user);
          $('.twitter_feed .tweet p:last').html('<a href="http://www.twitter.com/' + tweet.from_user +'">@' + tweet.from_user + '</a> ' + moment(tweet.created_at).fromNow());
          $('.twitter_feed').addClass('twitter_feed_display');
      });
    } else {
      $('.twitter_feed').removeClass('twitter_feed_display');
    }

    _.delay(updateTweets, 7000);
  }
  updateTweets();
});

