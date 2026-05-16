window.addEventListener('load', () => {
    
    // Raul Kiyuna - RM569965
    const emailInput = document.getElementById('corporate-email');
    const passwordInput = document.getElementById('login-password');
    const togglePasswordBtn = document.querySelector('.login-toggle-password');
    const loginForm = document.querySelector('.login-form');
    
    const modalTitulo = document.getElementById('modal-dinamico-titulo');
    const txtBtn = document.getElementById('txt-btn');
    const infoContexto = document.getElementById('info-cadastro-contexto');
    const feedbackAlerta = document.getElementById('login-feedback');
    const modalElemento = document.getElementById('exampleModal');
    
    const menuUsuarioContainer = document.getElementById('menu-usuario-container');

    let modoCadastro = false;

    // Rafeal Falche Ferreira Batista dos Santos - RM570526
    function gerenciarEstadoMenu() {
        const usuarioAtivo = sessionStorage.getItem('usuarioLogado');
        
        if (usuarioAtivo) {
            menuUsuarioContainer.innerHTML = `
                <li><span style="color: #00ff7f; padding: 14px 10px; display: block;">👤 ${usuarioAtivo}</span></li>
                <li><a href="#" id="btn-logout" style="color: #ff4d4d; font-weight: bold;">[ Sair ]</a></li>
            `;

            document.getElementById('btn-logout').addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('usuarioLogado'); 
                alert('Você saiu da sua conta.');
                gerenciarEstadoMenu(); 
            });

        } else {
            menuUsuarioContainer.innerHTML = `
                <li>
                    <a href="#" id="menu-login-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Login / Cadastro
                    </a>
                </li>
            `;
        }
    }

    gerenciarEstadoMenu();


    // Vitor Silva Lima da Silva - RM571124
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePasswordBtn.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    function mostrarFeedback(mensagem, tipo) {
        feedbackAlerta.textContent = mensagem;
        feedbackAlerta.className = `alert alert-${tipo}`;
    }

    function fecharModal() {
        const modal = bootstrap.Modal.getInstance(modalElemento);
        if (modal) {
            modal.hide();
        }
    }


    // Bruno Pimentel Nunes - RM572599
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const emailValue = emailInput.value.trim().toLowerCase();
            
            if (emailValue === '') {
                modalTitulo.textContent = "Identifique-se";
                txtBtn.textContent = "Entrar";
                infoContexto.textContent = "Digite seu e-mail para verificar seu status.";
                modoCadastro = false;
                feedbackAlerta.className = "alert d-none";
                return;
            }

            const usuarioExistente = localStorage.getItem(emailValue);

            if (usuarioExistente) {
                modalTitulo.textContent = "Conta Encontrada";
                txtBtn.textContent = "Entrar";
                infoContexto.innerHTML = "Este e-mail <strong>já possui cadastro</strong>. Insira a senha correta para entrar.";
                mostrarFeedback('Atenção: Usuário já cadastrado no sistema!', 'success');
                modoCadastro = false;
            } else {
                modalTitulo.textContent = "Criar sua Conta";
                txtBtn.textContent = "Cadastrar e Entrar";
                infoContexto.innerHTML = "Não encontramos seu e-mail. Defina uma senha para seu <strong>primeiro cadastro</strong>.";
                feedbackAlerta.className = "alert d-none";
                modoCadastro = true;
            }
        });
    }


    // Aquilles Mello Mendonça - RM571465
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailValue = emailInput.value.trim().toLowerCase();
            const passwordValue = passwordInput.value;

            if (!emailValue || !passwordValue) {
                mostrarFeedback('Por favor, preencha todos os campos!', 'danger');
                return;
            }

            const usuarioExistenteRaw = localStorage.getItem(emailValue);

            if (modoCadastro) {
                if (usuarioExistenteRaw) {
                    mostrarFeedback('Erro: Você já possui um cadastro com este e-mail!', 'danger');
                    modalTitulo.textContent = "Conta Encontrada";
                    txtBtn.textContent = "Entrar";
                    modoCadastro = false;
                    return;
                }

                if (passwordValue.length < 4) {
                    mostrarFeedback('Para sua segurança, crie uma senha com pelo menos 4 caracteres.', 'danger');
                    return;
                }

                // 🌟 NOVIDADE: Pergunta o nome de usuário usando o prompt no primeiro cadastro
                let nomeUsuario = "";
                while (!nomeUsuario || nomeUsuario.trim() === "") {
                    nomeUsuario = prompt("Este é seu primeiro acesso! Como gostaria de ser chamado(a)?");
                    
                    if (nomeUsuario === null) {
                        mostrarFeedback('Cadastro cancelado pelo usuário.', 'danger');
                        return; // Cancela o envio do formulário se clicar em "Cancelar"
                    }
                }

                // Cria um objeto para salvar os dados estruturados do usuário
                const dadosUsuario = {
                    senha: passwordValue,
                    username: nomeUsuario.trim()
                };

                // Salva no localStorage convertendo o objeto para string JSON
                localStorage.setItem(emailValue, JSON.stringify(dadosUsuario));
                
                // Armazena o Nome de Usuário na sessão para ser exibido no menu
                sessionStorage.setItem('usuarioLogado', dadosUsuario.username);
                
                mostrarFeedback('Cadastro realizado com sucesso!', 'success');
                
                setTimeout(() => {
                    loginForm.reset();
                    feedbackAlerta.className = "alert d-none";
                    fecharModal();
                    gerenciarEstadoMenu(); 
                    alert(`Bem-vindo! Cadastro de [ ${dadosUsuario.username} ] concluído.`);
                }, 1200);

            } else {
                // VALIDAÇÃO DE LOGIN
                if (!usuarioExistenteRaw) {
                    mostrarFeedback('Erro inesperado: Usuário não encontrado.', 'danger');
                    return;
                }

                // Converte de volta a string JSON para objeto
                const dadosUsuario = JSON.parse(usuarioExistenteRaw);

                // Compara a senha digitada com a senha guardada dentro do objeto
                if (passwordValue === dadosUsuario.senha) {
                    // Armazena o Nome de Usuário (e não o email) para o menu usar
                    sessionStorage.setItem('usuarioLogado', dadosUsuario.username);
                    mostrarFeedback('Acesso autorizado! Entrando...', 'success');
                    
                    setTimeout(() => {
                        loginForm.reset();
                        feedbackAlerta.className = "alert d-none";
                        fecharModal();
                        gerenciarEstadoMenu(); 
                    }, 1000);
                } else {
                    mostrarFeedback('Senha incorreta! Tente novamente.', 'danger');
                    passwordInput.value = '';
                    passwordInput.focus();
                }
            }
        });
    }
});