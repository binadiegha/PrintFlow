
using DzinerProgram.Services;
using System.Reflection;


namespace DzinerProgram
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();


            var serviceTypes = Assembly.GetExecutingAssembly()
                .GetTypes()
                .Where( t => t.Namespace == "DzinerProgram.Services" && t.IsClass);

            foreach( var type in serviceTypes)
            {
                builder.Services.AddScoped(type);
            }

            //builder.Services.AddScoped<LabelService>();
            //builder.Services.AddScoped<ZplTemplateService>();
            //builder.Services.AddScoped<LocalStorageService>();
            //builder.Services.AddScoped<PrintingService>();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOffice", policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            }
            );

            var app = builder.Build();

            // Configure the HTTP request pipeline.
           
             app.UseHttpsRedirection();

            app.UseForwardedHeaders();

            app.UseRouting();

            app.UseCors("AllowOffice");

            app.MapControllers();

            app.Run();
        }
    }
}
