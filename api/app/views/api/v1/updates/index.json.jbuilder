# frozen_string_literal: true
json.array! @updates do |update|
  json.partial! 'updates/update', update: update
  json.project { json.partial! 'projects/project', project: update.project }
  json.user { json.partial! 'users/user', user: update.project.user }
end
