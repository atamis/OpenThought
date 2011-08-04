class Thought
  include Mongoid::Document
  include Mongoid::Timestamps
  field :thought, :type => String
  field :tags, :type => Array, :default => []
  belongs_to :user
  validates_presence_of :thought

  before_save :set_tags
  before_create :set_tags

  def set_tags
    self.tags = self.thought.scan(/#([a-zA-Z]+)/).flatten
  end

  def self.thoughts_for tag
    Thought.any_in(:tags => [tag])
  end

  def self.all_tags(user)
    user.thoughts.map(&:tags).flatten
  end
end
