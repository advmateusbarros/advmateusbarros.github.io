var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Verifica se há uma preferência de tema no armazenamento local ou de acordo com a preferência do sistema
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // Alterna os ícones dentro do botão
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // Verifica se a preferência foi definida via armazenamento local anteriormente
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            // Se estiver no tema claro, aplica o tema escuro e registra a preferência
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            // Se estiver no tema escuro, aplica o tema claro e registra a preferência
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // Se a preferência NÃO foi definida via armazenamento local anteriormente
    } else {
        // Alterna o tema de acordo com a presença da classe 'dark'
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

    // Exibe uma mensagem relevante ao contexto jurídico após a troca de tema
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('theme-change-message');
    statusMessage.innerHTML = document.documentElement.classList.contains('dark') 
        ? 'O tema escuro foi ativado, como um aviso judicial de seriedade e profissionalismo.' 
        : 'O tema claro foi ativado, refletindo a clareza e transparência jurídica.';
    document.body.appendChild(statusMessage);

    // Remova a mensagem após um tempo
    setTimeout(() => {
        statusMessage.remove();
    }, 5000);
});
