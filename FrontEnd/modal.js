let modal = null;
//Création de la fonction permettant d'ouvrir la modale
const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'flex';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};

// Création de la fonction pour fermer la modale (tout l'inverse de l'ouverture de celle ci)
const closeModal = function(e){
    if (modal === null) return;
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null;
};

// Permet de pouvoir cliquer à l'intérieur de la modale sans que ça ne se referme
const stopPropagation = function(e) {
    e.stopPropagation()
}

//Permet de pouvoir cliquer sur le lien pour ouvrir la modale
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

// Permet de fermer la modale avec le bouton Escape (navigation clavier)
window.addEventListener('keydown', function(e){
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

