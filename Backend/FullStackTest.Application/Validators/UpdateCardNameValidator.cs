using FluentValidation;

namespace FullStackTest.Application.Validators
{
    public class UpdateCardNameValidator : AbstractValidator<(string CardCode, string CardName)>
    {
        public UpdateCardNameValidator()
        {
            RuleFor(x => x.CardCode)
                .NotEmpty().WithMessage("O código do parceiro não pode ser vazio.")
                .Length(1, 50).WithMessage("O código do parceiro deve ter entre 1 e 50 caracteres.");

            RuleFor(x => x.CardName)
                .NotEmpty().WithMessage("O nome do parceiro não pode ser vazio.")
                .Matches(@"^[a-zA-Z\s]+$").WithMessage("O nome do parceiro só pode conter letras e espaços.");
        }
    }

}
