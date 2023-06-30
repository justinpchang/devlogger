# frozen_string_literal: true
json.extract!(user, :id, :username, :name, :about, :website)
json.avatar do
  json.url user.avatar.url
  json.thumbnail_url user.avatar.url(:thumbnail)
end
