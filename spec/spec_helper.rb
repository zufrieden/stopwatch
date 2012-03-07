require 'rubygems'
require 'spork'

ENV["RAILS_ENV"] ||= 'test'

Spork.prefork do
  # If a plugin load route on pre-fork step, ensure model/controller is reloaded each run
  require "rails/application"
  Spork.trap_method(Rails::Application::RoutesReloader, :reload!)

  # SimpleCov
  require 'simplecov'
  SimpleCov.start('rails') do
    add_filter 'vendor'
  end

  # Rails
  require File.expand_path('../../config/environment', __FILE__)

  # RSpec
  require 'rspec/rails'
  require 'rspec/autorun'

  # Pry
  require 'pry-remote'

  # VCR
  # require 'vcr'
  # VCR.configure do |config|
  #   config.cassette_library_dir = 'spec/vcr'
  #   config.hook_into :fakeweb
  #   config.configure_rspec_metadata!
  #   config.default_cassette_options = {
  #     record: :new_episodes,
  #     allow_playback_repeats: true
  #   }
  # end

  RSpec.configure do |config|
    # Filters
    config.filter_run focus: true
    config.run_all_when_everything_filtered = true
    config.treat_symbols_as_metadata_keys_with_true_values = true

    # Mock & fixtures
    config.mock_with :rspec
    config.fixture_path = "#{::Rails.root}/spec/fixtures"
    config.use_transactional_fixtures = true

    # Helpers
    # config.include Devise::TestHelpers, type: :controller

    # If true, the base class of anonymous controllers will be inferred
    # automatically. This will be the default behavior in future versions of
    # rspec-rails.
    config.infer_base_class_for_anonymous_controllers = false
  end
end

Spork.each_run do
  # reload factories
  FactoryGirl.reload

  # reload i18n
  I18n.backend.reload!

  # reload routes
  StopWatch::Application.reload_routes!

  # reload support stuff
  Dir[Rails.root.join('spec/support/**/*.rb')].each {|f| require f}
end
