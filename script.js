window.addEventListener('load', ()) => {
    
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
}

// Aquilles Mello Mendonça - RM571465
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

    // Rafael Falchi Ferreira Batista dos Santos - RM570526
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

    
    // Vitor Silva Lima da Silva - RM571124
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