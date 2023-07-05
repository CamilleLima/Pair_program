const http = require ('http')
const URL = require('url')
const data = require('./urls.json')
const fs = require('fs')
const path = require('path')




http.createServer((req, res) => {


    fs.writeFile(
        path.join(__dirname, 'urls.json'),
        JSON.stringify(data, null, 2),
        err => {
            if(err) throw err
            res.end('Operação realizada com sucesso')
        }
    
    )

    
    const {name, url, del} = URL.parse(req.url, true).query
    
    if(!name || !url) return res.end('show')

    if(del) return res.end('delete')
    
    return res.end('create')

 


}).listen(3000, () => console.log('API rodando.....'))


