# 📍 Consulta e Autopreenchimento de Endereço via CEP (ViaCEP)

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

Aplicação web responsiva e moderna desenvolvida com **Vanilla JS (JavaScript puro)** para consulta de endereços no Brasil e autocompletar formulários de cadastro utilizando a API pública do **ViaCEP**.

Este projeto foi desenvolvido como um estudo prático focado em **integração de APIs REST**, **validação e sanitização de dados**, **máscara em tempo real**, **manipulação dinâmica da DOM** e **Design de Interface (UI/UX) com CSS3**.

---

## 📌 Funcionalidades

- ⚡ **Máscara Dinâmica em Tempo Real:** Formatação automática do CEP no padrão `00000-000` enquanto o usuário digita.
- 🧮 **Validação e Sanitização:** Limpeza de caracteres especiais e verificação do formato numérico de 8 dígitos antes do envio do pedido para a API.
- 🏢 **Autopreenchimento Inteligente:** Preenchimento automático dos campos de Logradouro (Rua), Bairro, Cidade e Estado (UF).
- 🔍 **Eventos Múltiplos de Busca:** Disparo automático da consulta ao sair do campo (`blur`) ou ao enviar o formulário (`submit` / tecla `Enter`).
- 🎨 **Interface Moderna e Responsiva:** Layout centralizado tipo *card*, tipografia limpa, microinterações (`:focus`, `:hover`) e campos de resultado em modo de leitura (`readonly`).
- 🛡️ **Tratamento de Erros:** Exibição clara de mensagens caso o CEP seja inválido, não encontrado no banco dos Correios ou ocorra erro de conexão.

---

## 🚀 Tecnologias Utilizadas

- **HTML5:** Estruturação semântica e acessível do formulário.
- **CSS3:** Estilização moderna utilizando Flexbox, sombras suaves, variáveis de cor e fontes do Google Fonts (*Inter*).
- **JavaScript (ES6+):** Programação assíncrona (`async/await`), consumo de APIs via `fetch`, manipulação de eventos e Regex.
- **API ViaCEP:** Web service gratuito de alta disponibilidade para consulta de Código de Endereçamento Postal (CEP).

---

## 📂 Estrutura do Projeto

```text
api_cadastro_consulta_cep/
│
├── index.html       # Estrutura HTML do formulário de cadastro/consulta
├── style.css        # Estilos, variáveis e responsividade da interface
├── script.js        # Lógica de validação, máscara e consumo da API ViaCEP
└── README.md        # Documentação completa do repositório

```

---

## 🛠️ Como Executar o Projeto

Como o projeto é construído 100% no front-end em Vanilla JS, **não é necessário instalar gerenciadores de pacotes (npm/yarn) ou servidores backend**.

### Pré-requisitos

* Qualquer navegador web moderno (Google Chrome, Mozilla Firefox, Microsoft Edge ou Safari).

### Passo a Passo

1. **Clone este repositório:**
```bash
git clone [https://github.com/GustavWebCriador/api_cadastro_consulta_cep.git](https://github.com/GustavWebCriador/api_cadastro_consulta_cep.git)

```


2. **Acesse a pasta do projeto:**
```bash
cd api_cadastro_consulta_cep

```


3. **Execute o projeto:**
* Dê um duplo clique no arquivo `index.html`, ou
* Abra utilizando a extensão **Live Server** no VS Code.



---

## 🔌 Como Funciona a Integração com a API

A aplicação consome a rota pública da API do **BrasilAPI**:

```http
GET [https://brasilapi.com.br/api/cep/v1/](https://brasilapi.com.br/api/cep/v1/){cep}

```

## Exemplo de Retorno (JSON) da BrasilAPI:
```
{
  "cep": "89460000",
  "state": "SC",
  "city": "Canoinhas",
  "neighborhood": "Centro",
  "street": "Rua Major Vieira",
  "service": "correios"
}
```
---

## 👤 Autor

Desenvolvido por **Gustavo Medeiros**.

* GitHub: [@GustavWebCriador](https://www.google.com/search?q=https://github.com/GustavWebCriador)

---

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](https://www.google.com/search?q=LICENSE) para mais detalhes.
