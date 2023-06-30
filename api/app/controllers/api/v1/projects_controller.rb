# frozen_string_literal: true
# typed: true

module Api
  module V1
    class ProjectsController < ApplicationController
      respond_to :json
      before_action :set_project!, only: %i[show]
      before_action :set_user!, only: %i[index]
      before_action :authenticate_user!, only: %i[create]

      def index
        @projects = @user.projects
      end

      def show
        @project
      end

      def create
        @project =
          current_user.projects.create!(
            name: params[:name],
            slug: params[:slug],
            homepage: params[:homepage],
            description: params[:description],
          )
      end

      private

      def set_project!
        @project = Project.find_by(slug: params[:slug])
      end

      def set_user!
        @user = User.find_by(username: params[:user_username])
      end
    end
  end
end
