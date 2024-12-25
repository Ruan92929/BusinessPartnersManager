using FullStackTest.Application.Services;
using FullStackTest.Domain.Interfaces;
using FullStackTest.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient<IBusinessPartnerRepository, BusinessPartnerRepository>(client =>
{
    client.BaseAddress = new Uri("https://62fd75d9b9e38585cd52260a.mockapi.io/b1s/v2/");
});
builder.Services.AddScoped<BusinessPartnerService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.Run();
