class Thought < ActiveRecord::Base
  belongs_to :user
  acts_as_taggable
  acts_as_taggable_on :tags

  before_save :set_tags
  before_create :set_tags

  def set_tags
    x = self.body.scan(/#([a-zA-Z]+)/).flatten.map(&:downcase)
    self.tag_list = x.join(', ') unless x == []
  end
end
