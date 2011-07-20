require 'spec_helper'

describe Thought do
  it "validates presence" do
    t = Thought.new
    t.should_not be_valid
    t.thought = "thinking..."
    t.shoud be_valid
  end
end
