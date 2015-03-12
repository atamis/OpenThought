class ThoughtsController < ApplicationController
  before_filter :authenticate_user!
  before_filter :authorized, :except => [:index, :create]

  def authorized
    current_user.id = Thought.find(params[:id]).id
  end

  def index
    @thoughts = current_user.thoughts.order("created_at DESC").page(params[:page])
    @new_thought = Thought.new

    respond_to do |format|
      format.html
      format.json { render :json => @thoughts}
      format.xml { render :xml => @thoughts}
    end
  end

  def show
    @thought = Thought.find(params[:id])

    respond_to do |format|
      format.json { render :json => @thought }
      format.xml { render :xml => @thought }
    end
  end

  def create
    #@thought = Thought.new
    #@thought.body = request.body.read
    #@thought.user_id = current_user.id
    @thought = Thought.new(params[:thought])
    @thought.user_id = current_user.id
    respond_to do |format|
      if @thought.save
        format.html { redirect_to Rails.application.routes.url_helpers.thoughts_path }
        format.json	{ render :json => @thought, :status => :created }
        format.xml	{ render :xml => @htought, :status => :created }
      else
        format.json	{ render :json => @thought.errors, :status => :unprocessable_entity }
        format.xml	{ render :xml => @thought.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @thought = Thought.find(params[:id])
    @thought.destroy

    respond_to do |format|
      format.html {redirect_to Rails.application.routes.url_helpers.thoughts_path}
      format.json { head :ok }
      format.xml { head :ok }
    end
  end
end
