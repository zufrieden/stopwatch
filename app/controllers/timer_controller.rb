class TimerController < ApplicationController
  respond_to :json

  def event
    if publish_timer_action(params[:timer])
      render nothing: true, status: 200
    else
      render nothing: true, status: :not_acceptable
    end
  end

  private

  def publish_timer_action(timer = {})
    if !%(start stop reset).include?(timer[:event]) || (timer[:time] && !timer[:time].is_a?(Hash))
      result = false
    else
      result = PrivatePub.publish_to('/timer/event',
        event: timer[:event],
        time: timer[:time]
      )

      result = result.code_type == Net::HTTPOK
    end

    result
  end

end
