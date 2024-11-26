const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');
const apiUrl = 'https://edutec-cfwr.onrender.com/api/login'; 

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

                if (response.status === 200) {
                    const data = await response.json();
                    localStorage.setItem('userId', data.id)
                    window.location.href = "../front-end/pages/home/home.html"
                } else if (response.status === 201) {
                   const data = await response.json();
                   localStorage.setItem('userId', data.id)
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