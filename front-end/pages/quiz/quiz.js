const assunto = "Quiz"

let quiz = {}
let pontos = 0
let pergunta = 1
let resposta = ""
let idInputResposta = ""
let respostaCorretaId = ""


async function buscarPerguntas() {
    const urlDados = "../../data.json"

    await fetch(urlDados).then(resposta => resposta.json()).then(dados => {
        dados.quizzes.forEach(dado => {
            if (dado.title === assunto){
                quiz = dado
            }
        })
    })
}



function montarPergunta() {
    const main = document.querySelector("main")
    const header = document.querySelector("header")
    

   header.innerHTML = `
   <div class="barra_progresso">
        <div style="width: ${pergunta *8.333333333333333}%"></div>
    </div>
    <div class="header">
            <div>
                <img src="../../img/Logo.png" alt="logo do site">
            </div>

            <div class="pergunta">
            <div>
                <h1>QUIZ</h1>
            </div>
            </div>
        </div>
   `
  

    main.innerHTML = `
     <section class="alternativas">
            <div class="teste">
            
            <div class="pergunta">
                <div>
                    <h2>${pergunta} - ${quiz.questions[pergunta-1].question}</h2>
                </div>
                <img src="../../img/bio.PNG" alt="">
            </div>

            
            <form action="">
                <label for="alternativa_a">
                    <input type="radio" id="alternativa_a" name="alternativa" value="${quiz.questions[pergunta-1].options[0]}">

                    <div>
                        <span>A</span>
                        ${quiz.questions[pergunta-1].options[0]}
                    </div>
                </label>

                <label for="alternativa_b">
                    <input type="radio" id="alternativa_b" name="alternativa" value="${quiz.questions[pergunta-1].options[1]}">

                    <div>
                        <span>B</span>
                         ${quiz.questions[pergunta-1].options[1]}
                    </div>
                </label>
                <label for="alternativa_c">
                    <input type="radio" id="alternativa_c" name="alternativa" value="${quiz.questions[pergunta-1].options[2]}">
                    <div>
                        <span>C</span>
                        ${quiz.questions[pergunta-1].options[2]}
                    </div>
                </label>
                <label for="alternativa_d">
                    <input type="radio" id="alternativa_d" name="alternativa" value="${quiz.questions[pergunta-1].options[3]}">
                    <div>
                        <span>D</span>
                        ${quiz.questions[pergunta-1].options[3]}
                    </div>
                </label>
            </form>
           
        </div>
         <div class="bt">
            <button>Responder</button>
        </div>
        </section>
        
    `
}

function guardarResposta(evento){
    resposta = evento.target.value
    idInputResposta = evento.target.id

    const botaoEnviar = document.querySelector(".bt button")
    botaoEnviar.addEventListener("click", validarResposta)
}

function validarResposta(){
    const botaoEnviar = document.querySelector(".bt button")
    botaoEnviar.innerText = "Próxima"
    botaoEnviar.removeEventListener("click", validarResposta)
    botaoEnviar.addEventListener("click", proximaPergunta)

    if (pergunta === 12) {
        botaoEnviar.innerText = "finalizar"
        botaoEnviar.addEventListener("click", finalizar)
    } else {
        botaoEnviar.addEventListener("click", proximaPergunta)
    }

    if(resposta === quiz.questions[pergunta-1].answer){
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "correta")
        pontos = pontos + 1
    } else {
        document.querySelector(`label[for='${idInputResposta}']`).setAttribute("id", "errada")
        document.querySelector(`label[for='${respostaCorretaId}']`).setAttribute("id", "correta")
    }

    pergunta = pergunta + 1
}

function finalizar(){
    localStorage.setItem("pontos", pontos)
    window.location.href = "../resultados/resultado.html"
}

function proximaPergunta(){
    montarPergunta()
    adicionarEventoInputs()
}

function adicionarEventoInputs(){
    const inputResposta = document.querySelectorAll(".alternativas input")
    inputResposta.forEach(input => {
        input.addEventListener("click", guardarResposta)

        if (input.value === quiz.questions[pergunta-1].answer) {
            respostaCorretaId = input.id
        }
    })
}

async function iniciar(){
    await buscarPerguntas()
    montarPergunta()
    adicionarEventoInputs()
}

iniciar()