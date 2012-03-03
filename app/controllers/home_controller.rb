class HomeController < ApplicationController
	def index
	end

	def presentation
		render "presentation", layout: false
	end
end
