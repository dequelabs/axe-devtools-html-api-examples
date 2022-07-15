require 'webdrivers'
require 'axe-selenium'

driver = AxeSelenium.configure(:chrome) do |c|
    # c.jslib_path = ""
  end
driver.page.navigate.to "https://deque.com/"
})
