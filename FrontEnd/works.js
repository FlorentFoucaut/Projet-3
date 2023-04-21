//Recupération du travail sur l'API
const works = await (await fetch("http://localhost:5678/api/works")).json();

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


  //Même principe de fonctionnemnt que la génération travaux en page principale


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
