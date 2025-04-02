# BusinessPartnersManager

Este é um projeto Full Stack que envolve uma API backend construída com **ASP.NET Core** e um frontend desenvolvido com **React** e **Material-UI**. O projeto permite a manipulação de dados de parceiros de negócios (Business Partners), incluindo operações de listagem, criação, atualização e exclusão.

## Estrutura do Projeto

### Backend

O backend é uma API RESTful construída com **ASP.NET Core**. Ele implementa os seguintes recursos principais:

- **Controller**: `BusinessPartnerController`
    - Métodos HTTP:
        - `GET /api/businesspartner`: Lista todos os parceiros de negócios com paginação e filtro.
        - `GET /api/businesspartner/{cardCode}`: Obtém um parceiro de negócios específico pelo código.
        - `POST /api/businesspartner`: Cria um novo parceiro de negócios.
        - `PATCH /api/businesspartner/{cardCode}`: Atualiza o nome do parceiro de negócios.
        - `DELETE /api/businesspartner/{cardCode}`: Exclui um parceiro de negócios.
  
- **Serviços**:
    - O serviço `BusinessPartnerService` lida com as operações de validação, acesso ao repositório e lógica de negócios.

- **Repositório**:
    - O repositório `BusinessPartnerRepository` interage com a API externa para realizar operações CRUD nos parceiros de negócios.

- **Validação**:
    - **FluentValidation** é usado para validar os dados dos parceiros de negócios, garantindo que os dados enviados atendam aos critérios de formato.

- **Middleware**:
    - Um middleware de tratamento de exceções captura erros de validação e outros erros inesperados, retornando respostas apropriadas com os detalhes do erro.

### Frontend

O frontend é construído com **React** e utiliza **Material-UI** para renderizar as tabelas de dados. Ele realiza as seguintes operações com a API:

- **Listar**: Exibe uma lista paginada de parceiros de negócios com a capacidade de aplicar filtros.
- **Criar**: Permite criar um novo parceiro de negócios.
- **Atualizar**: Permite atualizar o nome de um parceiro de negócios.
- **Excluir**: Permite excluir um parceiro de negócios.

### Tecnologias Utilizadas

- **Backend**:
    - ASP.NET Core (API)
    - FluentValidation (Validação)
    - Entity Framework Core (para repositórios e acesso a dados, se necessário)
    - HttpClient (para chamadas de API)

- **Frontend**:
    - React
    - Material-UI
    - Axios (para chamadas HTTP)

### Instalação


### Backend (API)
1. **Requisitos:**
   - .NET 6 ou superior
   - Visual Studio ou terminal com .NET CLI

2. **Passos para rodar a API:**
   - Abra o terminal e navegue até o diretório do backend.
   - Execute o comando:
     ```bash
     dotnet run
     ```
   - Isso irá iniciar a API localmente. A API estará disponível nos seguintes endpoints:
     - **HTTP**: `http://localhost:5036`
     - **HTTPS**: `https://localhost:7178`
     - Você pode acessar a documentação Swagger da API em: `https://localhost:7178/swagger`

3. **Erros comuns**:
   - Caso a API não abra automaticamente no navegador, acesse manualmente o endereço **https://localhost:7178/swagger** para a documentação.

### Frontend (React)

1. **Requisitos:**
   - Node.js (v14 ou superior)
   - npm ou yarn

2. **Passos para rodar o frontend:**
   - Abra o terminal e navegue até o diretório do frontend.
   - Execute o comando:
     ```bash
     npm install
     ```
     Para instalar as dependências do projeto.
   - Após isso, rode:
     ```bash
     npm run dev
     ```
   - Isso vai iniciar o frontend localmente, geralmente disponível em:
     - **URL**: `http://localhost:3000`

3. **Configuração do Backend no Frontend**:
   O frontend está configurado para se comunicar com a API local, então ele usará a URL `http://localhost:5036](https://localhost:7178` para fazer as requisições ao backend (ou a URL HTTPS correspondente, dependendo da configuração).






