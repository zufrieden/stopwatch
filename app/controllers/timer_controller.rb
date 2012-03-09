class TimerController < ApplicationController
  respond_to :json, only: [:event]
  respond_to :html, only: [:index, :show]

  before_filter :check_robots, only: [:index, :show]

  def index
    # create a new timer
    @timer = Timer.create!

    # register current session has admin for new timer
    session[:timer_admin_url_keys] ||= []
    session[:timer_admin_url_keys] << @timer.url_key

    # redirect to new timer page
    redirect_to timer_url(@timer.url_key)
  end

  def show
    @timer = Timer.where('url_key = ?', params[:id]).first || raise(ActiveRecord::RecordNotFound)
    session[:timer_url_key] = @timer.url_key
  end

  def update
    @timer = Timer.where('url_key = ?', params[:id]).first || raise(ActiveRecord::RecordNotFound)

    options = params[:timer]
    options[:time] &&= options[:time][:hours].to_i.hours + options[:time][:minutes].to_i.minutes + options[:time][:seconds].to_i.seconds

    if @timer.update_attributes(options, as: :admin)
      publish_timer_event(params[:id], params[:timer].merge({ event: 'reset' }))
      render nothing: true, status: 200
    else
      render nothing: true, status: :not_acceptable
    end
  end

  def event
    # return unauthorized status if current session user is not an admin
    if !admin?
      render nothing: true, status: :unauthorized
    # return success status if event can be sent to clients
    elsif publish_timer_event(params[:id], params[:timer])
      render nothing: true, status: 200
    # or return not acceptable if not
    else
      render nothing: true, status: :not_acceptable
    end
  end

  private

  #
  # Methods
  #

  # Send event to all registred timer
  #
  # @return [Boolean] return false if params is invalid
  def publish_timer_event(url_key, timer = {})
    if !timer[:event] || !%(start stop reset).include?(timer[:event]) || (timer[:time] && !timer[:time].is_a?(Hash))
      false
    else
      faye_client.publish("/timer/#{url_key}/event",
        event: timer[:event],
        time: timer[:time]
      )

      true
    end
  end

  #
  # Filters
  #

  # Render about page when visited by a bot
  #
  # @return [Boolean] return false when a robot is detected
  def check_robots
    if robots.include?(request.user_agent)
      if request.path == root_path
        render 'home/about'
      else
        redirect_to root_url, status: :moved_permanently
      end

      false
    else
      true
    end
  end

end
