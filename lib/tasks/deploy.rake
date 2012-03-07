if Rails.env.development?
  require 'git'

  def git
    @git ||= Git.open(Rails.root)
  end

  def deploy(branch, environment)
    STDOUT.print "Are you sure you want deploy #{branch.upcase} branch to #{environment.upcase} environment? (y/n) "
    input = STDIN.gets.strip.downcase
    if input == 'y'
      STDOUT.puts "Deploy to #{environment}..."
      `git push #{environment} #{branch}:master --force`
    else
      STDOUT.puts "Deployment canceled."
    end
  end

  namespace :deploy do

    task :staging do
      deploy(:dev, :staging)
    end

    task :production do
      deploy(:master, :production)
    end

    task :testing do
      deploy(git.current_branch.to_s, :staging)
    end

  end
end
