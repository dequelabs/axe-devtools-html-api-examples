using ReportResults = Deque.AxeDevtools.Results.ReportResults;
using System.IO;
using Newtonsoft.Json;
using System.Diagnostics;

namespace AxeTest {
    public class AxeReporting {
        public static void CreateResultsOutput(ReportResults results, string TestCaseName) {
            Directory.CreateDirectory("reports");
            var violations = JsonConvert.SerializeObject(results, Formatting.Indented);
            File.WriteAllText("reports/axe-" + TestCaseName + ".json", violations);
        }
    }
}
