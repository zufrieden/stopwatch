# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120304112417) do

  create_table "timers", :force => true do |t|
    t.string   "url_key"
    t.string   "admin_key"
    t.string   "twitter_hashtag"
    t.integer  "time"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "timers", ["admin_key"], :name => "index_timers_on_admin_key"
  add_index "timers", ["url_key"], :name => "index_timers_on_url_key", :unique => true

end
