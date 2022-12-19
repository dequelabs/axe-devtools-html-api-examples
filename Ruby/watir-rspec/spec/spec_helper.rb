require "rspec"
require "watir"
require "axe-rspec"
require "axe-watir"
require "webdrivers"

RSpec.configure do |config|
  config.before :each do
    @driver = AxeWatir.configure(:chrome) do |c| end
  end
  config.color = true
end
