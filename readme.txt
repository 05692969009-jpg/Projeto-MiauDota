# Projeto MiauDota

Este projeto tem como objetivo facilitar a adoção de gatos, conectando famílias interessadas a felinos que precisam de um lar. Ele consiste em uma interface web intuitiva e uma API para gerenciamento dos dados.

## 📁 Estrutura do Projeto

O projeto está dividido em duas partes principais: **FrontEnd** e **BackEnd**.

### 🎨 FrontEnd
Localizado na pasta `FrontEnd/Project`, contém a interface visual do usuário.
- **`index.html`**: Página principal que exibe os gatos disponíveis para adoção.
- **`cadastre_um_gato.html`**: Formulário completo para cadastrar novos gatos (anúncios de adoção ou procura-se). Inclui campos para raça, sexo, idade, porte e informações do responsável.
- **`como_adotar.html`**: Página informativa com orientações sobre o processo de adoção responsável.
- **`favoritos.html`**: Espaço onde o usuário poderá visualizar os gatos que marcou como favoritos.
- **`sobre_nos.html`**: Detalhes sobre a missão do projeto MiauDota.
- **`css/`**: Contém as folhas de estilo para garantir um design moderno e responsivo.
- **`img/`**: Armazena o logotipo do projeto e as fotos dos gatinhos.

### ⚙️ BackEnd
Localizado na pasta `BackEnd/API`, construído em TypeScript para gerenciar as regras de negócio e persistência de dados.
- **`src/index.ts`**: Ponto de entrada da aplicação.
- **`src/controllers/`**: Onde ficará a lógica de processamento das requisições.
- **`src/routes/`**: Definição dos caminhos (endpoints) da API.
- **`src/database/`**: Configuração e conexão com o banco de dados.

## 🚀 Tecnologias Utilizadas
- **FrontEnd**: HTML5, CSS3, Bootstrap Icons, Google Fonts.
- **BackEnd**: TypeScript, Node.js (estrutura inicial).

## 📝 Status Atual
O projeto está com o FrontEnd bem desenvolvido em termos de estrutura e design. O BackEnd está na fase inicial de configuração da arquitetura de pastas e arquivos.

---
*MiauDota - Conectando famílias amorosas com companheiros miau-ravilhosos.*
