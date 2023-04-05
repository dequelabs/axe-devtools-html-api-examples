Feature: Perform accessibility scan with Axe DevTools API on Web Pages

  Scenario: Accessibility scan on the application homepage
    * def analyze =
      """
      function(arg) {
       	var axeFunctions = Java.type('axeFunctions.Functions');
       	var axe = new axeFunctions();
       	return axe.axeScan(arg);
      }
      """
    * call analyze 'https://broken-workshop.dequelabs.com/'
    * def reports =
      """
      function() {
       	var axeFunctions = Java.type('axeFunctions.Functions');
       	var axe = new axeFunctions();
       	return axe.generateReports();
      }
      """
    * call reports
