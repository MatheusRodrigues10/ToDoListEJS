const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));

let items = []

app.get('/', (req, res) => {

    res.render('list', {
        newListItems: items
    })
});

app.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    items.push({title, description})
    res.redirect('/');
})

app.post('/remove/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    if (itemId >= 0 && itemId < items.length) {
        items.splice(itemId, 1);
    }
    res.redirect('/');
});

app.post('/edit/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10); // Convertendo o parâmetro ID para um número inteiro
    const updatedTitle = req.body.title; // Obtendo o novo título da tarefa do corpo da solicitação
    const updatedDescription = req.body.description; // Obtendo a nova descrição da tarefa do corpo da solicitação

    // Encontrar o índice do item na lista
    const index = newListItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        // Atualizar os dados da tarefa
        newListItems[index].title = updatedTitle;
        newListItems[index].description = updatedDescription;
        res.redirect('/'); // Redirecionar de volta para a página inicial após a edição
    } else {
        res.status(404).send('Tarefa não encontrada');
    }
});

app.listen(3000, () => {
    console.log('Running on 3000 Port')
});