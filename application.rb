require 'sinatra'
require 'sequel'
require 'logger'
require 'yaml'
require "sinatra/reloader" if development?

DB = Sequel.connect(YAML.load_file('config/database.yaml')[settings.environment.to_s]) 
DB.loggers << Logger.new($sdout)

get '/' do
    erb :landing, :layout => :index 
end

get '/main' do 
    erb :main, :layout => :index
end

get '/temperatures' do
  start_date = params[:start_date]
  end_date = params[:end_date]
end

