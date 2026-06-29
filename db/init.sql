CREATE TABLE projeto
(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao VARCHAR(100) NOT NULL,
    objetivo INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_finalizacao DATE
);

INSERT INTO projeto ( nome, descricao, objetivo)
VALUES
('Reforco Escolar Anjos do Saber', 'Reforco escolar para criancas e adolescentes do ensino fundamental.', 15000),
('Habitacao Social para Familias', 'Construcao e renovacao de habitacoes para familias em situacao de vunerabilidade.', 100000),
('Sopa Fraterna', 'Sopa para familias carentes do bairro Planalto entregua aos sabados.', 250)
ON CONFLICT (nome)
DO UPDATE SET
    nome = EXCLUDED.nome,
    descricao = EXCLUDED.descricao,
    objetivo = EXCLUDED.objetivo;

CREATE TABLE despesa
(
    id SERIAL PRIMARY KEY,
    id_projeto INT NOT NULL,
    valor INT NOT NULL,
    causa VARCHAR(100) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO despesa ( id_projeto, valor, causa)
VALUES
( 1, 750, 'Aquisicao de materiais escolares.'),
( 1, 1000, 'Comprar alimentos para a merenda.'),
( 1, 1200, 'Aquisicao de cadeiras e mesas escolares.' ),
( 2, 9000, 'Aquisicao de materiais de construcao.' ),
( 2, 15000, 'Pagamento dos funcionarios.' ),
( 3, 70, 'Comprar ingredientes para sopa.' ),
( 3, 75, 'Comprar ingredientes para sopa.' );

CREATE TABLE doacoes
(
    id SERIAL PRIMARY KEY,
    id_projeto INT NOT NULL,
    valor INT NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO doacoes ( id_projeto, valor)
VALUES
( 1, 1000 ),
( 1, 1300 ),
( 1, 900 ),
( 2, 14000 ),
( 2, 27000 ),
( 3, 170 ),
( 3, 50 ),
( 3, 70 );

ALTER TABLE despesa ADD FOREIGN KEY(id_projeto) REFERENCES projeto (id);
ALTER TABLE doacoes ADD FOREIGN KEY(id_projeto) REFERENCES projeto (id);

