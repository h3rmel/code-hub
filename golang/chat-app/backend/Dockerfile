FROM golang:1.23.5-alpine

# Adiciona git e outras dependências necessárias
RUN apk add --no-cache git

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY go.mod go.sum ./
RUN go mod download

# Copia o resto do código
COPY . .

# Compila a aplicação
RUN go build -v -o main .

# Executa a aplicação
CMD ["/app/main"]