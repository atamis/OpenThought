class HomeController < ApplicationController
  before_filter :authenticate_user!
  def index
    @users = User.all
    @thoughts = current_user.thoughts
  end
end
