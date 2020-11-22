Rails.application.routes.draw do
  root 'root#index'
  get '*page', to: 'root#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
end
