package testRunner;

import com.intuit.karate.junit5.Karate;

public class ExampleTest {

	 @Karate.Test
	    Karate testSample() {
		 	return Karate.run("src/test/java/featureFiles/axeAPIExampleTest.feature");
	    }
}
