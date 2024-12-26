using FullStackTest.Domain.Entities.Domain.Entities;

namespace FullStackTest.Domain.Interfaces
{
    public interface IBusinessPartnerRepository
    {
        Task<IEnumerable<BusinessPartner>> GetAllAsync();
        Task<(IEnumerable<BusinessPartner> Data, int TotalCount)> GetAllPaginatedAsync(int page, int pageSize, string filter);
        Task<BusinessPartner> GetByIdAsync(string cardCode);
        Task AddAsync(BusinessPartner businessPartner);
        Task UpdateAsync(string cardCode, string cardName);
        Task DeleteAsync(string cardCode);
    }
}
