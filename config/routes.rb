Stopwatch::Application.routes.draw do

  match '/demo' => 'home#demo'
  match '/presentation' => 'home#presentation'
  root :to => 'home#presentation'

end
