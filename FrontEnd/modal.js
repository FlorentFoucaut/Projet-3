

//Modification de la page passage admin après connexion

let token= window.localStorage.getItem("token")
function userPage(){
    if(token !== null){
      const edition = document.querySelector("#edition");
      edition.style.display ='flex';
      document.querySelector("#log").textContent = "logout";
      const modif= document.querySelectorAll(".modif");
      for (let i = 0; i < modif.length; i++) {
        modif[i].style.display = 'inline-block';
      }
      const removeFilter=document.querySelector("#filters");
      removeFilter.style.display='none';
    
    }else{
        document.querySelector("#log").textContent = "login";
    }
    
    };
    userPage();
    
    // Click de redirection pour se connecter ou se deconnecter
    const connect = document.getElementById("log");
    connect.addEventListener('click', function(e) {
        e.preventDefault();
        if(token !== null){
            alert('Déconnexion vous allez être redirigé.');
            window.localStorage.removeItem("token")
            window.location.href='index.html';
        } else {
            window.location.href ='login.html';
        }
    });

let modal = null;
//Création de la fonction permettant d'ouvrir la modale
const openModal = function(e) {
    e.preventDefault();
    const target = document.querySelector('#modal1');
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


window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
    console.log(event.target)
  } 

const ajoutButtonPhoto = document.querySelector('#modal1 button');
// Fonction pour changer l'affichage des modales
const switchModals = function(e) {
    e.preventDefault();

   closeModal(e);

    const target = document.querySelector('#modal2');
    target.style.display = 'flex';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

// Fonction pour changer l'affichage des modales pour retourner à la modale 1
const backModal = function(e) {
    e.preventDefault();

    closeModal(e);

    openModal(e);
}
// Permet de pouvoir cliquer à l'intérieur de la modale sans que ça ne se referme
const stopPropagation = function(e) {
    e.stopPropagation()
}
//Permet de pouvoir cliquer sur le lien pour ouvrir la modale
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
});

//Permet de pouvoir cliquer sur la flèche pour ouvrir la modale 1
document.querySelectorAll('.js-back-modal').forEach(a => {
    a.addEventListener('click', backModal);
});

// Permer de faire le switch entre les modales lorque l'on clique sur le bouton ajouter photo
ajoutButtonPhoto.addEventListener('click', switchModals);

// Permet de fermer la modale avec le bouton Escape (navigation clavier)
window.addEventListener('keydown', function(e){
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
});

//Fonction permettant de desactivé le bouton les conditions ne sont pas remplie
const form = document.querySelector('.form-wrapper-modal');
const submitButton = form.querySelector('input[type="submit"]');

// Bouton desactivé initialement
submitButton.disabled = true;

//Eventlistener pour changer d'état
form.addEventListener('change', () => {
  // Vérification si tous les champs obligatoires sont remplis
  const imageUrlInput = form.querySelector('#imageUrl');
  const titleInput = form.querySelector('#title');
  const categoryIdInput = form.querySelector('#categoryId');

  if (imageUrlInput.value && titleInput.value && categoryIdInput.value) {
    submitButton.disabled = false;
    submitButton.style.backgroundColor ='#1D6154';
  } else {
    submitButton.disabled = true;
    submitButton.style.backgroundColor ='#A7A7A7';
  }
});




