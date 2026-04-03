using DzinerProgram.Models;

namespace DzinerProgram.Services
{
    public class LabelService
    {
        private readonly ZplTemplateService _templateService;
        private readonly LocalStorageService _storageService;
        private readonly PrintingService _printerService;

        public LabelService(
            ZplTemplateService templateService,
            LocalStorageService storageService,
            PrintingService printerService) 
        {
            _templateService = templateService;
            _storageService = storageService;
            _printerService = printerService;
        }

        public void ProcessLabel(LabelData data)
        {
            // Generate ZPL from template and data
            string zpl = _templateService.Generate(data);
            // Save ZPL to local storage
            string filePath = _storageService.SaveZpl(zpl, data);
            // Print the label
            _printerService.PrintJob("Printerbane", zpl, data); // Option to change and use network  printing later.
        }
    }
}
