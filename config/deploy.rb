lock '3.7.2'

# Application #
#####################################################################################
set :application,     "COVID19_PROCUREMENT_EXPLORER"
set :branch,          ENV["branch"] || "main"
set :user,            ENV["user"] || ENV["USER"] || "covid19"

# SCM #
#####################################################################################
set :repo_url,        :'git@github.com:open-contracting/covid-19-procurement-explorer-public.git'
set :repo_base_url,   :'https://github.com'
set :repo_diff_path,  :'open-contracting/covid-19-procurement-explorer-public/compare/main...'
set :repo_branch_path,:'open-contracting/covid-19-procurement-explorer-public/commits'
set :repo_commit_path,:'open-contracting/covid-19-procurement-explorer-public/commit'

# Multistage Deployment #
#####################################################################################
set :stages,              %w(staging production)
set :default_stage,       "staging"

# Other Options #
#####################################################################################
set :ssh_options,         { :forward_agent => true }
set :default_run_options, { :pty => true }

# Permissions #
#####################################################################################
set :use_sudo,            false
set :permission_method,   :acl
set :use_set_permissions, true
set :webserver_user,      "www-data"
set :group,               "www-data"
set :keep_releases,       1

# Slack Integration #
#####################################################################################
set :slack_webhook_url,     "https://hooks.slack.com/services/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"

# Rollbar Integration #
#####################################################################################
set :rollbar_env, Proc.new { fetch :stage }
set :rollbar_role, Proc.new { :app }

# Set current time #
#######################################################################################
require 'date'
set :current_time, DateTime.now
set :current_timestamp, DateTime.now.to_time.to_i

# Set node library #
#######################################################################################
#append  :linked_files, ".env"
# append  :linked_dirs, "node_modules"

# set :nvm_type, :user
# set :nvm_node, "v12.7.0"
# set :nvm_map_bins, %w{node npm yarn}

# set :yarn_roles, :all 
# set :yarn_flags, %w(--silent --no-progress)
# set :yarn_env_variables, {} 

# set :npm_flags, '--silent --no-progress'

# Application Tasks #
#######################################################################################
namespace :environment do
    desc "Set environment variables"
    task :set_variables do
        on roles(:app) do
              puts ("--> Copying environment configuration file")
              execute "cp #{release_path}/.env.server #{release_path}/.env"
              puts ("--> Setting environment variables")
              execute "sed --in-place -f #{fetch(:overlay_path)}/parameters.sed #{release_path}/.env"
        end
    end
end

namespace :npm do
    desc "Running Npm Build"
    task :run_build do
        on roles (:all) do
            within release_path do
                execute :npm, "run build", "--silent --no-progress"
            end
        end
    end
end

namespace :yarn do
    desc "Running Yarn Build"
    task :run_build do
        on roles (:all) do
            within release_path do
                execute fetch(:yarn_bin), "build", "--production --silent --no-progress"
            end
        end
    end
end

namespace :covid19 do
    desc "Create shared folders"
    task :create_library_folder do
        on roles(:all) do
            execute "mkdir -p #{shared_path}/lib"
        end
    end

    task :create_overlay_folder do
        on roles(:all) do
            execute "mkdir -p #{deploy_to}/overlay"
        end
    end

    desc "Symbolic link for shared folders"
    task :create_symlink do
        on roles(:app) do
            within release_path do
                execute "rm -rf #{release_path}/node_modules"
                execute "ln -s #{shared_path}/lib/node_modules #{release_path}/node_modules"
            end
        end
    end

    desc "Create ver.txt"
    task :create_ver_txt do
        on roles(:all) do
            puts ("--> Copying ver.txt file")
            execute "cp #{release_path}/config/deploy/ver.txt.example #{release_path}/build/ver.txt"
            execute "sed --in-place 's/%date%/#{fetch(:current_time)}/g
                        s/%branch%/#{fetch(:branch)}/g
                        s/%revision%/#{fetch(:current_revision)}/g
                        s/%deployed_by%/#{fetch(:user)}/g' #{release_path}/build/ver.txt"
            execute "find #{release_path}/build -type f -name 'ver.txt' -exec chmod 664 {} \\;"
        end
    end

end

# DevOps Tasks #
#######################################################################################
namespace :devops do
    desc "Setup Application Directories"
    task :set_up do
        on roles(:all) do
            invoke "covid19:create_overlay_folder"
            invoke "covid19:create_library_folder"
        end
    end

    desc "Copy Parameter File(s)"
    task :copy do
        on roles(:all) do |host|
            %w[ parameters.sed ].each do |f|
            upload! "./config/deploy/parameters/#{fetch(:env)}/" + f , "#{fetch(:overlay_path)}/" + f
            end
        end
    end

    desc "Get Current Release Information"
    task :app_ver do
        on roles(:all) do
           execute "curl #{fetch(:site_url)}/ver.txt"
        end
    end
end

# Slack Tasks #
#######################################################################################
namespace :slack do
    desc "Test Slack Incoming Webhook"
    task :test do
        on roles(:all) do
            execute "curl -s -X POST -H 'Content-type: application/json' --data '{\"text\":\"Hello! from the other side.\\nSee you later!\"}' #{fetch(:slack_webhook_url)}"
        end
    end

    desc "Notify Slack"
    task :notify do
        on roles(:all) do
            execute "curl -s -X POST -H 'Content-type: application/json' --data '{\"attachments\":[{\"fallback\":\"#{fetch(:notify_message)}\",\"color\":\"#{fetch(:notify_color)}\",\"pretext\":\"\",\"title\":\"#{fetch(:job_title)}\",\"title_link\":\"\",\"text\":\"#{fetch(:notify_message)}\",\"fields\":[{\"title\":\"Server URL\",\"value\":\"#{fetch(:site_url)}\",\"short\":false},{\"title\":\"Server\",\"value\":\"#{fetch(:env).upcase}\",\"short\":true},{\"title\":\"Branch\",\"value\":\"<#{fetch(:repo_base_url)}/#{fetch(:repo_branch_path)}/#{fetch(:branch)}|#{fetch(:branch)}> | <#{fetch(:repo_base_url)}/#{fetch(:repo_diff_path)}#{fetch(:branch)}|View Comparison>\",\"short\":true},{\"title\":\"Deployed By\",\"value\":\"#{fetch(:user)}\",\"short\":true},{\"title\":\"Commit SHA\",\"value\":\"#{fetch(:commit_detail)}\",\"short\":true}],\"image_url\":\"\",\"thumb_url\":\"\",\"footer\":\"<http://capistranorb.com|Capistrano>\",\"footer_icon\":\"https://pbs.twimg.com/profile_images/378800000067686459/5da4e1d78e930197cb7dc002ceafdfda.png\",\"ts\":#{fetch(:current_timestamp)}}]}' #{fetch(:slack_webhook_url)}"
            Rake::Task["slack:notify"].reenable
        end
    end

    desc 'Slack notification on deployment start'
    task :start do
        on roles(:all) do
            set :job_title, "Deployment Started for #{fetch(:application)}"
            set :notify_message, "#{fetch(:user)} is deploying #{fetch(:application)}/#{fetch(:branch)} to #{fetch(:env)}."
            set :notify_color, "#FA9040"
            set :commit_detail, "N/A"
            execute "curl -s -X POST -H 'Content-type: application/json' --data '{\"attachments\":[{\"fallback\":\"#{fetch(:notify_message)}\",\"color\":\"#{fetch(:notify_color)}\",\"pretext\":\"\",\"title\":\"#{fetch(:job_title)}\",\"title_link\":\"\",\"text\":\"#{fetch(:notify_message)}\",\"image_url\":\"\",\"thumb_url\":\"\",\"footer\":\"<http://capistranorb.com|Capistrano>\",\"footer_icon\":\"https://pbs.twimg.com/profile_images/378800000067686459/5da4e1d78e930197cb7dc002ceafdfda.png\",\"ts\":#{fetch(:current_timestamp)}}]}' #{fetch(:slack_webhook_url)}"
        end
    end

    desc 'Slack notification on deployment completion'
    task :deployed do
        on roles(:all) do
            set :job_title, "Deployment Completed for #{fetch(:application)}"
            set :notify_message, "#{fetch(:user)} finished deploying #{fetch(:application)}/#{fetch(:branch)} to #{fetch(:env)}."
            set :notify_color, "#36A64F"
            set :commit_detail, "<#{fetch(:repo_base_url)}/#{fetch(:repo_commit_path)}/#{fetch(:current_revision)}|#{fetch(:current_revision)}>"
            invoke "slack:notify"
        end
    end

    desc 'Slack notification on deployment failed'
    task :notify_deploy_failed do
        on roles(:all) do
            set :job_title, "Deployment Failed for #{fetch(:env)}"
            set :notify_message, "Error deploying branch. Check capistrano.log file."
            set :notify_color, "#FF0000"
            set :commit_detail, "<#{fetch(:repo_base_url)}/#{fetch(:repo_commit_path)}/#{fetch(:current_revision)}|#{fetch(:current_revision)}>"
            invoke "slack:notify"
        end
    end
end

#######################################################################################

desc "Setup Initialize"
task :setup do
    invoke "devops:set_up"
    invoke "devops:copy"
end

desc "Update Environment File"
task :update_env do
    invoke "devops:copy"
    invoke "environment:set_variables"
end

desc "Get Current Release Information"
task :app_ver do
    invoke "devops:app_ver"
end

namespace :deploy do
    # after :starting, "slack:start"
    after :updated, "environment:set_variables"
    # after :updated, "npm:run_build"
    # after :updated, "yarn:run_build"
    # after :published, "covid19:create_symlink"
    after :finished, "covid19:create_ver_txt"
    # after :finished, "slack:deployed"
    # after :failed, "slack:notify_deploy_failed"
end
