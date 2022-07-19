require "rspec"
require "axe-rspec"
require "axe-selenium"
require 'webdrivers'
#require "capybara/rspec"

#@driver = AxeSelenium.configure(:firefox) do |c|
#end

RSpec.configure do |config|
  config.before :each do
    @driver = AxeSelenium.configure(:chrome) do |c|
  end
      
  end
  config.color = true
end