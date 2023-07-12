# frozen_string_literal: true
# typed: true

module Api
  module V1
    class ProjectsController < ApplicationController
      respond_to :json
      before_action :set_project!, only: %i[show update]
      before_action :set_user!, only: %i[index]
      before_action :authenticate_user!, only: %i[create update]

      def index
        @projects = @user.projects
      end

      def show
        @current_user_id = current_user&.id
      end

      def create
        project =
          current_user.projects.create!(
            name: params[:name],
            slug: params[:slug],
            homepage: params[:homepage],
            description: params[:description],
          )
        render partial: 'projects/project_with_user', locals: { project: project }
      end

      def update
        require_owner!
        project = params.require(:project)
        @project.update!(
          name: project['name'],
          slug: project['slug'],
          homepage: project['homepage'],
          description: project['description'],
        )
        render partial: 'projects/project_with_user', locals: { project: @project }
      end

      private

      def set_project!
        @project = Project.find_by!(slug: params[:slug])
      end

      def set_user!
        @user = User.find_by(username: params[:user_username])
      end

      def require_owner!
        unless @project.user == current_user
          render json: { error: 'You are not the owner of this project' }, status: 401
        end
      end
    end
  end
end
