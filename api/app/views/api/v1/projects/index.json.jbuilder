# frozen_string_literal: true
json.array! @projects do |project|
  json.partial! 'projects/project', project: project
  json.last_update_posted_at project.updates.pluck(:created_at).max
end
