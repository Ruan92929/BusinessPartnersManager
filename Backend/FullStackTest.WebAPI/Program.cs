using FluentValidation;
using FullStackTest.Application.Services;
using FullStackTest.Domain.Interfaces;
using FullStackTest.Infrastructure.Repositories;
using FullStackTest.WebAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddHttpClient<IBusinessPartnerRepository, BusinessPartnerRepository>(client =>
{
    client.BaseAddress = new Uri("https://62fd75d9b9e38585cd52260a.mockapi.io/b1s/v2/");
});

builder.Services.AddScoped<BusinessPartnerService>();

builder.Services.AddValidatorsFromAssemblyContaining<BusinessPartnerValidator>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.Run();
