const botaoJogarNovamente = document.querySelector("main .JN")


botaoJogarNovamente.addEventListener("click", jogarNovamente)

const botaoRanking = document.querySelector("main .ranking")

botaoRanking.addEventListener("click", Ranking)

const botaoSair = document.querySelector("main .sair")


botaoSair.addEventListener("click", Sair)

const apiUrl = 'https://edutec-cfwr.onrender.com/api/updatePoints';

function inserirResultado(){
    const sectionPontuacao = document.querySelector(".pontuacao")
    const pontos = localStorage.getItem("pontos")

    sectionPontuacao.innerHTML = `
           

            <strong>${pontos}</strong> 

<p>de 12</p>
    `

    updatePoints();
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

async function updatePoints() {
    const userId = localStorage.getItem('userId');
    const pontos = localStorage.getItem('pontos');
    pontos = pontos * 8.333333333333333;

    if (!userId || !pontos) {
        console.error('ID do usuário ou pontos não encontrados.');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId, pontos: parseInt(pontos, 10) })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Pontos atualizados com sucesso!', result);
        } else {
            console.log('Erro ao atualizar pontos:', result);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
}

inserirResultado()