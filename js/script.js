let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0
let numero = ''
let votoBranco = false

function comecarEtapa(){
    let etapa = etapas[etapaAtual]
    let numeroHTML = ''
    numero = ''
    votoBranco = false

    for (let cont = 0; cont < etapa.numeros; cont++) {
        if (cont == 0) {
            numeroHTML += '<div class="numero pisca"></div>'
        } else{
            numeroHTML += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHTML
}


function atualizarInterface() {
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) =>{
        if (item.numero === numero){
            return true
        } else{
            return false
        }
    })
        if (candidato.length > 0) {
            candidato = candidato[0]
            seuVotoPara.style.display = 'block'
            aviso.style.display = 'block'
            descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`
            let fotosHTML = ''
            for (let i in candidato.foto) {
                if(candidato.foto[i].small){
                    fotosHTML += `<div class="d-1-image small"><img src="images/${candidato.foto[i].url}" alt="">${candidato.foto[i].legenda}</div>`
                } else{
                    fotosHTML += `<div class="d-1-image"><img src="images/${candidato.foto[i].url}" alt="">${candidato.foto[i].legenda}</div>`
                }
            }
            lateral.innerHTML = fotosHTML
        } else {
            seuVotoPara.style.display = 'block'
            aviso.style.display = 'block'
            descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
        }
}


function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero !== null){
        elNumero.innerHTML= n
        numero = `${numero}${n}`
        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextSibling.classList.add('pisca')
        } else {
            atualizarInterface()
        }
    }   
}

function branco() {
    if (numero === '') {
        votoBranco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    } else {
        alert("Para votar em BRANCO, não pode ter digitado nenhum número!")
    }
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false
    if (votoBranco) {
        votoConfirmado = true
        console.log('Confirmando como BRANCO...' + numero)
    }else if (numero.length === etapa.numeros) {
        votoConfirmado = true
        console.log('Confirmando como ' + numero)
    } else {
        alert("Número incompleto!")
    }

    if(votoConfirmado){
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        }
    }
}

comecarEtapa()