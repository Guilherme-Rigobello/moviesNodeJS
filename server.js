const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3001

const filmePath = path.join(__dirname, 'filmes.json');


const filmeData = fs.readFileSync(filmePath, 'utf-8');
const filmes = JSON.parse(filmeData);


app.get('/', (req, res) => {
    let filmesTable = '';


    filmes.forEach(filme => {
        filmesTable += `
    <tr>
        <td>${filme.titulo}</td>
        <td>${filme.ano}</td>
        <td>${filme.diretor}</td>
        <td>${filme.genero}</td>
        <td><img src="${filme.cartaz}" alt="${filme.titulo}" style ="max-width: 200px; "></td>
    </tr>
    `
    });

    const htmlContent = fs.readFileSync('index.html', 'utf-8');
    const finalHtml = htmlContent.replace('{{filmesTable}}', filmesTable);

    res.send(finalHtml);

})



app.get('/buscarPorGenero', (req, res) => {


    const genero = req.query.genero.toLowerCase();
    const filmesFiltrados = filmes.filter(filme => filme.genero.toLowerCase() === genero);

    let filmesTable = '';

    filmesFiltrados.forEach(filme => {

        filmesTable += `

    
    <tr>
        <td>${filme.titulo}</td>
        <td>${filme.ano}</td>
        <td>${filme.diretor}</td>
        <td>${filme.genero}</td>
        <td><img src="${filme.cartaz}" alt="${filme.titulo}" style ="max-width: 200px; "></td>
    </tr>

    <a href="/">Voltar</a>
    `
    });

    const htmlContent = fs.readFileSync('index.html', 'utf-8');
    const finalHtml = htmlContent.replace('{{filmesTable}}', filmesTable);

    res.send(finalHtml);
});


app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}`)
});