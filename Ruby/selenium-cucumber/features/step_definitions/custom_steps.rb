When(/^I navigate to "(.*?)"$/) do |url|
  @driver.page.navigate.to url
end


Then('click on the recipe card button') do
    @driver.page.find_element(css: '#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click
  end