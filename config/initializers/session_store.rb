if Rails.env.production? || Rails.env.staging?
  require 'action_dispatch/middleware/session/dalli_store'
  Stopwatch::Application.config.session_store :dalli_store, namespace: '_stop_watch_session', key: '_stopwatch_session', expire_after: 1.day
else
  Stopwatch::Application.config.session_store :cookie_store, key: '_stop_watch_session'
end
