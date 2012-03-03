Stopwatch::Application.routes.draw do

  match '/presentation' => 'home#presentation'
  root :to => 'home#index'

end
