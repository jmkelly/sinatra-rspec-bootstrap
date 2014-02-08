require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe 'Initial Smoke Test' do
      it "returns the home page" do
        get '/'
          last_response.body.should include 'Cover'
          last_response.body.should include 'Home'
          last_response.body.should include 'Features'
          last_response.body.should include 'Contact'
          last_response.body.should include 'Learn more'
          last_response.should be_ok
      end
end
