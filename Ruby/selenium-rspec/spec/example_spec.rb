require "spec_helper"
require 'axe/core'
require 'axe/api/run'

describe 'Analyse webpage for a11y issues' do 
  it 'Analyse broken-workshop homepage for a11y issues' do
    @driver.page.navigate.to "https://broken-workshop.dequelabs.com/"
    expect(@driver.page).to be_audited_for_accessibility.logging_results({ui_state: 'homepage-analyse'})
  end
  
  it 'Analyse broken-workshop recipe card for a11y issues' do
    @driver.page.navigate.to "https://broken-workshop.dequelabs.com/"
    @driver.page.find_element(css: '#main-content > div.Recipes > div:nth-child(1) > div.Recipes__card-foot > button').click
    expect(@driver.page).to be_audited_for_accessibility.logging_results({ui_state: 'recipe-card-analyse'})
  end

  # it 'running bash commands' do
  #   exec'echo "hi"'
  # end
    
  after(:each) do
    @driver.page.quit
  end

  after(:all) do
    logs = "/Users/dq_ankit/main_project/axe-devtools-html-api-examples/Ruby/selenium-rspec/axe-reports"
    reporter = (Dir.pwd)<<'/resources/reporter-cli-macos'
    destination = (Dir.pwd)<<'/a11y-results'
    command_html = reporter << " " << logs << " --destination " << destination << " --format html"
    puts (command_html)
    system command_html
  end

end