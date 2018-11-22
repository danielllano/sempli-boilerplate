server "35.163.209.39", user: "ec2-user", roles: %w{app}

set :ssh_key, ENV['SSH_KEY_PRD']
set :deploy_to_basedir, "/home/ec2-user/"
set :deploy_to_targetdir, "/var/www/backoffice/"

set :deploy_to, "#{ fetch(:deploy_to_basedir) }deploy-backoffice"
set :deploy_via, :remote_cache

set :branch, 'master'

set :ssh_options, {
  keys: fetch(:ssh_key),
  forward_agent: true
}

set :keep_releases, 3

namespace :deploy do

  after :deploy, 'deploy:verify_deploy'

  desc "Ask for confirmation before deployment"
  task :verify_deploy do
    puts "================== Please confirm entering 'PRODUCCION' (case sensitive) before deploying ======================"
    ask(:deploy_confirmation, nil)
    if fetch(:deploy_confirmation) != 'PRODUCCION'
      raise "Invalid confirmation, aborting deployment"
    end
  end

  desc 'Install project dependencies'
  after :verify_deploy, :npm_deps do
    on roles :all do
      puts "================== Installing dependencies ======================"
      with_verbosity(Logger::DEBUG) do
        execute "cd #{ fetch(:deploy_to) }/current; npm install"
      end
    end
  end

  desc 'Build project'
  after :npm_deps, :npm_build do
    on roles :all do
      puts "================== Building with NPM ======================"
      with_verbosity(Logger::DEBUG) do
        execute "cd #{ fetch(:deploy_to) }/current; npm run build"
      end
    end
  end

  desc 'Copy files'
  after :npm_build, :copy_files do
    on roles :all do
      puts "================== Copying files to web folder ======================"
      with_verbosity(Logger::DEBUG) do
        execute "cp -rf #{ fetch(:deploy_to) }/current/dist/* #{ fetch(:deploy_to_targetdir) }"
      end
    end
  end

end
