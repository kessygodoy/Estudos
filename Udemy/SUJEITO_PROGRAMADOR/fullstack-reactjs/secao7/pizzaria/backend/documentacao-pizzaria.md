# Documentação do Projeto - Sistema de Pizzaria (Backend)

## 📋 Visão Geral

Sistema backend para gerenciamento de pizzaria desenvolvido em Node.js com TypeScript, utilizando Express.js como framework web e Prisma ORM para comunicação com banco de dados PostgreSQL.

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** adaptado para APIs REST:

```
Rotas → Controller → Service → Banco de Dados
                ↓
            Response
```

### Fluxo de Requisição

1. **Rotas** (`src/routes.ts`): Recebe a requisição HTTP e aplica middlewares
2. **Middlewares**: Validação de schema, autenticação e autorização
3. **Controller**: Recebe a requisição validada, extrai os dados e chama o service
4. **Service**: Contém a lógica de negócio, comunica com o banco de dados via Prisma
5. **Controller**: Retorna a resposta ao cliente

---

## 📁 Organização de Pastas

```
backend/
├── prisma/
│   ├── migrations/          # Migrações do banco de dados
│   └── schema.prisma        # Schema do Prisma (modelos do banco)
├── src/
│   ├── @types/
│   │   └── express/
│   │       └── index.d.ts   # Extensão de tipos do Express
│   ├── controllers/         # Controladores (recebem requisições)
│   │   ├── user/
│   │   │   ├── CreateUserController.ts
│   │   │   ├── AuthUserController.ts
│   │   │   └── DetailUserController.ts
│   │   ├── category/
│   │   │   ├── CreateCategoryController.ts
│   │   │   └── ListCategoryController.ts
│   │   └── product/
│   │       └── CreateProductController.ts
│   ├── services/            # Serviços (lógica de negócio)
│   │   ├── user/
│   │   │   ├── CreateUserService.ts
│   │   │   ├── AuthUserService.ts
│   │   │   └── DetailUserService.ts
│   │   ├── category/
│   │   │   ├── CreateCategoryService.ts
│   │   │   └── ListCategoryService.ts
│   │   └── product/
│   │       └── CreateProductService.ts
│   ├── middlewares/         # Middlewares customizados
│   │   ├── isAuthenticated.ts
│   │   ├── isAdmin.ts
│   │   └── validateSchema.ts
│   ├── schemas/             # Schemas de validação (Zod)
│   │   ├── userSchema.ts
│   │   ├── categorySchema.ts
│   │   └── productSchema.ts
│   ├── config/              # Configurações
│   │   ├── multer.ts        # Configuração de upload de arquivos
│   │   └── cloudinary.ts    # Configuração do Cloudinary
│   ├── generated/
│   │   └── prisma/          # Cliente Prisma gerado
│   ├── prisma/
│   │   └── index.ts         # Instância do Prisma Client
│   ├── routes.ts            # Definição de rotas
│   └── server.ts            # Configuração do servidor Express
├── .env                     # Variáveis de ambiente
├── package.json             # Dependências e scripts
└── tsconfig.json            # Configuração do TypeScript
```

---

## 🔧 Tecnologias e Versões

### Dependências de Produção

| Biblioteca | Versão | Descrição |
|-----------|--------|-----------|
| `express` | ^5.2.1 | Framework web para Node.js |
| `@prisma/client` | ^7.2.0 | ORM para banco de dados |
| `@prisma/adapter-pg` | ^7.2.0 | Adapter PostgreSQL para Prisma |
| `pg` | ^8.16.3 | Driver PostgreSQL |
| `bcryptjs` | ^3.0.3 | Criptografia de senhas |
| `jsonwebtoken` | ^9.0.3 | Geração e validação de tokens JWT |
| `zod` | ^4.2.1 | Validação de schemas |
| `cors` | ^2.8.5 | Middleware para CORS |
| `dotenv` | ^17.2.3 | Gerenciamento de variáveis de ambiente |
| `tsx` | ^4.21.0 | Executor TypeScript para desenvolvimento |
| `multer` | ^2.0.2 | Middleware para upload de arquivos |
| `cloudinary` | ^2.8.0 | SDK para armazenamento de imagens na nuvem |

### Dependências de Desenvolvimento

| Biblioteca | Versão | Descrição |
|-----------|--------|-----------|
| `typescript` | ^5.9.3 | Superset JavaScript com tipagem estática |
| `@types/express` | ^5.0.6 | Tipos TypeScript para Express |
| `@types/cors` | ^2.8.19 | Tipos TypeScript para CORS |
| `@types/jsonwebtoken` | ^9.0.10 | Tipos TypeScript para JWT |
| `@types/node` | ^25.0.3 | Tipos TypeScript para Node.js |
| `@types/pg` | ^8.16.0 | Tipos TypeScript para PostgreSQL |
| `@types/multer` | ^2.0.0 | Tipos TypeScript para Multer |
| `prisma` | ^7.2.0 | CLI do Prisma |

### Runtime

- **Node.js**: Compatível com versões modernas (ES2020+)
- **TypeScript**: 5.9.3
- **Banco de Dados**: PostgreSQL

---

## 🗄️ Modelagem do Banco de Dados

### Diagrama de Entidades

```mermaid
erDiagram
    User {
        String id PK
        String name
        String email UK
        String password
        Role role
        DateTime createdAt
        DateTime updatedAt
    }
    
    Category {
        String id PK
        String name
        DateTime createdAt
        DateTime updatedAt
    }
    
    Product {
        String id PK
        String name
        String description
        Int price
        String banner
        Boolean disabled
        String category_id FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    Order {
        String id PK
        Int table
        Boolean status
        Boolean draft
        String name
        DateTime createdAt
        DateTime updatedAt
    }
    
    Item {
        String id PK
        Int amount
        String order_id FK
        String product_id FK
        DateTime createdAt
        DateTime updatedAt
    }
    
    Category ||--o{ Product : "has many"
    Product ||--o{ Item : "has many"
    Order ||--o{ Item : "has many"
```

### Modelos Prisma

#### User (Usuário)
```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(STAFF)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("users")
}

enum Role {
  STAFF
  ADMIN
}
```

#### Category (Categoria)
```prisma
model Category {
  id        String    @id @default(uuid())
  name      String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  products  Product[]
  @@map("categories")
}
```

#### Product (Produto)
```prisma
model Product {
  id          String   @id @default(uuid())
  name        String
  description String
  price       Int
  banner      String
  disabled    Boolean  @default(false)
  category_id String
  category    Category @relation(fields: [category_id], references: [id], onDelete: Cascade)
  items       Item[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@map("products")
}
```

#### Order (Pedido)
```prisma
model Order {
  id        String   @id @default(uuid())
  table     Int
  status    Boolean  @default(false)  // false = pendente/em produção
  draft     Boolean  @default(true)   // true = não enviado para cozinha
  name      String?
  items     Item[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("orders")
}
```

#### Item (Item do Pedido)
```prisma
model Item {
  id         String   @id @default(uuid())
  amount     Int
  order_id   String
  order      Order    @relation(fields: [order_id], references: [id], onDelete: Cascade)
  product_id String
  product    Product  @relation(fields: [product_id], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
  updatedAt DateTime @updatedAt
  @@map("items")
}
```

---

## 🛣️ Endpoints da API

### Usuários

| Método | Endpoint | Middlewares | Descrição |
|--------|----------|-------------|-----------|
| `POST` | `/users` | `validateSchema(createUserSchema)` | Criar novo usuário |
| `POST` | `/session` | `validateSchema(authUserSchema)` | Autenticar usuário (login) |
| `GET` | `/me` | `isAuthenticated` | Obter detalhes do usuário autenticado |

### Categorias

| Método | Endpoint | Middlewares | Descrição |
|--------|----------|-------------|-----------|
| `POST` | `/category` | `isAuthenticated`, `isAdmin`, `validateSchema(createCategorySchema)` | Criar nova categoria (apenas admin) |
| `GET` | `/category` | `isAuthenticated` | Listar todas as categorias |

### Produtos

| Método | Endpoint | Middlewares | Descrição |
|--------|----------|-------------|-----------|
| `POST` | `/product` | `isAuthenticated`, `isAdmin`, `upload.single("file")`, `validateSchema(createProductSchema)` | Criar novo produto com upload de imagem (apenas admin) |

### Pedidos

| Método | Endpoint | Middlewares | Descrição |
|--------|----------|-------------|-----------|
| `POST` | `/order` | `isAuthenticated`, `validateSchema(createOrderSchema)` | Criar novo pedido |

---

## 📝 Detalhamento dos Endpoints

### Categorias

### POST /users

Cria um novo usuário no sistema.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Validações:**
- `name`: mínimo de 3 caracteres
- `email`: formato de email válido
- `password`: mínimo de 6 caracteres

**Response 200:**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Erros:**
- `400`: Erro de validação (dados inválidos)
- `400`: "User already exists" (email já cadastrado)

---

### POST /session

Autentica um usuário e retorna um token JWT.

**Request Body:**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Validações:**
- `email`: formato de email válido
- `password`: mínimo de 6 caracteres

**Response 200:**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros:**
- `400`: Erro de validação (dados inválidos)
- `400`: "Email/Senha invalidos" (credenciais incorretas)

**Nota:** O token JWT expira em 30 dias.

---

### GET /me

Retorna os detalhes do usuário autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Erros:**
- `401`: "Token not found" (token não fornecido)
- `401`: "Token invalid" (token inválido ou expirado)

---

### POST /category

Cria uma nova categoria de produtos. **Apenas usuários com role ADMIN podem criar categorias.**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Pizzas"
}
```

**Validações:**
- `name`: mínimo de 3 caracteres

**Response 201:**
```json
{
  "id": "uuid",
  "name": "Pizzas",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Erros:**
- `400`: Erro de validação (dados inválidos)
- `401`: "Token not found" ou "Token invalid" (não autenticado)
- `401`: "Unauthorized" (usuário não é admin)

---

### GET /category

Retorna todas as categorias cadastradas, ordenadas por data de criação (mais recentes primeiro).

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
[
  {
    "id": "uuid",
    "name": "Pizzas",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": "uuid",
    "name": "Bebidas",
    "createdAt": "2024-01-02T00:00:00.000Z"
  }
]
```

**Erros:**
- `401`: "Token not found" ou "Token invalid" (não autenticado)
- `400`: "Falha ao listar categorias" (erro no servidor)

---

### Produtos

### POST /product

Cria um novo produto com upload de imagem. **Apenas usuários com role ADMIN podem criar produtos.**

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
```
name: "Pizza Margherita"
price: "3500"  (valor em centavos)
description: "Pizza com molho de tomate, mussarela e manjericão"
category_id: "uuid-da-categoria"
file: [arquivo de imagem]
```

**Validações:**
- `name`: obrigatório, mínimo de 1 caractere
- `price`: obrigatório, deve ser um número em formato string (apenas dígitos)
- `description`: obrigatório, mínimo de 1 caractere
- `category_id`: obrigatório, deve ser um UUID válido
- `file`: obrigatório, formatos aceitos: JPEG, JPG, PNG, tamanho máximo: 4MB

**Response 200:**
```json
{
  "id": "uuid",
  "name": "Pizza Margherita",
  "price": 3500,
  "description": "Pizza com molho de tomate, mussarela e manjericão",
  "category_id": "uuid-da-categoria",
  "banner": "https://res.cloudinary.com/.../products/...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Erros:**
- `400`: Erro de validação (dados inválidos)
- `400`: "Nenhum arquivo enviado" (arquivo não fornecido)
- `400`: "Formato de arquivo inválido" (formato não aceito)
- `400`: "Categoria não encontrada" (category_id inválido)
- `400`: "Erro ao enviar imagem" (falha no upload para Cloudinary)
- `401`: "Token not found" ou "Token invalid" (não autenticado)
- `401`: "Unauthorized" (usuário não é admin)

**Nota:** A imagem é enviada para o Cloudinary e a URL retornada é armazenada no banco de dados.

---

### Pedidos

### POST /order

Cria um novo pedido. **Qualquer usuário autenticado pode criar pedidos.**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "table": 5,
  "name": "João Silva"
}
```

**Validações:**
- `table`: obrigatório, deve ser um número inteiro maior que 0
- `name`: obrigatório, mínimo de 1 caractere

**Response 201:**
```json
{
  "id": "uuid",
  "table": 5,
  "name": "João Silva",
  "status": false,
  "draft": true,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Erros:**
- `400`: Erro de validação (dados inválidos)
- `400`: "Falha ao criar pedido" (erro no servidor)
- `401`: "Token not found" ou "Token invalid" (não autenticado)

**Nota:** Pedidos são criados com `status: false` (pendente) e `draft: true` (não enviado para cozinha).

---

## 🔐 Middlewares

### 1. `validateSchema`

**Arquivo**: `src/middlewares/validateSchema.ts`

**Função**: Valida o corpo, query params e params da requisição usando schemas Zod.

**Funcionamento**:
- Recebe um schema Zod como parâmetro
- Valida `req.body`, `req.query` e `req.params`
- Se válido: chama `next()`
- Se inválido: retorna erro 400 com detalhes da validação

**Exemplo de uso**:
```typescript
router.post("/users", validateSchema(createUserSchema), controller.handle)
```

**Resposta de erro**:
```json
{
  "error": "Erro de validação",
  "details": [
    { "mensagem": "Nome deve ter pelo menos 3 caracteres" }
  ]
}
```

---

### 2. `isAuthenticated`

**Arquivo**: `src/middlewares/isAuthenticated.ts`

**Função**: Verifica se o usuário está autenticado via JWT.

**Funcionamento**:
1. Extrai o token do header `Authorization` (formato: `Bearer <token>`)
2. Verifica o token usando `jsonwebtoken`
3. Extrai o `user_id` do payload do token
4. Injeta `user_id` no objeto `req` (via extensão de tipos)
5. Se válido: chama `next()`
6. Se inválido: retorna erro 401

**Resposta de erro**:
```json
{
  "message": "Token not found"
}
// ou
{
  "message": "Token invalid"
}
```

---

### 3. `isAdmin`

**Arquivo**: `src/middlewares/isAdmin.ts`

**Função**: Verifica se o usuário autenticado possui role de ADMIN.

**Funcionamento**:
1. Extrai `user_id` do `req` (injetado pelo `isAuthenticated`)
2. Busca o usuário no banco de dados
3. Verifica se `user.role === "ADMIN"`
4. Se for admin: chama `next()`
5. Se não for: retorna erro 401

**Resposta de erro**:
```json
{
  "error": "Unauthorized"
}
```

> **⚠️ Importante**: Este middleware deve ser usado **após** `isAuthenticated`

---

## ✅ Validação com Schemas (Zod)

### User Schemas

**Arquivo**: `src/schemas/userSchema.ts`

#### `createUserSchema`
```typescript
export const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(3, "Name must have at least 3 characters"),
        email: z.email("Invalid email"),
        password: z.string().min(6, "Password must have at least 6 characters"),
    })
});
```

#### `authUserSchema`
```typescript
export const authUserSchema = z.object({
    body: z.object({
        email: z.email("Invalid email"),
        password: z.string().min(6, "Password must have at least 6 characters"),
    })
});
```

---

### Category Schemas

**Arquivo**: `src/schemas/categorySchema.ts`

#### `createCategorySchema`
```typescript
export const createCategorySchema = z.object({
    body: z.object({
        name: z.string({message: "Nome deve ser um texto"})
               .min(3, {message: "Nome deve ter pelo menos 3 caracteres"}),
    })
});
```

---

### Product Schemas

**Arquivo**: `src/schemas/productSchema.ts`

#### `createProductSchema`
```typescript
export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, {message: "O nome do produto é obrigatório"}),
        price: z.string().min(1, {message: "O preço do produto é obrigatório"})
                 .regex(/^\d+$/),
        description: z.string().min(1, {message: "A descrição do produto é obrigatória"}),
        category_id: z.string({message: "A categoria do produto é obrigatória"}),
    })
});
```

**Observações:**
- O campo `price` é validado como string contendo apenas dígitos
- O valor do preço deve ser em centavos (ex: 3500 = R$ 35,00)
- O arquivo de imagem é validado pelo middleware Multer, não pelo schema Zod

---

## 🔄 Exemplo de Fluxo Completo

### Criar Categoria (POST /category)

#### 1. Rota
```typescript
router.post(
  "/category", 
  isAuthenticated,           // Verifica autenticação
  isAdmin,                   // Verifica se é admin
  validateSchema(createCategorySchema),  // Valida dados
  new CreateCategoryController().handle  // Executa controller
)
```

#### 2. Controller
```typescript
class CreateCategoryController {
    async handle(req: Request, res: Response){
        const {name} = req.body;
        
        const createCategory = new CreateCategoryService();
        const category = await createCategory.execute({name});
        
        return res.status(201).json(category)
    }
}
```

#### 3. Service
```typescript
class CreateCategoryService {
    async execute({ name }: CreateCategoryProps){
        const category = await prismaClient.category.create({
            data: { name },
            select: {
                id: true,
                name: true,
                createdAt: true
            }
        })
        
        return category
    }
}
```

---

## ⚙️ Configuração do TypeScript

### Principais Configurações

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Extensão de Tipos Express

**Arquivo**: `src/@types/express/index.d.ts`

```typescript
declare namespace Express {
    export interface Request {
        user_id: string; 
    }
}
```

Esta extensão permite injetar a propriedade `user_id` no objeto `Request` do Express, utilizada pelos middlewares de autenticação.

---

## 🚀 Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

- **`npm run dev`**: Inicia o servidor em modo de desenvolvimento com hot-reload

---

## 🌐 Configuração do Servidor

**Arquivo**: `src/server.ts`

```typescript
import cors from 'cors'
import "dotenv/config"
import express, { NextFunction, Request, Response } from 'express';
import {router} from "./routes"

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

// Middleware de tratamento de erros
app.use((error:Error, req:Request, res:Response, next:NextFunction) => {
    if (error instanceof Error) {
        return res.status(400).json({
            message: error.message
        })
    }
    
    return res.status(500).json({
        message: "Internal server error"
    })
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
```

---

## 🔒 Segurança

### Autenticação JWT

- Tokens JWT são gerados no login
- Secret armazenado em variável de ambiente (`JWT_SECRET`)
- Tokens validados em rotas protegidas via middleware `isAuthenticated`
- Tokens expiram em 30 dias

### Criptografia de Senhas

- Senhas são hasheadas usando `bcryptjs` com salt de 10 rounds
- Senhas nunca são retornadas nas respostas da API

### CORS

- Configurado para aceitar requisições de qualquer origem (desenvolvimento)
- Em produção, deve ser configurado para aceitar apenas origens específicas

---

## 📝 Variáveis de Ambiente

Arquivo `.env` deve conter:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/pizzaria"
JWT_SECRET="seu-secret-super-seguro"
PORT=3333
CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"
```

### Descrição das Variáveis

- **DATABASE_URL**: String de conexão com o banco de dados PostgreSQL
- **JWT_SECRET**: Chave secreta para assinatura e verificação de tokens JWT
- **PORT**: Porta em que o servidor irá rodar (padrão: 3333)
- **CLOUDINARY_CLOUD_NAME**: Nome da conta no Cloudinary
- **CLOUDINARY_API_KEY**: Chave de API do Cloudinary
- **CLOUDINARY_API_SECRET**: Secret da API do Cloudinary

---

## 🗄️ Configuração do Banco de Dados

### Prisma

O projeto utiliza Prisma como ORM. O cliente Prisma é gerado em `src/generated/prisma`.

### Migrações

Para criar uma nova migração:
```bash
npx prisma migrate dev --name nome_da_migracao
```

Para aplicar migrações em produção:
```bash
npx prisma migrate deploy
```

Para gerar o cliente Prisma:
```bash
npx prisma generate
```

### Studio Prisma

Para visualizar e gerenciar dados do banco:
```bash
npx prisma studio
```

---

## ⚙️ Configurações

### Multer (Upload de Arquivos)

**Arquivo**: `src/config/multer.ts`

**Configuração:**
```typescript
export default {
    storage: multer.memoryStorage(),  // Armazena em memória para envio direto ao Cloudinary
    limits: {
        fileSize: 4*1024*1024  // Limite de 4MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ]
        
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }else{
            cb(new Error("Formato de arquivo inválido"))
        }
    }
}
```

**Características:**
- Usa `memoryStorage` para manter o arquivo em memória (buffer)
- Limite de tamanho: 4MB
- Formatos aceitos: JPEG, JPG, PNG
- Rejeita outros formatos com erro

---

### Cloudinary (Armazenamento de Imagens)

**Arquivo**: `src/config/cloudinary.ts`

**Configuração:**
```typescript
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string
})

export default cloudinary
```

**Uso:**
- Armazena imagens de produtos na nuvem
- Organiza imagens na pasta "products"
- Retorna URLs HTTPS seguras
- Requer credenciais configuradas no `.env`

---

## 🎯 Próximas Implementações

- [x] ~~Endpoint para listar categorias~~
- [x] ~~Endpoint para criar produtos~~
- [x] ~~Upload de imagens (banner de produtos)~~
- [ ] Endpoints para listar, atualizar e deletar produtos
- [ ] Endpoints para pedidos (CRUD)
- [ ] Endpoints para itens de pedidos
- [ ] Paginação de listagens
- [ ] Filtros e buscas
- [ ] Testes unitários e de integração
- [ ] Documentação Swagger/OpenAPI
- [ ] Endpoint para atualizar e deletar categorias
- [ ] Endpoint para atualizar e deletar usuários

---

## 📚 Convenções do Projeto

### Nomenclatura

- **Controllers**: `<Ação><Entidade>Controller.ts` (ex: `CreateUserController.ts`)
- **Services**: `<Ação><Entidade>Service.ts` (ex: `CreateUserService.ts`)
- **Schemas**: `<entidade>Schema.ts` (ex: `userSchema.ts`)
- **Middlewares**: `<funcionalidade>.ts` (ex: `isAuthenticated.ts`)

### Estrutura de Pastas

- Organização por domínio (user, category, product, etc.)
- Separação clara entre controllers e services
- Middlewares e schemas centralizados

### Padrões de Código

- Uso de TypeScript strict mode
- Interfaces para tipagem de dados
- Async/await para operações assíncronas
- Try/catch em operações críticas
- Retorno de erros descritivos

---

## 🔍 Estrutura de Serviços

### CreateUserService

**Arquivo**: `src/services/user/CreateUserService.ts`

**Funcionalidade**: Cria um novo usuário no sistema.

**Lógica**:
1. Verifica se o email já existe
2. Se existir, lança erro "User already exists"
3. Hash da senha com bcryptjs (10 rounds)
4. Cria o usuário no banco de dados
5. Retorna dados do usuário (sem senha)

---

### AuthUserService

**Arquivo**: `src/services/user/AuthUserService.ts`

**Funcionalidade**: Autentica um usuário e gera token JWT.

**Lógica**:
1. Busca usuário pelo email
2. Se não encontrar, lança erro "Email/Senha invalidos"
3. Compara senha fornecida com hash armazenado
4. Se não corresponder, lança erro "Email/Senha invalidos"
5. Gera token JWT com payload contendo name, email e subject (user.id)
6. Retorna dados do usuário + token

---

### CreateCategoryService

**Arquivo**: `src/services/category/CreateCategoryService.ts`

**Funcionalidade**: Cria uma nova categoria.

**Lógica**:
1. Cria categoria no banco de dados
2. Retorna dados da categoria criada

---

### ListCategoryService

**Arquivo**: `src/services/category/ListCategoryService.ts`

**Funcionalidade**: Lista todas as categorias cadastradas.

**Lógica**:
1. Busca todas as categorias no banco de dados
2. Ordena por data de criação (mais recentes primeiro)
3. Retorna array de categorias com id, name e createdAt
4. Em caso de erro, lança exceção "Falha ao listar categorias"

---

### CreateProductService

**Arquivo**: `src/services/product/CreateProductService.ts`

**Funcionalidade**: Cria um novo produto com upload de imagem para o Cloudinary.

**Lógica**:
1. Verifica se a categoria existe no banco de dados
2. Se não existir, lança erro "Categoria não encontrada"
3. Faz upload da imagem para o Cloudinary:
   - Converte o buffer da imagem em stream
   - Envia para a pasta "products" no Cloudinary
   - Gera um public_id único com timestamp + nome do arquivo
   - Obtém a URL segura (HTTPS) da imagem
4. Cria o produto no banco de dados com a URL da imagem
5. Converte o preço de string para inteiro
6. Retorna dados do produto criado

**Tratamento de Erros:**
- Erro no upload: "Erro ao enviar imagem"
- Categoria inválida: "Categoria não encontrada"

---

## 🐛 Tratamento de Erros

O projeto utiliza um middleware global de tratamento de erros no `server.ts`:

```typescript
app.use((error:Error, req:Request, res:Response, next:NextFunction) => {
    if (error instanceof Error) {
        return res.status(400).json({
            message: error.message
        })
    }
    
    return res.status(500).json({
        message: "Internal server error"
    })
})
```

**Comportamento**:
- Erros do tipo `Error` retornam status 400 com a mensagem do erro
- Outros erros retornam status 500 com mensagem genérica

---

## 📖 Exemplos de Uso

### Criar Usuário

```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Autenticar Usuário

```bash
curl -X POST http://localhost:3333/session \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Obter Dados do Usuário Autenticado

```bash
curl -X GET http://localhost:3333/me \
  -H "Authorization: Bearer <token>"
```

### Criar Categoria (Admin)

```bash
curl -X POST http://localhost:3333/category \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "Pizzas"
  }'
```

### Listar Categorias

```bash
curl -X GET http://localhost:3333/category \
  -H "Authorization: Bearer <token>"
```

### Criar Produto (Admin)

```bash
curl -X POST http://localhost:3333/product \
  -H "Authorization: Bearer <token>" \
  -F "name=Pizza Margherita" \
  -F "price=3500" \
  -F "description=Pizza com molho de tomate, mussarela e manjericão" \
  -F "category_id=uuid-da-categoria" \
  -F "file=@/caminho/para/imagem.jpg"
```

---

## 📄 Licença

ISC

---

**Última atualização**: Janeiro 2025
