class HomeController < ApplicationController
	def demo
	end

	def presentation
		render "presentation", layout: false
	end

	def startup
		render "startup", layout: false
	end
end
