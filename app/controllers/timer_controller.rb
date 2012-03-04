class TimerController < ApplicationController
  respond_to :json, only: [:event]
  respond_to :html, only: [:index, :show]

  def index
    @timer = Timer.create!
    redirect_to timer_url(@timer.url_key)
  end

  def show
    @timer = Timer.where('url_key = ?', params[:id]).first
    raise ActiveRecord::RecordNotFound unless @timer
  end

  def event
    if publish_timer_action(params[:id], params[:timer])
      render nothing: true, status: 200
    else
      render nothing: true, status: :not_acceptable
    end
  end

  private

  def publish_timer_action(url_key, timer = {})
    if !%(start stop reset).include?(timer[:event]) || (timer[:time] && !timer[:time].is_a?(Hash))
      result = false
    else
      result = PrivatePub.publish_to("/timer/#{url_key}/event",
        event: timer[:event],
        time: timer[:time]
      )

      result = result.code_type == Net::HTTPOK
    end

    result
  end

end
