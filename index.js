const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true}));

let items = []

//renderizar lista na tela inicial e enviar items
app.get('/', (req, res) => {

    res.render('list', {
        newListItems: items
    })
});

//pagina para contato
app.get('/about', (req, res) => {
    res.render('about');
});

//requerer dados dos inputs e redirecionar ao array items
app.post('/', (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    items.push({title, description})
    res.redirect('/');
})

//remover items usando id
app.post('/remove/:id', (req, res) => {
    const itemId = parseInt(req.params.id, 10);
    if (itemId >= 0 && itemId < items.length) {
        items.splice(itemId, 1);
    }
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('Running on 3000 Port')
});