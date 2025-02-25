# Usa Docker Compose para rodar tudo
FROM docker:cli

# Copia os arquivos do projeto
WORKDIR /app
COPY . .

# Comando para iniciar o Docker Compose
CMD ["docker-compose", "up"]
