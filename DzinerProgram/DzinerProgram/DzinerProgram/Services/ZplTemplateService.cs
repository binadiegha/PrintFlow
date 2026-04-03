using DzinerProgram.Models;

namespace DzinerProgram.Services
{
    public class ZplTemplateService
    {
        private readonly string ToteBagTemplatePath = "Templates/ToteBagTemplate.zpl";
        
        public string Generate(LabelData data)  
        {

            // Create conditions for different templates based on the data, for example:
            string template = File.ReadAllText(ToteBagTemplatePath);
            template = template.Replace("{Date}", data.Date);
            template = template.Replace("{ContainerNumber}", data.ContainerNumber);
            template = template.Replace("{Product}", data.Product);
            template = template.Replace("{Supplier}", data.Supplier);
            template = template.Replace("{PO}", data.PO);
            template = template.Replace("{Origin}", data.Origin);
            template = template.Replace("{Batch}", data.Batch);
            return template;
        }
    }
}
