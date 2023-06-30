# frozen_string_literal: true
Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
             }
  get '/member-data', to: 'members#show'

  namespace :api do
    namespace :v1 do
      resources :users, param: :username, only: %i[show update] do
        resources :updates, only: [:index]
        resources :projects, only: [:index]
        get 'me', on: :collection
        post 'avatar', on: :member
      end
      resources :projects, param: :slug, only: %i[show create update] do
        resources :updates, only: %i[index create]
      end
      resources :updates, only: [:index]
    end
  end
end
