using DzinerProgram.Models;

namespace DzinerProgram.Services
{
    public class ZplTemplateService
    {
        private readonly string ToteBagTemplatePath = "Templates/ToteBagLabel.zpl";
        
        public string Generate(LabelData data)  
        {
            if (data == null)
            {
                throw new ArgumentNullException(nameof(data));
            }

            // Create conditions for different templates based on the data, for example:
            string template = File.ReadAllText(ToteBagTemplatePath);

            //if (string.IsNullOrEmpty(data.Option.PrintQty))
            //{
            //   template = template.Replace("{PrintQty}", "1");
            //} else
            //{
            //    template = template.Replace("{PrintQty}", data.Option.PrintQty);
            //}

            template = template.Replace("{Date}", data.Date);
            template = template.Replace("{ContainerNumber}", data.ContainerNo);
            template = template.Replace("{Product}", data.Product);
            template = template.Replace("{Supplier}", data.Supplier);
            template = template.Replace("{PO}", data.PO);
            template = template.Replace("{Origin}", data.Origin);
            template = template.Replace("{Batch}", data.Batch);
            return template;
        }
    }
}
