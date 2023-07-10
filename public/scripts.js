const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')
const li = document.querySelector('li')



// Não se preocupem com esse pedaço de código comentado! Vamos descomentá-lo quando tivermos acabado de construir a API.

// Função que carrega o conteúdo da API.
async function load() {
    // fetch está como await para evitar que entre num esquema de promisse e só devolva o conteúdo após a iteração qua acontece em seguida.
    const res = await fetch('http://localhost:3000/')
        .then(data => data.json())
    // Iterando no vetor com o conteúdo (JSON) que está vindo da API e adicionando-os no frontend.
    res.urls.map(({name, url}) => addElement({name, url}))
}

load()



function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(li)
    
    ul.append(li)
    li.append(a)
    li.append(trash)
    
}

async function addElementapi({name, url}){
    addElement({name, url})
    const response = await fetch(`http://localhost:3000/?name=${name}&url=${url}`)
    console.log(response)
    if (!response.ok){
        console.error(`Erro ao enviar os dados para a API!: ${response.statusText}`)
        
    }
}

// function updateElement({name}){
//     updateElement({name})
// }

function removeElement(element) {
    if (confirm('Tem certeza que deseja deletar?')) {
      element.remove(); // Removendo o elemento li diretamente
      console.log('Removido com sucesso');
    }
  }
        


form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    let { value } = input

    if (!value)
        return alert('Preencha o campo!')

    const [name, url] = value.split(',')

    if (!url)
        return alert('O texto não está formatado da maneira correta.')

    if (!/^http/.test(url))
        return alert('Digite a url da maneira correta.')

    addElementapi({ name, url })
    input.value = ''

    removeElement({li})
    

})