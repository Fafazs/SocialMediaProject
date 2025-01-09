const loginForm = document.getElementById("loginForm");
const jwt_decode = (await import('jwt-decode')).default;



function validateForm(loginData) {
    const { email, senha } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let erros = [];

    if (!email || email.trim() === "") {
        erros.push("Você precisa preencher o campo de Email");
    }

    if (!senha || senha.trim() === "") {
        erros.push('Você deve preencher o campo de Senha');
    }
    if (!emailRegex.test(email)) {
        erros.push("formato de email invalido");
    }
    return erros;
}

function mostrarMessagem(messagem) {
    const loginStatus = document.getElementById('loginStatus');
    loginStatus.innerHTML = "";
    const loginResponse = document.createElement("li");
    loginResponse.textContent = messagem;
    loginStatus.appendChild(loginResponse);
}

function mostrarErros(erros) {
    const loginStatus = document.getElementById('loginStatus');
    loginStatus.innerHTML = "";
    if (erros.length > 0) {
        erros.forEach((erro) => {
            const erroItem = document.createElement('li');
            erroItem.textContent = erro;
            loginStatus.appendChild(erroItem);
        })
    } else {
        const victoryItem = document.createElement('li');
        victoryItem.textContent = "Você enviou o formulario com sucesso!"
        loginStatus.appendChild(victoryItem);
    }
}


loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const loginData = {
        email: loginForm.elements['Email'].value,
        senha: loginForm.elements['Senha'].value
    }
    const erros = await validateForm(loginData);
    if (erros.length > 0) {
        mostrarErros(erros);
    } else {
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', },
                body: JSON.stringify(loginData),
            });
            if (response.ok) {
                const responseBody = await response.json();
                loginForm.reset();
                mostrarMessagem(responseBody.message);
            }
            if (!response.ok) {
                const errorData = await response.json();
                mostrarErros([errorData.message || "Erro ao enviar o formulário."]);
            }
        } catch (err) {
            mostrarErros(["Erro ao enviar o formulário. Tente novamente mais tarde."]);
            console.error('Erro:', err.message);
        }
    }
});