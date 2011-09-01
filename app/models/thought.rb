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
    self.tags = self.thought.scan(/#([a-zA-Z]+)/).flatten.map(&:downcase)
  end

  def self.thoughts_for tag, user
    Thought.where(user_id: user.id).any_in(:tags => [tag])
  end

  def self.all_tags(user)
    user.thoughts.map(&:tags).flatten.uniq
  end

  def self.weighted_tags user
    results = {}
    Thought.where(user_id: user.id).only(:tags).each do |thought|
      thought.tags.each do |tag|
        if results.has_key?(tag)
          results[tag] += 1
        else
          results[tag] = 1
        end
      end
    end
    return results
  end
end
