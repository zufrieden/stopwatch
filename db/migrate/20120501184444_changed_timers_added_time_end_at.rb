class ChangedTimersAddedTimeEndAt < ActiveRecord::Migration
  def self.up
    add_column :timers, :time_end_at, :datetime, :null=>true
  end
  
  def self.down
    remove_column :timers, :time_end_at
  end
end
