# frozen_string_literal: true
# typed: true

module Api
  module V1
    class UpdatesController < ApplicationController
      respond_to :json
      before_action :set_project!, only: %i[create]
      before_action :verify_project_owner!, only: %i[create]
      before_action :authenticate_user!, only: %i[create]

      def index
        @updates = Update.includes(project: :user).order(created_at: :desc)
        @updates =
          if params[:user_username]
            # User feed
            @updates.where(projects: { user: User.find_by(username: params[:user_username]) })
          elsif params[:project_slug]
            # Project feed
            @updates.where(projects: { slug: params[:project_slug] })
          else
            # Global feed
            Update.includes(project: :user).all.order(created_at: :desc)
          end
      end

      def create
        update = @project.updates.create!(title: params[:title], description: params[:description])
        render json: { update: update }
      end

      private

      def set_project!
        @project = Project.find(params[:project_id])
      end

      def verify_project_owner!
        return if @project.user == current_user

        render json: { error: 'You are not the owner of this project' }, status: 401
      end
    end
  end
end
