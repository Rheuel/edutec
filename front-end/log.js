const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Previne o recarregamento da página

            // Obtém os valores do formulário
            const nome = document.getElementById('nome').value;
            const senha = document.getElementById('senha').value;

            // Envia os dados para o servidor
            try {
                const response = await fetch('http://localhost:5000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, senha })
                });

                if (response.status === 200) {
                    localStorage.setItem("user", nome)
                    window.location.href = "../front-end/pages/home/home.html"
                } else if (response.status === 201) {
                   localStorage.setItem("user", nome)
                   window.location.href = "../front-end/pages copy/home/home.html"
                } else {
                    messageDiv.style.color = 'red';
                    messageDiv.textContent = 'Usuário ou senha inválidos.';
                }
            } catch (error) {
                console.error('Erro ao realizar login:', error);
                messageDiv.style.color = 'red';
                messageDiv.textContent = 'Erro no servidor. Tente novamente mais tarde.';
            }
        });