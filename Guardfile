notification :gntp, sticky: false

guard 'bundler' do
  watch('Gemfile')
end

group :backend do

  guard 'spork', cucumber_env: { 'RAILS_ENV' => 'test' }, rspec_env: { 'RAILS_ENV' => 'test' } do
    watch('config/application.rb')
    watch('config/environment.rb')
    watch(%r{^config/environments/.+\.rb$})
    watch(%r{^config/initializers/.+\.rb$})
    watch(%r{^config/.+\.yml$})
    watch('Gemfile')
    watch('Gemfile.lock')
    watch('spec/spec_helper.rb')
    watch('test/test_helper.rb')
  end

  guard 'rspec', all_on_start: true, all_after_pass: true, keep_failed: true, cli: '--colour --fail-fast --drb --tag focus' do
    watch(%r{^spec/.+_spec\.rb$})
    watch(%r{^app/(.+)\.rb$})                           { |m| "spec/#{m[1]}_spec.rb" }
    watch(%r{^app/(.*)(\.erb|\.haml)$})                 { |m| "spec/#{m[1]}#{m[2]}_spec.rb" }
    watch(%r{^lib/(.+)\.rb$})                           { |m| "spec/lib/#{m[1]}_spec.rb" }
    watch(%r{^app/controllers/(.+)_(controller)\.rb$})  { |m| ["spec/routing/#{m[1]}_routing_spec.rb", "spec/#{m[2]}s/#{m[1]}_#{m[2]}_spec.rb", "spec/acceptance/#{m[1]}_spec.rb"] }
    watch(%r{^spec/support/(.+)\.rb$})                  { 'spec' }
    watch('spec/spec_helper.rb')                        { 'spec' }
    watch('config/routes.rb')                           { 'spec/routing' }
    watch('app/controllers/application_controller.rb')  { 'spec/controllers' }
    watch(%r{^app/views/(.+)/.*\.(erb|haml)$})          { |m| "spec/requests/#{m[1]}_spec.rb" } # Capybara request specs
  end

end


group :fronted do

  # guard 'jasmine', console: :failure, timeout: 20000 do
  #   watch(%r{app/assets/javascripts/(.+)\.(js\.coffee|js|coffee)$}) { |m| "spec/javascripts/#{m[1]}_spec.#{m[2]}" }
  #   watch(%r{spec/javascripts/(.+)_spec\.(js\.coffee|js|coffee)$})  { |m| "spec/javascripts/#{m[1]}_spec.#{m[2]}" }
  #   watch(%r{spec/javascripts/spec\.(js\.coffee|js|coffee)$})       { 'spec/javascripts' }
  # end

  guard 'livereload' do
    watch(%r{app/.+\.(erb|haml)})
    watch(%r{app/helpers/.+\.rb})

    watch(%r{app/assets/stylesheets/(.+\.css).*$})  { |m| "assets/#{m[1]}" }
    watch(%r{app/assets/javascripts/(.+\.js).*$})   { |m| "assets/#{m[1]}" }

    watch(%r{config/locales/.+\.yml})
  end

end

guard 'pow', restart_on_start: true, restart_on_reload: true do
  watch('.powrc')
  watch('.powenv')
  watch('.rvmrc')
  watch('Gemfile')
  watch('Gemfile.lock')
  watch('config/application.rb')
  watch('config/environment.rb')
  watch(%r{^config/environments/.*\.rb$})
  watch(%r{^config/initializers/.*\.rb$})
end

