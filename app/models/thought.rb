class Thought
  include Mongoid::Document
  field :thought, :type => String
  belongs_to :user
  validates_presence_of :thought
end
