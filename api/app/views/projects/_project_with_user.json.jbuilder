# frozen_string_literal: true

json.partial! 'projects/project', project: project
json.user { json.partial! 'users/user', user: project.user }
