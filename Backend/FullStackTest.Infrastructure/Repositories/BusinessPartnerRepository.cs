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

        public async Task<(IEnumerable<BusinessPartner> Data, int TotalCount)> GetAllAsync(int page, int pageSize, string filter)
        {
            var response = await _httpClient.GetAsync("BusinessPartners");
            response.EnsureSuccessStatusCode();
            var businessPartners = await response.Content.ReadFromJsonAsync<IEnumerable<BusinessPartner>>();

            if (!string.IsNullOrEmpty(filter))
            {
                businessPartners = businessPartners
                    .Where(bp => bp.CardCode.Contains(filter, StringComparison.OrdinalIgnoreCase) ||
                                 bp.CardName.Contains(filter, StringComparison.OrdinalIgnoreCase) ||
                                 bp.City.Contains(filter, StringComparison.OrdinalIgnoreCase) ||
                                 bp.Country.Contains(filter, StringComparison.OrdinalIgnoreCase));
            }

            var totalCount = businessPartners.Count();

            var paginatedResult = businessPartners
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return (paginatedResult, totalCount);
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
