// Ajout du listener sur le button du formulaire 
const loginForm = document.getElementById('login');
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  // Boucle en cas de champs non rempli
  const email =document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (!email || !password) {
    alert('Veuillez remplir une email et/ou un mot de passe');
    return;
  }

 
  const chargeUtile = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
 // Envoie des requêtes à l'api
  fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {"Content-type": "application/json", "accept": "application/json"},
    body: JSON.stringify(chargeUtile)
  })
  .then(res => res.json())
  //Traitement de la réponse de l'API
  .then(response => {
    console.log(response.token);
    if (response.token) {
      alert('Vous êtes maintenant connecté');
      // Redirige vers la page de l'utilisateur
       window.localStorage.setItem("token", response.token); 
       window.location.href = 'user.html';
    
    } else {
      alert('Erreur de connexion');
    }
  })

});