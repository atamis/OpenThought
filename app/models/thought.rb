class Thought
  include Mongoid::Document
  include Mongoid::Timestamps
  field :thought, :type => String
  belongs_to :user
  validates_presence_of :thought
end
