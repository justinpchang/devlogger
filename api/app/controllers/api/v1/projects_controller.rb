# frozen_string_literal: true
# typed: true

module Api
  module V1
    class ProjectsController < ApplicationController
      respond_to :json
      before_action :set_user!, only: %i[index]
      before_action :authenticate_user!, only: %i[create]

      def index
        render json: { projects: @user.projects }
      end

      def create
        project =
          current_user.projects.create!(
            name: params[:name],
            slug: params[:slug],
            homepage: params[:homepage],
            description: params[:description],
          )
        render json: { project: project }
      end

      private

      def set_user!
        @user = User.find_by(username: params[:user_username])
      end
    end
  end
end
