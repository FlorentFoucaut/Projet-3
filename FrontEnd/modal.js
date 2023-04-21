const works = await (await fetch("http://localhost:5678/api/works")).json();
//Création de la fonction qui supprimera un travaux selectionné en mode admin
async function supprimerWork(id) {
    await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
     
  }


function genererWorksModal(works) {
    // Création de la boucle afin d'afficher tous les travaux
        for (let i = 0; i < works.length; i++){
    // Création de la figure work et ajout des éléments dans cette figure
    const newFigureModal= document.createElement("figure");
    newFigureModal.className = "workModal";
    const buttonElementModal = document.createElement("button");
    buttonElementModal.innerHTML='<i class="fa-solid fa-trash-can"></i>';
    const imageElementModal = document.createElement("img");
    imageElementModal.src = works[i].imageUrl;
    const titleElementModal = document.createElement("figcaption");
    titleElementModal.textContent = "éditer";
    
    
    
    
    //ajout des éléments au parent figure "workModal"
    newFigureModal.appendChild(buttonElementModal);
    newFigureModal.appendChild(imageElementModal);
    newFigureModal.appendChild(titleElementModal);
    
    
    //integration de la figure work dans la galerie 
        const sectionGalleryModal = document.querySelector(".gallery-modal");
        sectionGalleryModal.appendChild(newFigureModal);
    
        //Rendu de l'éfficacité du bouton en ajoutant le listener
        buttonElementModal.addEventListener("click", function () {
            const id = works[i].id;
            supprimerWork(id);
            newFigureModal.remove();
          });
        }
    
        const clearGallery = document.querySelector("#supp");
        clearGallery.addEventListener("click", function () {
          const galleryModal = document.querySelector(".gallery-modal");
          galleryModal.innerHTML = "";
          const galleryIndex = document.querySelector(".gallery")
          galleryIndex.innerHTML = "";
          for (let i = 0; i < works.length; i++) {
            const id = works[i].id;
            supprimerWork(id);
          }
        });
      }


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
const openModal = async function(e) {
    e.preventDefault();
    const works = await (await fetch("http://localhost:5678/api/works")).json();
    genererWorksModal(works);
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


const newWorkForm = document.querySelector(".form-wrapper-modal");
newWorkForm.addEventListener('submit', function(event) {
    event.preventDefault();
// Recupération des données entrées dans le formulaire
    const imageUrl = document.querySelector("#imageUrl").files[0];
    const title = document.querySelector("#title").value;
    const categoryId = document.querySelector("#categoryId").value;

    // Boucle en cas de champs non rempli
    if(!imageUrl || !title || !categoryId){
        alert('Veuillez remplir tous les champs');
        return;
    }

    // Création du formData pour réunir toutes les données afin de l'envoyer à l'API
    const formData = new FormData();
    formData.append("imageUrl", imageUrl);
    formData.append("title", title);
    formData.append("category", categoryId);

    //Envoi à l'API avec l'autorisation du token
    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        },
        body: formData
    })
    .then(res => res.json())
    .then(response => console.log(response))
    .catch(error => console.error(error));
});

