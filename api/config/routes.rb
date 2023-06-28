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
      resources :users do
        get 'me', on: :collection
        resources :projects, only: [:index]
      end
      resources :projects, only: [:create] do
        resources :updates, only: [:create]
      end
      resources :updates, only: [:index]
    end
  end
end
