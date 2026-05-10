using DzinerProgram.Models;

namespace DzinerProgram.Services
{
    public class LocalStorageService
    {
        private readonly string _defaultBase = "Output";

        public string SaveZpl(string zpl, LabelData data)
        {
            string folder = BuildFolder(data.MetaData?.ZplSavePath, "zpl");
            string fileName = BuildFileName(data, "zpl");
            string fullPath = Path.Combine(folder, fileName);
            File.WriteAllText(fullPath, zpl);
            Console.WriteLine($"ZPL saved to: {fullPath}");
            return fullPath;
        }

        public string BuildPdfPath(LabelData data)
        {
            string folder = BuildFolder(data.MetaData?.PdfSavePath, "pdf");
            return Path.Combine(folder, BuildFileName(data, "pdf"));
        }

        private string BuildFolder(string? basePath, string type)
        {
            string root = string.IsNullOrWhiteSpace(basePath) ? _defaultBase : basePath;
            string year = DateTime.Now.Year.ToString();
            string month = DateTime.Now.Month.ToString("D2");
            string folder = Path.Combine(root, year, month, type);
            Directory.CreateDirectory(folder);
            return folder;
        }

        private string BuildFileName(LabelData data, string extension)
        {
            string date = (data.Date ?? "unknown").Replace('/', '.');
            string product = SanitizeFileName(data.Product ?? "product");
            return $"{date}_{product}.{extension}";
        }

        private static string SanitizeFileName(string name)
        {
            foreach (char c in Path.GetInvalidFileNameChars())
                name = name.Replace(c, '_');
            return name;
        }
    }
}
