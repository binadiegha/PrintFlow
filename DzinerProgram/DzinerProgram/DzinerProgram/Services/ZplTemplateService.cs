using DzinerProgram.Models;

namespace DzinerProgram.Services
{
    public class ZplTemplateService
    {
        private static readonly Dictionary<string, string> TemplatePaths = new()
        {
            ["cleaning_plant"] = "Templates/CleaningPlantTemplate.zpl",
            ["tote_bag_label"] = "Templates/ToteBagLabel.zpl",
        };

        private const string FallbackTemplate = "Templates/ToteBagLabel.zpl";

        public string Generate(LabelData data)
        {
            if (data == null) throw new ArgumentNullException(nameof(data));

            string templatePath = ResolveTemplate(data.MetaData?.Type);
            string template = File.ReadAllText(templatePath);

            int printQty = data.MetaData?.PrintQuantity > 0 ? data.MetaData.PrintQuantity : 1;
            template = template.Replace("{PrintQty}", printQty.ToString());
            template = template.Replace("{Date}", data.Date ?? "");
            template = template.Replace("{ContainerNumber}", data.ContainerNo ?? "");
            template = template.Replace("{Product}", data.Product ?? "");
            template = template.Replace("{Supplier}", data.Supplier ?? "");
            template = template.Replace("{PO}", data.PO ?? "");
            template = template.Replace("{Origin}", data.Origin ?? "");
            template = template.Replace("{Batch}", data.Batch ?? "");

            // Extra fields used by some templates
            template = template.Replace("{Line}", data.MetaData?.Line ?? "");
            template = template.Replace("{ProcessDate}", data.MetaData?.ProcessDate ?? "");
            template = template.Replace("{ProductionDate}", data.MetaData?.ProductionDate ?? "");
            template = template.Replace("{BestBeforeDate}", data.MetaData?.BestBeforeDate ?? "");

            return template;
        }

        private static string ResolveTemplate(string? labelType)
        {
            if (labelType != null && TemplatePaths.TryGetValue(labelType, out string? path) && File.Exists(path))
                return path;

            return FallbackTemplate;
        }
    }
}
