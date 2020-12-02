Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  namespace :api, defaults: { format: 'json' } do
    scope module: :v1 do
      resources :players, param: :token, only: %i[show]
    end
  end

  root 'root#index'
  get '*page', to: 'root#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
