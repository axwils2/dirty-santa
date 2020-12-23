Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  mount ActionCable.server => '/cable'

  namespace :api, defaults: { format: 'json' } do
    scope module: :v1 do
      resources :players, param: :token do
        resources :avatars, only: %i[create update], controller: 'players/avatars'
        resources :gifts, only: %i[new show create update], controller: 'players/gifts'
      end

      resources :gifts do
        resources :images, only: %i[create update], controller: 'gifts/images'
      end
    end
  end

  root 'root#index'
  get '*page', to: 'root#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
