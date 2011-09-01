class HomeController < ApplicationController
  before_filter :authenticate_user!
  def index
    @users = User.all
    @thoughts = current_user.thoughts.desc(:updated_at)
    @tags = Thought.weighted_tags(current_user)
  end
end
