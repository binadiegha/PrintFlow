using DzinerProgram.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace DzinerProgram.Services
{
    public class PdfService
    {
        public void SavePdf(LabelData data, string outputPath)
        {
            QuestPDF.Settings.License = LicenseType.Community;

            Document.Create(container =>
            {
                container.Page(page =>
                {
                    // 4" x 6" thermal label size
                    page.Size(new PageSize(288, 432));
                    page.Margin(12);
                    page.DefaultTextStyle(x => x.FontSize(9).FontFamily("Arial"));

                    page.Content().Column(col =>
                    {
                        col.Spacing(4);

                        // Header
                        col.Item().BorderBottom(1).PaddingBottom(4).Row(row =>
                        {
                            row.RelativeItem().Text(LabelTypeDisplay(data.MetaData?.Type))
                                .Bold().FontSize(12);
                            row.AutoItem().Text(data.Date ?? "").FontSize(9);
                        });

                        if (!string.IsNullOrWhiteSpace(data.Product))
                            col.Item().LabelRow("Product", data.Product!);

                        if (!string.IsNullOrWhiteSpace(data.Supplier))
                            col.Item().LabelRow("Supplier", data.Supplier!);

                        if (!string.IsNullOrWhiteSpace(data.PO))
                            col.Item().LabelRow("PO", data.PO!);

                        if (!string.IsNullOrWhiteSpace(data.Origin))
                            col.Item().LabelRow("Origin", data.Origin!);

                        if (!string.IsNullOrWhiteSpace(data.Batch))
                            col.Item().LabelRow("Batch", data.Batch!);

                        if (!string.IsNullOrWhiteSpace(data.ContainerNo))
                            col.Item().LabelRow("Container No", data.ContainerNo!);

                        if (!string.IsNullOrWhiteSpace(data.NoOfPal))
                            col.Item().LabelRow("No of Pal", data.NoOfPal!);

                        if (!string.IsNullOrWhiteSpace(data.TotalQty))
                            col.Item().LabelRow("Total Qty", data.TotalQty!);

                        if (!string.IsNullOrWhiteSpace(data.StorageLoc))
                            col.Item().LabelRow("Storage Loc", data.StorageLoc!);

                        if (!string.IsNullOrWhiteSpace(data.Status))
                            col.Item().LabelRow("Status", data.Status!);

                        // MetaData fields
                        if (data.MetaData != null)
                        {
                            var m = data.MetaData;

                            if (!string.IsNullOrWhiteSpace(m.Line))
                                col.Item().LabelRow("Line", m.Line!);

                            if (!string.IsNullOrWhiteSpace(m.ProcessDate))
                                col.Item().LabelRow("Process Date", m.ProcessDate!);

                            if (!string.IsNullOrWhiteSpace(m.ProductionDate))
                                col.Item().LabelRow("Production Date", m.ProductionDate!);

                            if (!string.IsNullOrWhiteSpace(m.BestBeforeDate))
                                col.Item().LabelRow("Best Before", m.BestBeforeDate!);

                            if (m.BagNumbers != null && m.BagNumbers.Count > 0)
                                col.Item().LabelRow("Bag Numbers", string.Join(", ", m.BagNumbers));

                            if (m.PrintQuantity > 0)
                                col.Item().LabelRow("Print Qty", m.PrintQuantity.ToString());
                        }
                    });
                });
            })
            .GeneratePdf(outputPath);

            Console.WriteLine($"PDF saved to: {outputPath}");
        }

        private static string LabelTypeDisplay(string? type) => type switch
        {
            "cleaning_plant" => "Cleaning Plant",
            "feed" => "Feed",
            "fg_rework" => "FG Rework",
            "tote_bag_label" => "Tote Bag Label",
            "traded_goods" => "Traded Goods",
            "xl_20kg_label" => "XL 20kg Label",
            _ => "Label"
        };
    }

    internal static class PdfExtensions
    {
        public static IContainer LabelRow(this IContainer container, string label, string value)
        {
            container.Row(row =>
            {
                row.ConstantItem(80).Text(label + ":").SemiBold();
                row.RelativeItem().Text(value);
            });
            return container;
        }
    }
}
