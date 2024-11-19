const apiUrl = 'http://localhost:5000/api/ranking';

        // Função para buscar e exibir os dados do ranking
        async function fetchRanking() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Erro ao buscar o ranking');

                const data = await response.json();

                // Exibe os dados no pódio
                document.getElementById('first-name').innerText = data[0]?.nome || 'N/A';
                document.getElementById('first-score').innerText = data[0]?.pontos || '0';

                document.getElementById('second-name').innerText = data[1]?.nome || 'N/A';
                document.getElementById('second-score').innerText = data[1]?.pontos || '0';

                document.getElementById('third-name').innerText = data[2]?.nome || 'N/A';
                document.getElementById('third-score').innerText = data[2]?.pontos || '0';
            } catch (error) {
                console.error('Erro ao carregar o ranking:', error);
            }
        }

        // Carrega o ranking ao carregar a página
        fetchRanking();


const botaoSair = document.querySelector("main .sair")

botaoSair.addEventListener("click", Sair)

function Sair(){
    window.location.href = "./resultado.html"
}