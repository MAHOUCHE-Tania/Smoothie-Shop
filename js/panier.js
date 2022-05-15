// Récuperation du produit stocké dans le local storage
let ProduitPresentDansLeLocalStorage = JSON.parse(localStorage.getItem("produit"))



//*****************   Affichage des produits du panier   ****************************

const elemnt2 = document.querySelector("#container-produits-panier");
console.log(elemnt2);

// si le panier est vide : afficher le panier est vide
if (ProduitPresentDansLeLocalStorage == null){
        elemnt2.innerHTML = `
        <div class="container-panier-vide">
            <div> Le panier est vide </div>
        </div>
    `;
} else {
    // si le panier n'est pas vide : ajouter les produit du panier à l'HTML pour les afficher
    let structureProduitPanier = [];

    for(k = 0;k < ProduitPresentDansLeLocalStorage.length;k++ ){
        console.log("il y'a " + ProduitPresentDansLeLocalStorage.length + " elements")
        structureProduitPanier = structureProduitPanier + `
        <div id="container-récapitulatif">
            <div>${ProduitPresentDansLeLocalStorage[k].nom}   
            <div>Prix: ${ProduitPresentDansLeLocalStorage[k].unit_price} 
            <button id="${k}"class="btn-supprimer" onclick="SuprimmerProduit(this.id)" >Supprimer l'article</div>
        </div>`};
        if ((ProduitPresentDansLeLocalStorage != null) && (k == ProduitPresentDansLeLocalStorage.length)){
            elemnt2.innerHTML = structureProduitPanier; 
        }    
}
// *************************     SUPPRESSION     ***************************

// Fonction de suppression d'un produit du panier, la fonction est exécutée lorsque le bouton Supprimer l'article est cliqué.

function SuprimmerProduit(indiceProduitSupprimer){
    ProduitPresentDansLeLocalStorage = JSON.parse(localStorage.getItem("produit"))
    const index_of_element_to_delete = parseInt(indiceProduitSupprimer, 10);
    var somme = parseInt(localStorage.getItem("somme"), 10) - ProduitPresentDansLeLocalStorage[index_of_element_to_delete].unit_price;
    localStorage.setItem("somme", somme);

    if (indiceProduitSupprimer == 0){
        ProduitPresentDansLeLocalStorage.shift()
    }else {
        ProduitPresentDansLeLocalStorage.splice(index_of_element_to_delete,index_of_element_to_delete);
    }
    localStorage.setItem("produit", JSON.stringify(ProduitPresentDansLeLocalStorage));
    window.location.href="panier.html";
} 

// ********************    LE MONTANT TOTAL     ***************************
// Déclaration de la variable pour pouvoir y mettre la somme des prix des produits présent dans le panier

var somme = localStorage.getItem("somme");
if (somme == null) {
    somme = 0;
}
console.log(" Somme: "+ somme);

// Affichage de la somme
const affichageprixhtml = `
<div class="affichage-prix-html"> Le prix total à payer: ${somme} €</div>  
 `
elemnt2.insertAdjacentHTML("beforeend",affichageprixhtml);


// Génération d'un formulaire de commande pour que l'utilisateur puisse renseigner ses informations
const afficheformulaire = () => {
    const elemnt3 = document.querySelector("#container-produits-panier");

    const structureformulaire = `
        <div id="formulaire">
           <h2>Remplissez le formulaire pour valider la commande:</h2> 
    
            <form>
                <label for="prenom">Prénom :</label>
                <input type="texte" id="prenom" name="prenom" required> 

                <label for="Nom">Nom :</label>
                <input type="texte" id="Nom" name="prenom" required> 

                <label for="adresse">adresse :</label>
                <input type="texte" id="adresse" name="prenom" required> 

                <label for="code postal">code postal :</label>
                <input type="texte" id="code postal" name="prenom" required> 

                <label for="n° bancaire">n° bancaire :</label>
                <input type="texte" id="n° bancaire" name="prenom" required> 
            
                <button id="envoyerFormulaire"
                type="submit"
                name="envoyerFormulaire">Confirmer</button>
            </form>
         </div>`;
        // Ajout de l'html
    elemnt3.insertAdjacentHTML("afterend", structureformulaire);
}; 


//Affichage du formulaire
afficheformulaire();  


// Sélection du bouton envoyer
const btnenvoyer = document.querySelector("#envoyerFormulaire");


// Validation de la commande : ajout d'un evenement click au bouton Confirmer, pour valider la commande. 
btnenvoyer.addEventListener("click",()=>{
    // Récupération des valeurs et les mettre dans le local storage
    localStorage.setItem("prenom",document.querySelector("#prenom").value);    
    console.log(document.querySelector("#prenom").value);
    localStorage.setItem("nom",document.querySelector("#nom").value);    
    console.log(document.querySelector("#nom").value);
    localStorage.setItem("adresse",document.querySelector("#adresse").value);    
    console.log(document.querySelector("#adresse").value);
    localStorage.setItem("code postal",document.querySelector("#code postal").value);    
    console.log(document.querySelector("#code postal").value);
    localStorage.setItem("num bancaire",document.querySelector("#num bancaire").value);    
    console.log(document.querySelector("#num bancaire").value);
});
