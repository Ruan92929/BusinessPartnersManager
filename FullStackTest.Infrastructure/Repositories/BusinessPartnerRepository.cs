using FullStackTest.Domain.Entities.Domain.Entities;
using FullStackTest.Domain.Interfaces;
using System.Net.Http.Json;
using System.Text.Json;

namespace FullStackTest.Infrastructure.Repositories
{
    public class BusinessPartnerRepository : IBusinessPartnerRepository
    {
        private readonly HttpClient _httpClient;

        public BusinessPartnerRepository(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<BusinessPartner>> GetAllAsync()
        {
            var response = await _httpClient.GetAsync("BusinessPartners");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<IEnumerable<BusinessPartner>>();
        }

        public async Task<BusinessPartner> GetByIdAsync(string cardCode)
        {
            var response = await _httpClient.GetAsync($"BusinessPartners/{cardCode}");
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<BusinessPartner>();
        }

        public async Task AddAsync(BusinessPartner businessPartner)
        {
            var json = JsonContent.Create(businessPartner, options: new JsonSerializerOptions
            {
                PropertyNamingPolicy = null
            });

            var response = await _httpClient.PostAsync("BusinessPartners", json);
            response.EnsureSuccessStatusCode();
        }


        public async Task UpdateAsync(string cardCode, string cardName)
        {
            var content = new { CardName = cardName };
            var json = JsonContent.Create(content, options: new JsonSerializerOptions
            {
                PropertyNamingPolicy = null
            });
            var response = await _httpClient.PatchAsync($"BusinessPartners/{cardCode}", json);
            response.EnsureSuccessStatusCode();
        }

        public async Task DeleteAsync(string cardCode)
        {
            var response = await _httpClient.DeleteAsync($"BusinessPartners/{cardCode}");
            response.EnsureSuccessStatusCode();
        }
    }
}
