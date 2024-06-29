const express = require('express');
const session = require('express-session');
const app = express();

// Configuração do middleware para sessão
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

let items = [];

// Renderizar lista na tela inicial e enviar itens da sessão do usuário
app.get('/', (req, res) => {
    // Verifica se a sessão do usuário possui uma lista de itens
    if (!req.session.items) {
        req.session.items = [];
    }

    res.render('list', {
        newListItems: req.session.items
    });
});

// Página para contato
app.get('/about', (req, res) => {
    res.render('about');
});

// Requerer dados dos inputs e redirecionar ao array items da sessão do usuário
app.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    // Adicionar novo item à lista na sessão do usuário
    req.session.items.push({ title, description });

    res.redirect('/');
});

// Remover item usando id da sessão do usuário
app.post('/remove/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    if (itemId >= 0 && itemId < req.session.items.length) {
        req.session.items.splice(itemId, 1);
    }
    res.redirect('/');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on ${port} Port`);
});
