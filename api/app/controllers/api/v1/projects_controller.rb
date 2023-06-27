# frozen_string_literal: true
# typed: true

module Api
  module V1
    class ProjectsController < ApplicationController
      respond_to :json
      before_action :set_user!, only: %i[index create]

      def index
        render json: @user.projects
      end

      def create
        project = @user.projects.create!(name: params[:name], slug: params[:slug])
        render json: project
      end

      private

      def set_user!
        @user = User.find(params[:user_id])
      end
    end
  end
end
