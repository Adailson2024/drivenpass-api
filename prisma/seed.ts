import "dotenv/config";
import pg from "pg";
import bcrypt from "bcryptjs";

const { Pool } = pg;

async function main() {
  console.log("Conectando ao banco...");
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const hashedPassword = await bcrypt.hash("demo123", 10);

  // Verificar se usuário já existe
  const existing = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    ['demo@driven.com.br']
  );

  if (existing.rows.length === 0) {
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      ['Demo', 'demo@driven.com.br', hashedPassword]
    );
    console.log("Usuário demo criado!");
  } else {
    console.log("Usuário demo já existe.");
  }

  await pool.end();
  console.log("Seed executado com sucesso!");
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  });
