require 'spec_helper'

describe StaticController do

  describe "GET 'about'" do
    it "should be successful" do
      get 'about'
      response.should be_success
    end
  end

  describe "GET 'api'" do
    it "should be successful" do
      get 'api'
      response.should be_success
    end
  end

end
