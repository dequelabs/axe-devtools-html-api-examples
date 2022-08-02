require "rspec"
require "axe-rspec"
require "axe-selenium"
require 'webdrivers'

RSpec.configure do |config|
  config.before :each do
    @driver = AxeSelenium.configure(:chrome) do |c|
  end
      
  end
  config.color = true
end