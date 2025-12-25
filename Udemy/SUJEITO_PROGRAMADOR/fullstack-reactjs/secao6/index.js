const express = require("express");

const server = express();

// é necessário para que o express entenda o json
server.use(express.json())

const cursos = ['Node.js', 'React', 'React Native']

//middleware global
server.use((req, res, next) => {
    console.log(`URL CHAMADA: ${req.url}`)

    return next();
})

//middleware local para checar se o nome do curso existe
function checkCurso(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: "Nome do curso é obrigatório" })
    }

    return next();
}

function checkIndexCurso(req, res, next) {
    const curso = cursos[req.params.index]

    if (curso == undefined) {
        return res.status(404).json({ error: "Curso não encontrado" })
    }

    req.curso = curso;

    return next();
}

server.get('/cursos', (req, res) => {
    return res.json(cursos)
})

server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    // const { index } = req.params;

    return res.json(req.curso)
})

//criar
server.post('/cursos', checkCurso, (req, res) => {
    const { name } = req.body;
    cursos.push(name)

    return res.json(cursos)
})

//atualizar
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(req.curso)
})

//deletar
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;

    const deleted = cursos.splice(index, 1);

    return res.send(deleted + " deletado.")
})

server.listen(3000)