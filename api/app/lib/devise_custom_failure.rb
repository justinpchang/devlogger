# frozen_string_literal: true
# typed: true

class DeviseCustomFailure < Devise::FailureApp
  def respond
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = { message: 'You need to sign in or sign up before continuing.' }.to_json
  end
end
