class CreateTimers < ActiveRecord::Migration
  def self.up
    create_table :timers do |t|
      t.string :url_key, null: :true
      t.string :admin_key
      t.string :twitter_hashtag
      t.time :time
    end
    add_index :timers, :url_key, unique: true
    add_index :timers, :admin_key
  end
  def self.down
    drop_table :timers
  end
end
