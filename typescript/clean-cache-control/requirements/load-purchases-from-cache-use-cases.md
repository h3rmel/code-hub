# Carregar compras do Cache

## Caso de Sucesso
1. Sistema executa o comando "Carregar compras"
2. Sistema carrega os dados do Cache
3. Sistema valida se o Cache tem menos de 3 dias
4. Sistema cria uma lista de compras a partir dos dados do Cache
5. Sistema retorna a lista de compras

## Exceção - Cache expirado
1. Sistema limpa o cache
2. Sistema retorna erro

## Exceção - Cache vazio
1. Sisteam retorna erro