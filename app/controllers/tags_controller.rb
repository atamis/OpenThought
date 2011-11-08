class TagsController < ApplicationController
  before_filter :authenticate_user!
  def index
    @tags = Thought.weighted_tags(current_user).sort

    respond_to do |format|
      format.html
      format.xml { render :xml => @tags }
      format.json { render :json => @tags }
      format.text { render :text => @tags.join("\n") }
    end
  end

  def show
    @thoughts = current_user.thoughts.any_in(:tags => [params[:tag]]).desc(:updated_at)

    respond_to do |format|
      @tags = Thought.weighted_tags(current_user).sort
      format.html do 
        render "home/index"
      end
      format.xml  { render :xml => @thoughts }
      format.json  { render :json => @thoughts }
      format.text  { render :text => @thoughts.map { |x| x.thought }.join("\n") }
    end
  end
end
