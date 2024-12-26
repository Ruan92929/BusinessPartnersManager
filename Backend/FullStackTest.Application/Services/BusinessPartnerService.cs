using FullStackTest.Domain.Entities.Domain.Entities;
using FullStackTest.Domain.Interfaces;

namespace FullStackTest.Application.Services
{
    public class BusinessPartnerService
    {
        private readonly IBusinessPartnerRepository _repository;

        public BusinessPartnerService(IBusinessPartnerRepository repository)
        {
            _repository = repository;
        }

        public async Task<(IEnumerable<BusinessPartner> Data, int TotalCount)> GetAllPaginatedAsync(int page, int pageSize, string filter)
        {
            return await _repository.GetAllPaginatedAsync(page, pageSize, filter);
        }

        public async Task<IEnumerable<BusinessPartner>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<BusinessPartner> GetByIdAsync(string cardCode)
        {
            return await _repository.GetByIdAsync(cardCode);
        }

        public async Task AddAsync(BusinessPartner businessPartner)
        {
            await _repository.AddAsync(businessPartner);
        }

        public async Task UpdateCardNameAsync(string cardCode, string cardName)
        {
            await _repository.UpdateAsync(cardCode, cardName);
        }

        public async Task DeleteAsync(string cardCode)
        {
            await _repository.DeleteAsync(cardCode);
        }
    }
}
