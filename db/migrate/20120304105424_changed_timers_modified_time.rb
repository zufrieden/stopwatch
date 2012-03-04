class ChangedTimersModifiedTime < ActiveRecord::Migration
  def self.up
    change_column :timers, :time, :integer
  end
  
  def self.down
    change_column :timers, :time, :time, :limit=>nil
  end
end
