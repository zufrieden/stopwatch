class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def faye_client
    @faye_client ||= env['faye.client']
  end
end
