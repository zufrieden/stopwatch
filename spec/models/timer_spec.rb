require 'spec_helper'

describe Timer do
  it { should be_built_by_factory }
  it { should be_created_by_factory }

  it { should have_db_column(:url_key) }
  it { Factory.create(:timer); should validate_uniqueness_of(:url_key) }
  it { should_not allow_mass_assignment_of(:url_key) }

  it 'newest saved record should have url_key initialized' do
    timer = Factory.build(:timer)
    timer.save

    timer.url_key.should_not be_nil
  end

  it { should have_db_column(:admin_key) }
  xit { should validate_presence_of(:admin_key) }
  it { should_not allow_mass_assignment_of(:admin_key) }

  it 'newest saved record should have admin_key initialized' do
    timer = Factory.build(:timer, admin_key: nil)
    timer.save

    timer.admin_key.should_not be_nil
  end

  it { should have_db_column(:twitter_hashtag) }
  it { should allow_mass_assignment_of(:twitter_hashtag).as(:admin) }

  it { should have_db_column(:time) }
  it { should allow_mass_assignment_of(:time).as(:admin) }

end
