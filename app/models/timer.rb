class Timer < ActiveRecord::Base

  structure do
    url_key           :string, validates: [:uniqueness], null: true, index: true
    admin_key         :string, validates: [:presence],               index: true
    twitter_hashtag   :string
    time              :integer
  end

  attr_accessible :twitter_hashtag, :time, as: :admin

  before_validation :generate_admin_key
  after_create      :generate_url_key

  private

  def generate_admin_key
    self.admin_key = SecureRandom.hex(10)
  end

  URL_KEY_RING = [ *0..9, *'a'..'z', *'A'..'Z' ].join

  def generate_url_key
    value  = self.id
    result = ''

    until value == 0
      result << URL_KEY_RING[ value % URL_KEY_RING.length ]
      value /= URL_KEY_RING.length
    end

    update_attribute('url_key', result)
  end

end
