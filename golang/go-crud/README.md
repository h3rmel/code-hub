# Go CRUD API

Uma API REST simples em Go para gerenciamento de contatos.

## Estrutura do Projeto

```
.
├── cmd/            # Ponto de entrada da aplicação
├── internal/       # Código privado da aplicação
│   ├── handlers/   # Handlers HTTP
│   ├── models/     # Modelos de dados
│   └── service/    # Lógica de negócios
└── README.md
```

## Como Executar

```bash
go run cmd/api/main.go
```

## Endpoints

- `GET /contacts` - Lista todos os contatos
- `GET /contacts/{id}` - Obtém um contato específico
- `POST /contacts` - Cria um novo contato
- `PUT /contacts/{id}` - Atualiza um contato existente
- `DELETE /contacts/{id}` - Remove um contato
```
