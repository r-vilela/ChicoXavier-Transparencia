CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email)
VALUES
    ('Ana Silva', 'ana@email.com'),
    ('Carlos Souza', 'carlos@email.com')
ON CONFLICT (email)
DO UPDATE SET
    nome = EXCLUDED.nome,
    email = EXCLUDED.email;
