# frozen_string_literal: true

json.partial! 'projects/project_with_user', project: @project
json.subscribed @project.subscribers.exists?(id: @current_user_id)
