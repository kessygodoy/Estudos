const express = require("express");

const server = express();

// é necessário para que o express entenda o json
server.use(express.json())

const cursos = ['Node.js', 'React', 'React Native']

server.use((req, res) => {
    console.log("Recebemos uma requisição")
})

server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;

    return res.json({ curso: `Aprendendo ${cursos[index]}` })
})

//criar
server.post('/cursos', (req, res) => {
    const { name } = req.body;
    cursos.push(name)

    return res.json(cursos)
})

//atualizar
server.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos)
})

//deletar
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;

    const deleted = cursos.splice(index, 1);

    return res.send(deleted + " deletado.")
})

server.listen(3000)