using DzinerProgram.Models;

namespace DzinerProgram.Services
{
    public class LabelService
    {
        private readonly ZplTemplateService _templateService;
        private readonly LocalStorageService _storageService;
        private readonly PrintingService _printerService;
        private readonly PdfService _pdfService;
        private readonly SettingsService _settingsService;

        public LabelService(
            ZplTemplateService templateService,
            LocalStorageService storageService,
            PrintingService printerService,
            PdfService pdfService,
            SettingsService settingsService)
        {
            _templateService = templateService;
            _storageService = storageService;
            _printerService = printerService;
            _pdfService = pdfService;
            _settingsService = settingsService;
        }

        public void ProcessLabel(LabelData data)
        {
            // Merge stored settings as fallback for anything not sent by the frontend
            var stored = _settingsService.Load();

            if (data.MetaData != null)
            {
                if (string.IsNullOrWhiteSpace(data.MetaData.PrinterName))
                    data.MetaData.PrinterName = stored.PrinterName;

                if (string.IsNullOrWhiteSpace(data.MetaData.ZplSavePath))
                    data.MetaData.ZplSavePath = stored.ZplSavePath;

                if (string.IsNullOrWhiteSpace(data.MetaData.PdfSavePath))
                    data.MetaData.PdfSavePath = stored.PdfSavePath;
            }

            string printerName = data.MetaData?.PrinterName ?? stored.PrinterName;

            string zpl = _templateService.Generate(data);
            string zplPath = _storageService.SaveZpl(zpl, data);
            string pdfPath = _storageService.BuildPdfPath(data);
            _pdfService.SavePdf(data, pdfPath);
            _printerService.PrintJob(printerName, zplPath, data);
        }
    }
}
