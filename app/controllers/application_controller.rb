class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  #
  # Methods
  #

  # Return instance of Faye client
  #
  # @return [Faye::Client] Faye client instance
  def faye_client
    @faye_client ||= env['faye.client']
  end

  # Return a list of robots user agents strings
  #
  # @return [Array<String>] array of user agent string
  def robots
    Rails.cache.fetch('useragents_bots', expires_in: 1.month) do
      data = Nokogiri::HTML(Net::HTTP.get_response(URI.parse('http://www.user-agents.org/allagents.xml')).body)
      data.xpath('//user-agent/type[contains(text(),"R")]/../string/text() |  /user-agent/type[contains(text(),"C")]/../string/text()').map(&:to_s)
    end
  end
end
