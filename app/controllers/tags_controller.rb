class TagsController < ApplicationController
  def index
    @tags = current_user.thoughts.tag_counts_on(:tags).map { |x| {name: x.name, count: x.count} }

    respond_to do |format|
      format.json { render :json => @tags }
      format.xml { render :xml => @tags }
    end
  end

  def show
    @thoughts = current_user.thoughts.tagged_with(params[:tag])

    respond_to do |format|
      format.html
      format.json { render :json => @thoughts }
      format.xml { render :xml => @thoughts }
    end
  end

end
