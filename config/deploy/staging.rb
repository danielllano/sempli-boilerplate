server "ec2-54-191-41-36.us-west-2.compute.amazonaws.com", user: "ec2-user", roles: %w{app}

set :ssh_key, ENV['SSH_KEY_TST']
set :deploy_to_basedir, "/home/ec2-user/"
set :deploy_to_targetdir, "/var/www/backoffice/"

set :deploy_to, "#{ fetch(:deploy_to_basedir) }deploy-backoffice"
set :deploy_via, :remote_cache

set :branch, ENV['BRANCH']

set :ssh_options, {
  keys: fetch(:ssh_key),
  forward_agent: true
}

set :keep_releases, 1
set :build_type, nil

namespace :deploy do

  after :deploy, 'deploy:select_build_type'

  desc "Ask for local or remote build"
  task :select_build_type do
    puts "================== Enter 'remote' if you want to build in the server ('local' by default) ======================"
    ask(:build_type, 'local')
    if fetch(:build_type) == 'local'
      puts "================== Building project LOCALLY ======================"
    elsif fetch(:build_type) == 'remote'
      puts "================== Building project REMOTELY ======================"
    else
      raise "Invalid build type entered"
    end
  end

  desc 'Build local'
  after :select_build_type, :build_local do
    if fetch(:build_type) == 'local'
      on roles :all do
        with_verbosity(Logger::DEBUG) do
          system("npm run build")
          Dir.foreach('dist') do |file|
            next if file == '.' or file == '..'
            upload! "dist/#{file}", "/var/www/backoffice/", recursive: true
          end
        end
      end
    end
  end

  desc 'Install project dependencies'
  after :build_local, :npm_deps do
    if fetch(:build_type) == 'remote'
      on roles :all do
        puts "================== Installing dependencies ======================"
        with_verbosity(Logger::DEBUG) do
          execute "cd #{ fetch(:deploy_to) }/current; npm install"
        end
      end
    end
  end

  desc 'Build project'
  after :npm_deps, :npm_build do
    if fetch(:build_type) == 'remote'
      on roles :all do
        puts "================== Building with NPM ======================"
        with_verbosity(Logger::DEBUG) do
          execute "cd #{ fetch(:deploy_to) }/current; npm run build"
        end
      end
    end
  end

  desc 'Copy files'
  after :npm_build, :copy_files do
    if fetch(:build_type) == 'remote'
      on roles :all do
        puts "================== Copying files to web folder ======================"
        with_verbosity(Logger::DEBUG) do
        execute "cp -rf #{ fetch(:deploy_to) }/current/dist/* #{ fetch(:deploy_to_targetdir) }"
        end
      end
    end
  end

end
