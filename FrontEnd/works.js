//Recupération du travail sur l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//Création d'une fonction qui regroupe tout le necessaire afin de créer une carte de work
function genererWorks(works) {
// Création de la boucle afin d'afficher tous les travaux
    for (let i = 0; i < works.length; i++){
// Création de la figure work et ajout des éléments dans cette figure
    const newFigure= document.createElement("figure");
    newFigure.className = "work";
    const imageElement = document.createElement("img");
    imageElement.src = works[i].imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works[i].title;

//ajout des éléments au parent figure "work"
    newFigure.appendChild(imageElement);
    newFigure.appendChild(titleElement);

//integration de la figure work dans la galerie 
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(newFigure);

    }
}
// Génération de l'affichage de tous les travaux
genererWorks(works);

//Création de la fonction qui supprimera un travaux selectionné en mode admin
function supprimerWork(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
  }

  //Même principe de fonctionnemnt que la génération travaux en page principale
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
// Génération de l'affichage de tous les travaux
genererWorksModal(works);

//Prévisualisation de l'image
const image_input = document.querySelector("#imageUrl");
var uploaded_image = "";

image_input.addEventListener("change", function(){
    const reader=new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("#display-image").style.display ='block';
        document.querySelector("#display-image").style.backgroundImage=`url(${uploaded_image})`;
        document.querySelectorAll(".js-display").forEach(element => element.style.display='none');

    });
    reader.readAsDataURL(this.files[0]);
});

// Faire fonctionner les boutons
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



// Gestion des boutons
//Récupération des catégories sur l'API
const reponseCat= await fetch ("http://localhost:5678/api/categories")
const categories = await reponseCat.json();

//Bouton de triage d'affichage par defaut
const boutonTrierDefault= document.querySelector(".btn-trier-default");
    boutonTrierDefault.addEventListener("click", function() {
   
        document.querySelector(".gallery").innerHTML="";
        genererWorks(works);
})

//fonction pour générer les filtres dynamiquement
function genererFiltres(categories){
    for (let i = 0; i < categories.length; i++){
        const buttonTrier= document.createElement("button");
        buttonTrier.className="js-trier";
        buttonTrier.innerText= categories[i].name;
        
        const sectionFilters= document.querySelector("#filters");
        sectionFilters.appendChild(buttonTrier);
    }
}
genererFiltres(categories);
// Fonction pour faire fonctionner les boutons afin de trier par catégorie
function filtresTriage() {
const boutonTrier = document.querySelectorAll(".js-trier");
boutonTrier.forEach(element => element.addEventListener("click", function() {
    const filtresCat = works.filter(data => data.category.name == element.innerText)
    
   
    document.querySelector(".gallery").innerHTML="";
    genererWorks(filtresCat);
    }));
}

filtresTriage(categories);
