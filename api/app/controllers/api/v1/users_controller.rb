# frozen_string_literal: true
# typed: true

module Api
  module V1
    class UsersController < ApplicationController
      respond_to :json

      before_action :authenticate_user!, only: [:me]

      # Get current user
      def me
        render json: { user: current_user }
      end
    end
  end
end
