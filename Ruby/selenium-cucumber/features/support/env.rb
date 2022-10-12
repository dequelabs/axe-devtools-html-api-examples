require "axe-selenium"
require 'webdrivers'
require "axe-cucumber-steps"

Before do
  @driver = AxeSelenium.configure(:chrome) do |c|
  end
end

After do
  @driver.page.close
end

at_exit do
    logs = (Dir.pwd)<<"/axe-reports"
    reporter = (Dir.pwd)<<'/resources/reporter-cli-macos'
    destination = (Dir.pwd)<<'/a11y-results'
    command_html = reporter << " " << logs << " --destination " << destination << " --format html"
    system command_html
  end

