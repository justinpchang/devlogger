# frozen_string_literal: true

json.partial! 'users/user', user: @user
json.subscribed @user.subscribers.exists?(id: @current_user_id)
