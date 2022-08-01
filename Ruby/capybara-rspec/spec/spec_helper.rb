require "selenium/webdriver"
require "capybara/rspec"
require "webdrivers"
Capybara.configure do |config|
  config.default_max_wait_time = 10 # seconds
  config.default_driver = :selenium_chrome
end

RSpec.configure do |config|
  config.include Capybara::DSL
end

include Capybara::DSL

Capybara.register_driver :selenium_chrome do |app|
    Capybara::Selenium::Driver.new(app, browser: :chrome)
  end
  
  Capybara.javascript_driver = :selenium_chrome
