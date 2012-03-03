if Rails.env.development?
  require 'git'

  def git
    @git ||= Git.open(Rails.root)
  end

  def deploy(part, branch, environment)
    current_branch = git.current_branch.to_s

    `git checkout -B deploy_#{part}_#{environment} #{branch}`

    case part
    when :fronted_server
      File.open(Rails.root.join('Procfile'), 'w') do |file|
        file << 'web: bundle exec rails server thin -p $PORT -e $RAILS_ENV' << "\n"
      end
      `git add Procfile`
    when :message_server
      File.open(Rails.root.join('Procfile'), 'w') do |file|
        file << 'web: bundle exec rackup private_pub.ru -s thin -p $PORT -E production' << "\n"
      end
      `mkdir -p #{Rails.root.join('public/assets')}`
      `touch #{Rails.root.join('public/assets/manifest.yml')}`
      `git add Procfile #{Rails.root.join('public/assets/manifest.yml')}`
    end
    `git commit -m "deploy to #{part}"`

    `git push #{part}_#{environment} deploy_#{part}_#{environment}:master --force`

    `git checkout #{current_branch}`
    `git branch -D deploy_#{part}_#{environment}`
  end

  namespace :deploy do

    task :staging do
      deploy(:fronted_server, :dev, :production) if !ENV['ONLY'] || ENV['ONLY'] == 'fronted'
      deploy(:message_server, :dev, :production) if !ENV['ONLY'] || ENV['ONLY'] == 'message'
    end

    task :production  do
      deploy(:fronted_server, :dev, :production) if !ENV['ONLY'] || ENV['ONLY'] == 'fronted'
      deploy(:message_server, :dev, :production) if !ENV['ONLY'] || ENV['ONLY'] == 'message'
    end

    task :testing do
      deploy(:fronted_server, git.current_branch.to_s, :production) if !ENV['ONLY'] || ENV['ONLY'] == 'fronted'
      deploy(:message_server, git.current_branch.to_s, :production) if !ENV['ONLY'] || ENV['ONLY'] == 'message'
    end

  end
end
