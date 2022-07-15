require 'webdrivers'
require 'axe-selenium'

driver = AxeSelenium.configure(:chrome) do |c|
    c.jslib_path = "next-version/axe.js"
  end
driver.navigate.to "https://broken-workshop.dequelabs.com/"
driver.quit()
