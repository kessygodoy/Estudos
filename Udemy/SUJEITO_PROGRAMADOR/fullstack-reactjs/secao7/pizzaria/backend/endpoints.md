# 🛤️ Endpoints da API - Pizzaria

Documentação detalhada de todos os endpoints, parâmetros e exemplos de uso.

## 🔐 Autenticação e Segurança

- **Base URL**: `http://localhost:3333`
- **Authenticated Routes**: Requerem header `Authorization: Bearer <token>`
- **Admin Routes**: Requerem usuário com role `ADMIN`

---

## 👤 Usuários (Users)

### Criar Usuário
`POST /users`
- **Auth**: Pública
- **Body**:
  ```json
  {
    "name": "João Silva",
    "email": "teste@teste.com",
    "password": "123"
  }
  ```

### Login (Sessão)
`POST /session`
- **Auth**: Pública
- **Body**:
  ```json
  {
    "email": "teste@teste.com",
    "password": "123"
  }
  ```
- **Response**: Retorna dados do usuário e `token`.

### Detalhes do Usuário
`GET /me`
- **Auth**: Bearer Token
- **Response**: Dados do usuário logado.

---

## 🏷️ Categorias (Categories)

### Criar Categoria
`POST /category`
- **Auth**: Admin
- **Body**:
  ```json
  {
    "name": "Pizzas"
  }
  ```

### Listar Categorias
`GET /category`
- **Auth**: Logado
- **Response**: Lista de categorias.

### Listar Produtos por Categoria
`GET /category/product`
- **Auth**: Logado
- **Query Params**:
  - `category_id`: ID da categoria
- **Exemplo**: `/category/product?category_id=uuid-123`

---

## 🍕 Produtos (Products)

### Criar Produto
`POST /product`
- **Auth**: Admin
- **Header**: `Content-Type: multipart/form-data`
- **Body (Form-Data)**:
  - `name`: Nome da pizza
  - `price`: Preço em centavos (ex: 3000 = R$ 30,00)
  - `description`: Ingredientes, etc.
  - `category_id`: ID da categoria
  - `file`: Arquivo de imagem
- **Exemplo de Envio**:
  Form data com arquivo + campos.

### Listar Produtos
`GET /products`
- **Auth**: Logado
- **Query Params**:
  - `disabled`: (opcional) `true`/`false`. Padrão `false` (só mostra habilitados).
- **Response**: Array de produtos com URL do banner.

### Deletar Produto (Soft Delete)
`DELETE /product`
- **Auth**: Admin
- **Query Params**:
  - `product_id`: ID do produto
- **Exemplo**: `/product?product_id=uuid-123`
- **Efeito**: Marca `disabled: true` no banco.

---

## 🛍️ Pedidos (Orders)

### Novo Pedido
`POST /order`
- **Auth**: Logado
- **Body**:
  ```json
  {
    "table": 10,
    "name": "Mesa 10 - João"
  }
  ```
- **Response**: Retorna pedido com `status: false` e `draft: true`.

### Listar Pedidos
`GET /orders`
- **Auth**: Logado
- **Query Params**:
  - `draft`: (opcional) `true` para rascunhos, `false` para pedidos na cozinha.
- **Response**: Lista de pedidos.

### Remover Pedido
`DELETE /order`
- **Auth**: Logado
- **Query Params**:
  - `order_id`: ID do pedido
- **Efeito**: Remove permanentemente o pedido e seus itens.

### Detalhes do Pedido
`GET /order/detail`
- **Auth**: Logado
- **Query Params**:
  - `order_id`: ID do pedido
- **Response**: Lista de itens do pedido com detalhes dos produtos.

### Enviar Pedido (Produção)
`PUT /order/send`
- **Auth**: Logado
- **Body**:
  ```json
  {
    "order_id": "uuid-pedido",
    "name": "Confirmando Cliente"
  }
  ```
- **Efeito**: Muda `draft` para `false`. Pedido aparece na cozinha.

### Finalizar Pedido
`PUT /order/finish`
- **Auth**: Logado
- **Body**:
  ```json
  {
    "order_id": "uuid-pedido"
  }
  ```
- **Efeito**: Marca `status: true` (Concluído).

---

## 🍽️ Itens (Items)

### Adicionar Item ao Pedido
`POST /order/add`
- **Auth**: Logado
- **Body**:
  ```json
  {
    "order_id": "uuid-pedido",
    "product_id": "uuid-produto",
    "amount": 2
  }
  ```

### Remover Item do Pedido
`DELETE /order/remove`
- **Auth**: Logado
- **Query Params**:
  - `item_id`: ID do item (NÃO do produto)
- **Exemplo**: `/order/remove?item_id=uuid-item`
