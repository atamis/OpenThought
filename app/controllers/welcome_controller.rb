class WelcomeController < ApplicationController
  def index
    if current_user
      redirect_to '/dashboard'
    end
  end
end
