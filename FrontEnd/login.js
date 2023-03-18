function ajoutListenerLogIn(){
    const formulaireLogIn = document.querySelector("#login");
    formulaireLogIn.addEventListener("submit", function(event) {
        event.preventDefault();
        const compte = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#password").value
        };
    const chargeUtile= JSON.stringify(compte);
    fetch("http://localhost:5678/api-docs/users/login", {
        method:"POST",
        headers: {"Content_Type": "application/json"},
        body: chargeUtile
    });
    });
}