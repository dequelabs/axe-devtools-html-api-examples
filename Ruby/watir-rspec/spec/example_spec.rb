require "spec_helper"
require 'axe/core'
require 'axe/api/run'


describe "Watir RSpec - ",
         :type => :feature, :driver => :selenium do
  
  after(:each) do
    @driver.page.close
  end
      
 
  it "Test the homepage for a11y issues" do
    output_json_file = "a11y_homepage"
    @driver.page.goto "https://broken-workshop.dequelabs.com/"
    expect(@driver.page).to be_audited_for_accessibility.logging_results({ui_state: output_json_file}) 
    end

    it "Test the recipe card for a11y issues" do
      output_json_file = "a11y_recipecard"
      @driver.page.goto "https://broken-workshop.dequelabs.com/"
      @driver.page.button(index: 1).click
      expect(@driver.page).to be_audited_for_accessibility.logging_results({ui_state: output_json_file}) 
    end

    after(:all) do
        logs = (Dir.pwd)<<"/axe-reports"
        reporter = (Dir.pwd)<<'/resources/reporter-cli-macos'
        destination = (Dir.pwd)<<'/a11y-results'
        command_html = reporter << " " << logs << " --destination " << destination << " --format html"
        system command_html
    end
end