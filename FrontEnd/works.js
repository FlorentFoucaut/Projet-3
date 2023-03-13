const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Création de la boucle afin d'afficher tous les travaux
for (let i = 0; i < works.length; i++){
// Création de la figure work et ajout des éléments dans cette figure
const newFigure= document.createElement("figure");
newFigure.className = "work";
const imageElement = document.createElement("img");
imageElement.src = works[i].imageUrl;
const titleElement = document.createElement("figcaption");
titleElement.innerText = works[i].title;

//ajout des éléments au parent "work"
newFigure.appendChild(imageElement);
newFigure.appendChild(titleElement);

//integration de la figure work dans la galerie 
const sectionGallery = document.querySelector(".gallery");
sectionGallery.appendChild(newFigure);

}