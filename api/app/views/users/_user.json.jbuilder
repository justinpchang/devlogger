# frozen_string_literal: true
json.extract!(user, :id, :username, :about)
json.avatar do
  json.url user.avatar.url
  json.thumbnail_url user.avatar.url(:thumbnail)
end
