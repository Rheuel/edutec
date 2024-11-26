const form = document.getElementById('registerForm');
const apiUrl = 'https://edutec-cfwr.onrender.com/api/cadastro';


        form.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            
            const nome = document.getElementById('nome').value;
            const senha = document.getElementById('senha').value;

            
            try {
                const response = await fetch(apiUrl, {
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