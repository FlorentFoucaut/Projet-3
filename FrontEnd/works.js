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
// Génération de l'affichage de toute les travaux
genererWorks(works);

// Gestion des boutons

//Bouton de triage d'affichage par defaut
const boutonTrierDefault= document.querySelector(".btn-trier-default");
    boutonTrierDefault.addEventListener("click", function() {
   
        document.querySelector(".gallery").innerHTML="";
        genererWorks(works);
})
//Bouton de triage d'affichage en fonction des catégorie
const boutonTrierCategorie = document.querySelector(".btn-trier-categorie");

boutonTrierCategorie.addEventListener("click", function() {
    const worksOrdonnes = Array.from(works);
    worksOrdonnes.sort(function (a, b){
        return a.categoryId- b.categoryId;
    });
    document.querySelector(".gallery").innerHTML="";
    genererWorks(worksOrdonnes);
    

});