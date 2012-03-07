# Be sure to restart your server when you modify this file.

# Your secret key for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!
# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
if Rails.env.production? || Rails.env.staging?
   StopWatch::Application.config.secret_token = ENV['SIGNED_COOKIE_SECRET_TOKEN']
else
   StopWatch::Application.config.secret_token = '7a5cd8e1e00743cf81c1986a9d44c293c0b5a4226b7a63ca3ffa936dc83eae27041bd729c6d128a803ae0772a9db8aff2ce47cd1767bbf044b827b8196a64a75'
end