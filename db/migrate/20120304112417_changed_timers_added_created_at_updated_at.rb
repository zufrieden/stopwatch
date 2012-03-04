class ChangedTimersAddedCreatedAtUpdatedAt < ActiveRecord::Migration
  def self.up
    add_column :timers, :created_at, :datetime
    add_column :timers, :updated_at, :datetime
  end
  
  def self.down
    remove_column :timers, :created_at
    remove_column :timers, :updated_at
  end
end
