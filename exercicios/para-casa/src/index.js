const express = require('express')
const ghiblifilmesJson = require('./model/ghiblifilmes.json')
const app = express()

app.use(express.json())

app.listen(2018, ()=>{
    console.log('o servidor esta na porta 2018, ok')
})
app.get('/', (request, response) => {
    response.status(200).json([{
        'mensagem':'ok, api de filmes ok'
    }])
})

app.get('/ghiblifilmes', (request, response) => {
    response.status(200).send(ghiblifilmesJson)
})
// minha rota title

app.get('/title', (request, response) => {
    let titleRequest = request.query.title.toLocaleLowerCase()
    console.log(titleRequest)
    let filmeEncontrado = ghiblifilmesJson.filter(filme => filme.title.toLocaleLowerCase().includes(titleRequest))
    response.status(200).send(filmeEncontrado)
})

//rota director

app.get('/director', (request, response) => {
    let directorRequest = request.query.director.toLocaleLowerCase()
    console.log(directorRequest)
    let filmeEncontrado = ghiblifilmesJson.filter(filme => filme.director.toLocaleLowerCase().includes(directorRequest))
    response.status(200).send(filmeEncontrado)
})

//rota por id
app.get('/ghiblifilmes/:id', (request, response)=>{
    let idRequest = request.params.id
    let filmeEncontrado = ghiblifilmesJson.find(filme => filme.id == idRequest)
    response.status(200).send(filmeEncontrado)
})
//rota para post
app.post('/ghiblifilmes', (request, response) => {
    
    let titleRequest = request.body.title
    let original_titleRequest = request.body.original_title
    let original_title_romanisedRequest = request.body.original_title_romanised
    let descriptionRequest = request.body.description
    let directorRequest = request.body.director
    let producerRequest = request.body.producer
    let release_dateRequest = request.body.release_date
    let running_timerequest = request.body.running_time
 
    let novoFilme = {
        id: (ghiblifilmesJson.length) +1,
        title: titleRequest,
        original_title: original_titleRequest,
        original_title_romanised: original_title_romanisedRequest,
        description: descriptionRequest,
        director: directorRequest,
        producer: producerRequest,
        release_date: release_dateRequest,
        running_time: running_timerequest,
        
    }
    ghiblifilmesJson.push(novoFilme)
    response.status(201).json
    ([{
        'mensagem':'seu filme foi cadastrado com sucesso', novoFilme
    }])
})

