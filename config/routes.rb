Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'root#index'
  get '*page', to: 'root#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
