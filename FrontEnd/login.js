// Ajout du listener sur le button du formulaire 
const loginForm = document.getElementById('login');
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  // Récupération de l'email et du mot de passe
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Boucle en cas de champs non rempli
  const email = emailInput.value;
  const password = passwordInput.value;
  if (!email || !password) {
    alert('Veuillez remplir une email et/ou un mot de passe');
    return;
  }

 
  const chargeUtile = {
    email: email,
    password: password
  };
 // Envoie des requêtes à l'api
  fetch('http://localhost:5678/api-docs/users/login', {
    method: 'POST',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify(chargeUtile)
  })
  //Traitement de la réponse de l'API
  .then(response => {
    if (response.ok) {
      alert('Vous êtes maintenant connecté');
      // Redirige vers la page de l'utilisateur
      window.location.href = 'user.html';
    } else {
      alert('Erreur de connexion');
    }
  })

});