const form = document.getElementById('registerForm');

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Previne recarregamento da página

            // Obtém os valores do formulário
            const nome = document.getElementById('nome').value;
            const senha = document.getElementById('senha').value;

            // Envia os dados para o servidor
            try {
                const response = await fetch('http://localhost:5000/api/cadastro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, senha })
                });

                const result = await response.text();
                window.location.href = "./index.html"
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
                alert('Erro ao cadastrar usuário');
            }
        });