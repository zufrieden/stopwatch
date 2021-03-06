require 'faye'
require 'faye/redis'

StopWatch::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb

  # Code is not reloaded between requests
  config.cache_classes = true

  # Full error reports are disabled and caching is turned on
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Disable Rails's static asset server (Apache or nginx will already do this)
  config.serve_static_assets = false

  # Compress JavaScripts and CSS
  config.assets.compress = true

  # Don't fallback to assets pipeline if a precompiled asset is missed
  config.assets.compile = false

  # Generate digests for assets URLs
  config.assets.digest = true

  # Defaults to Rails.root.join("public/assets")
  # config.assets.manifest = YOUR_PATH

  # Specifies the header that your server uses for sending files
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for nginx

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  # config.force_ssl = true

  # See everything in the log (default is :info)
  # config.log_level = :debug

  # Prepend all log lines with the following tags
  # config.log_tags = [ :uuid, :remote_ip ]

  # Use a different logger for distributed setups
  # config.logger = ActiveSupport::TaggedLogging.new(SyslogLogger.new)

  # Use a different cache store in production
  config.cache_store = :dalli_store, { namespace: 'stopwatch_cache' }

  # Enable serving of images, stylesheets, and JavaScripts from an asset server
  config.action_controller.asset_host = Proc.new do |source|
    "//#{ENV['S3_ASSET_BUCKET']}.s3.amazonaws.com"
  end

  # Precompile additional assets (application.js, application.css, and all non-JS/CSS are already added)
  config.assets.precompile += %w( impress.js presentation.js presentation.css startup.js startup.css )

  # Disable delivery errors, bad email addresses will be ignored
  # config.action_mailer.raise_delivery_errors = false

  # Enable threaded mode
  # config.threadsafe!

  # Secure staging enviroment
  config.middleware.insert_before 'Rack::Cache', 'Rack::Auth::Digest::MD5', 'stopwat.ch staging', SecureRandom.base64 do |user|
    user == ENV['STAGING_HTTP_AUTH_USER'] && ENV['STAGING_HTTP_AUTH_PSWD']
  end

  # Add Faye has middleware
  redis_config = ENV['REDISTOGO_URL'].match(/redis:\/\/.+?:(?<password>.+?)@(?<host>.+?):(?<port>\d+)/)
  config.middleware.insert_before 'Rack::Cache', 'Faye::RackAdapter',
    mount: '/faye',
    timeout: 25,
    ping: 20,
    engine: {
      type:     Faye::Redis,
      host:     redis_config[:host],
      port:     redis_config[:port],
      password: redis_config[:password],
      database: 1
    }

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found)
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners
  config.active_support.deprecation = :notify

  # Log the query plan for queries taking more than this (works
  # with SQLite, MySQL, and PostgreSQL)
  # config.active_record.auto_explain_threshold_in_seconds = 0.5
end
