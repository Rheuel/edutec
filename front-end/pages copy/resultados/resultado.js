const botaoJogarNovamente = document.querySelector("main .JN")


botaoJogarNovamente.addEventListener("click", jogarNovamente)

const botaoRanking = document.querySelector("main .ranking")

botaoRanking.addEventListener("click", Ranking)

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

function Ranking(){
    window.location.href = "./ranking.html"
}

function Sair(){
    window.location.href = "../home/home.html"
}

inserirResultado()