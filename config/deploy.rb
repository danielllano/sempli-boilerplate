require 'dotenv/load'  #For load .env file

# config valid only for current version of Capistrano
lock "3.11.0"

set :application, "sempli-back-office"

set :git_password, ENV['GIT_PASSWORD']
set :git_username, ENV['GIT_USERNAME']
set :repo_url,    "https://#{ fetch(:git_username) }:#{ fetch(:git_password) }@bitbucket.org/sempli_co_team/backofficeapplication.git"

# Sudo permissions
set :use_sudo, false

# Deployment stages
set :stages, ["staging", "production"]
set :default_stage, "staging"

# Log level for output
set :log_level, :error

# Default value for :format is :airbrussh.
set :format, :pretty

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
set :format_options, command_output: true, log_file: "capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
set :pty, false

# Debug commands called with 'execute', use:
#
# with_verbosity(Logger::DEBUG) do
  # execute "./blah.sh"
# end
#
def with_verbosity(verbosity_level)
  old_verbosity = SSHKit.config.output_verbosity
  begin
    SSHKit.config.output_verbosity = verbosity_level
    yield
  ensure
    SSHKit.config.output_verbosity = old_verbosity
  end
end

# Default value for linked_dirs is []
append :linked_dirs, "node_modules"

# Default value for :linked_files is []
# append :linked_files, ""

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
