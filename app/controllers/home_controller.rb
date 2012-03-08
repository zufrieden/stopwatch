class HomeController < ApplicationController
  def about
    render 'about'
  end	

  def presentation
    render 'presentation', layout: false
  end

  def startup
    render 'startup', layout: false
  end
end
