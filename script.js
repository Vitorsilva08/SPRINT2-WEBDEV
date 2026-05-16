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