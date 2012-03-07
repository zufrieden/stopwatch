module ApplicationHelper
  def current_timer_or_root_path
    current_timer ? timer_path(current_timer.url_key) : root_path
  end
end
