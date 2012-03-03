class HomeController < ApplicationController
	def demo
	end

	def presentation
		render "presentation", layout: false
	end
end
