class HomeController < ApplicationController
  def index
    if current_user
      redirect_to '/thoughts'
    end
  end
end
