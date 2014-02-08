require 'sinatra'
require "sinatra/reloader" if development?

get '/' do
    erb :landing, :layout => :index 
end

get '/main' do 
    erb :main, :layout => :index
end
