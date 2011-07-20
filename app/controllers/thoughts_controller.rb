class ThoughtsController < ApplicationController
  before_filter :authenticate_user!

  # GET /thoughts
  # GET /thoughts.xml
  def index
    @thoughts = current_user.thoughts

    respond_to do |format|
      format.xml  { render :xml => @thoughts }
      format.json  { render :json => @thoughts }
    end
  end

  # GET /thoughts/1
  # GET /thoughts/1.xml
  def show
    @thought = Thought.find(params[:id])

    respond_to do |format|
      format.xml  { render :xml => @thought }
      format.json  { render :json => @thought }
    end
  end

  # GET /thoughts/new
  # GET /thoughts/new.xml
  def new
    @thought = Thought.new

    respond_to do |format|
      format.xml  { render :xml => @thought }
      format.json { render :json => @thought }
    end
  end

  # GET /thoughts/1/edit
  def edit
    @thought = Thought.find(params[:id])
  end

  # POST /thoughts
  # POST /thoughts.xml
  def create
    if params[:simple_thought]
      @thought = current_user.thoughts.new(thought: params[:simple_thought])
    else
      @thought = current_user.thoughts.new(params[:thought])
    end

    respond_to do |format|
      if @thought.save
        format.xml  { render :xml => @thought, :status => :created, :location => @thought }
        format.xml  { render :json => @thought, :status => :created, :location => @thought }
        format.js
      else
        format.xml  { render :xml => @thought.errors, :status => :unprocessable_entity }
        format.json  { render :json => @thought.errors, :status => :unprocessable_entity }
        format.js
      end
    end
  end

  # PUT /thoughts/1
  # PUT /thoughts/1.xml
  def update
    @thought = Thought.find(params[:id])

    respond_to do |format|
      if @thought.update_attributes(params[:thought])
        format.xml  { head :ok }
        format.json  { head :ok }
      else
        format.xml  { render :xml => @thought.errors, :status => :unprocessable_entity }
        format.json  { render :json => @thought.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /thoughts/1
  # DELETE /thoughts/1.xml
  def destroy
    @thought = Thought.find(params[:id])
    @id = params[:id]
    @thought.destroy

    respond_to do |format|
      format.xml  { head :ok }
      format.json  { head :ok }
      format.js
    end
  end
end
