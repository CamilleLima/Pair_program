const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
      if (err) throw err;
      res.end(content);
    });
  } else if (req.url === '/styles.css') {
    fs.readFile(path.join(__dirname, 'public', 'styles.css'), (err, content) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'text/css');
      res.end(content);
    });
  }
}).listen(5000, () => {
  console.log('Servidor Rodando.......')
});
