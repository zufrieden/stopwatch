Stopwatch::Application.routes.draw do

  post '/timer/event' => 'timer#event', :via => :post

  match '/demo' => 'home#demo'
  match '/presentation' => 'home#presentation'
  match '/startup' => 'home#startup'

  root :to => 'home#presentation'

end
