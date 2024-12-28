using FluentValidation;
using FullStackTest.Application.Validators;
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

        public async Task<(IEnumerable<BusinessPartner> Data, int TotalCount)> GetAllAsync(int page, int pageSize, string filter)
        {
            return await _repository.GetAllAsync(page, pageSize, filter);
        }

        public async Task<BusinessPartner> GetByIdAsync(string cardCode)
        {
            return await _repository.GetByIdAsync(cardCode);
        }

        public async Task AddAsync(BusinessPartner businessPartner)
        {
            var validationResult = await new BusinessPartnerValidator().ValidateAsync(businessPartner);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            await _repository.AddAsync(businessPartner);
        }

        public async Task UpdateCardNameAsync(string cardCode, string cardName)
        {
            var validationResult = new UpdateCardNameValidator().Validate((cardCode, cardName));
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            await _repository.UpdateAsync(cardCode, cardName);
        }

        public async Task DeleteAsync(string cardCode)
        {
            await _repository.DeleteAsync(cardCode);
        }
    }
}
