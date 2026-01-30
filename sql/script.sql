-- Criar tabela de Usuários
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

-- Criar tabela de Credenciais
CREATE TABLE "credentials" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    
    -- Chave estrangeira com deleção em cascata
    CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") 
    REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    
    -- Garantir que um usuário não tenha dois títulos iguais (@@unique([userId, title]))
    CONSTRAINT "credentials_userId_title_key" UNIQUE ("userId", "title")
);

-- Inserir Usuário Padrão (Demo)
-- Nota: A senha 'demo123' deve estar em hash bcrypt. 
-- O hash abaixo é um exemplo de 'demo123'.
INSERT INTO "users" ("name", "email", "password") 
VALUES ('Demo', 'demo@driven.com.br', '$2b$10$7pS6X/oV0VqG2XmO2Q.mRe.Psh4.G8m5Y5L3mB6yFzO8o5Uq7A.Jy');