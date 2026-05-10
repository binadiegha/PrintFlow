namespace DzinerProgram.Models
{
    public class PrintingMetaData
    {
        public string? Type { get; set; }
        public int PrintQuantity { get; set; } = 1;
        public string? Line { get; set; }
        public string? ProcessDate { get; set; }
        public List<object>? BagNumbers { get; set; }
        public string? ProductionDate { get; set; }
        public string? BestBeforeDate { get; set; }
        public string? PrinterName { get; set; }
        public string? ZplSavePath { get; set; }
        public string? PdfSavePath { get; set; }
    }
}
