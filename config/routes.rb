Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  namespace :api, defaults: { format: 'json' } do
    scope module: :v1 do
      resources :gifts, only: %i[create update]

      resources :players, param: :token, only: %i[show update] do
        resources :avatars, only: %i[create], controller: 'players/avatars'
      end
    end
  end

  root 'root#index'
  get '*page', to: 'root#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
