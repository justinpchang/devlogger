# frozen_string_literal: true
# typed: true

class DeviseCustomFailure < Devise::FailureApp
  def respond
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = { message: 'User is not signed in' }.to_json
  end
end
