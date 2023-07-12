# frozen_string_literal: true
# typed: true

module Api
  module V1
    class SubscriptionsController < ApplicationController
      respond_to :json
      before_action :set_subscribable!, only: %i[create destroy]
      before_action :authenticate_user!, only: %i[create destroy]

      def create
        @subscribable.subscriptions.where(user: current_user).first_or_create!
        head 200
      end

      def destroy
        @subscribable.subscriptions.find_by(user: current_user)&.destroy!
        head 200
      end

      private

      def set_subscribable!
        @subscribable =
          if params[:user_username]
            User.find_by!(username: params[:user_username])
          else
            Project.find_by!(slug: params[:project_slug])
          end
      end
    end
  end
end
