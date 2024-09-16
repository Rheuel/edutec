const botaoJogarNovamente = document.querySelector("main .JN")


botaoJogarNovamente.addEventListener("click", jogarNovamente)

const botaoSair = document.querySelector("main .sair")


botaoSair.addEventListener("click", Sair)


function inserirResultado(){
    const sectionPontuacao = document.querySelector(".pontuacao")
    const pontos = localStorage.getItem("pontos")

    sectionPontuacao.innerHTML = `
           

            <strong>${pontos}</strong> 

<p>de 12</p>
    `
}

function jogarNovamente(){
    window.location.href = "../quiz/quiz.html"
}

function Sair(){
    window.location.href = "../../index.html"
}

inserirResultado()