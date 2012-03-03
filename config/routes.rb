Stopwatch::Application.routes.draw do

  post '/timer/event' => 'timer#event', :via => :post

  match '/demo' => 'home#demo'
  match '/presentation' => 'home#presentation'

  root :to => 'home#presentation'

end
