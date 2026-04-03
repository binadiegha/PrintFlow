using DzinerProgram.Models;
using RawPrint;
using RawPrint.NetStd;

namespace DzinerProgram.Services
{
    public class PrintingService
    {
        public string printerName;
        public string zplPath;
        public LabelData labelData;
        public void PrintJob(string _printerName, string _zplData, LabelData _LabelData )
        { 
          printerName = _printerName;
          zplPath = _zplData;
          labelData = _LabelData;

            Console.WriteLine(printerName);

            IPrinter printer = new Printer();
            printer.PrintRawFile(printerName, zplPath, labelData.Product, false);
        }
        
    }
}
