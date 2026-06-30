const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const projetoRoutes = require('./routes/projeto');
const despesaRouter = require('./routes/despesa');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'segredo-lab',
    resave: false,
    saveUninitialized: false
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/projeto', projetoRoutes);
app.use('/despesa', despesaRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Algo deu errado no servidor!' });
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
