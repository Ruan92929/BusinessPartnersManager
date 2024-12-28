using FluentValidation;
using FullStackTest.Domain.Entities.Domain.Entities;

public class BusinessPartnerValidator : AbstractValidator<BusinessPartner>
{
    public BusinessPartnerValidator()
    {
        RuleFor(bp => bp.CardName)
            .NotEmpty().WithMessage("O nome do parceiro é obrigatório.")
            .Matches(@"^[a-zA-Z\s]+$").WithMessage("O nome do parceiro só pode conter letras e espaços.");

        RuleFor(bp => bp.City)
            .NotEmpty().WithMessage("A cidade é obrigatória.");

        RuleFor(bp => bp.Country)
            .NotEmpty().WithMessage("O país é obrigatório.");
    }
}
