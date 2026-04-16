using DzinerProgram.Models;

namespace DzinerProgram.Services
{
    public class LocalStorageService
    {
        private readonly string outputFolder = "Output/";

        public string SaveZpl(string zpl, LabelData data)
        {
            if (!Directory.Exists(outputFolder))
            {
                Directory.CreateDirectory(outputFolder);
            }
            string fileName = Path.Combine(outputFolder, $"{data.Date.Replace('/', '.')}_{data.Product}.zpl");
            File.WriteAllText(fileName, zpl);

            Console.WriteLine($"ZPL saved to: {fileName}");
            return fileName;
        }
    }
}
