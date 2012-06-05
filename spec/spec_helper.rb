require File.dirname(__FILE__) + '/../application'

require 'rspec'
require 'rack/test'
require 'capybara'
require 'capybara/dsl'

set :environment, :test

RSpec.configure do |conf|
      conf.include Rack::Test::Methods
      conf.include Capybara::DSL
end


def app
      Sinatra::Application
end

Capybara.app = app
