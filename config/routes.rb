Stopwatch::Application.routes.draw do
  match '/demo' => 'home#demo'
  match '/presentation' => 'home#presentation'
  match '/startup' => 'home#startup'

  get  '/:id',            to: 'timer#show', as: :timer
  post '/timer/:id/event',to: 'timer#event'

  root :to => 'timer#index'
end
