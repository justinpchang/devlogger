# frozen_string_literal: true
Rails.application.routes.draw do
  Healthcheck.routes(self)

  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
             }

  namespace :api do
    namespace :v1 do
      resources :users, param: :username, only: %i[show update] do
        resources :updates, only: [:index]
        resources :projects, only: [:index]
        resources :subscriptions, only: %i[create] do
          delete '/', to: 'subscriptions#destroy', on: :collection
        end
        get 'me', on: :collection
        post 'avatar', on: :member
        post 'check_username', on: :collection
      end
      resources :projects, param: :slug, only: %i[show create update] do
        resources :updates, only: %i[index create]
        resources :subscriptions, only: %i[create] do
          delete '/', to: 'subscriptions#destroy', on: :collection
        end
        post 'check_slug', on: :collection
      end
      resources :updates, only: [:index] do
        resources :upvotes, only: %i[create] do
          delete '/', to: 'upvotes#destroy', on: :collection
        end
      end
    end
  end
end
