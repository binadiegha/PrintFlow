namespace DzinerProgram.Models
{
    public class Option
    {
        public string PrintQty { get; set; }
        public string PrinterName { get; set; }

        public string PrintType { get; set; } // New property to specify print type (e.g., "PDF", "Network")

        public Option(string printQty, string printerName, string printType)
        {
            PrintQty = printQty;
            PrinterName = printerName;
            PrintType = printType;
        }   
    }
}
