# frozen_string_literal: true
# typed: true

module Api
  module V1
    class UpvotesController < ApplicationController
      respond_to :json
      before_action :set_update!, only: %i[create destroy]
      before_action :authenticate_user!, only: %i[create destroy]

      def create
        @update.upvotes.where(user: current_user).first_or_create!
      end

      def destroy
        Upvote.find_by(update_id: @update.id, user: current_user)&.destroy!
      end

      private

      def set_update!
        @update = Update.find(params[:update_id])
      end
    end
  end
end
