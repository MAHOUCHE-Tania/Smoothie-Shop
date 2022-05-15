let structureProduits = "";
  
function affichageProduits(response){
    
    const element1 = document.querySelector(".produits");
    // Affichage de tous les élements (produits disponibles)
    for (let i=0; i < response.length; i++){
        // Création de l'élement HTML
        structureProduits = structureProduits +  `
        <a>
            <div class="mise-en-page-produits>
                <div class="image-smoothie">
                    <img src="${(response[i].img_src)}">
                </div>

                <div class="produits">
                    <ul>
                        <li>${response[i].nom}</li>
                        <li>${response[i].description}</li>
                        <li>${response[i].unit_price}€</li>
                    </ul>
                    <button id="button" onclick=ajout_au_panier(${i})>Ajouter au panier</button> 
                </div>
            </div>
        </a>`;
        // Ajout de l'HTML
        element1.innerHTML = structureProduits;        
    }  
   // Affichage du nombre de produit à coté du lien panier
  NombreProduitDansLePanier = document.getElementById('NombreProduitDansLePanier')
  produitEnlocalStorage = JSON.parse(localStorage.getItem("produit"));
  NombreProduitDansLePanier.innerText = ''
  if ((produitEnlocalStorage != []) || (produitEnlocalStorage != null)) {
      NombreProduitDansLePanier.innerText = produitEnlocalStorage.length
  }
}

    // Ajout du produit au panier
function ajout_au_panier(indice_produit){
    var somme ;
    var produitEnlocalStorage = JSON.parse(localStorage.getItem("produit"));
    NombreProduitDansLePanier = document.getElementById('NombreProduitDansLePanier')
    if (produitEnlocalStorage == null) {
        produitEnlocalStorage = [response[indice_produit]];
        localStorage.setItem("somme", JSON.stringify(response[indice_produit].unit_price));
        NombreProduitDansLePanier.innerText = 1
    }else {
        produitEnlocalStorage.push(response[indice_produit]);
        somme = parseInt(localStorage.getItem("somme"), 10);
        localStorage.setItem("somme", somme + response[indice_produit].unit_price);
        NombreProduitDansLePanier.innerText = produitEnlocalStorage.length
    }
    localStorage.setItem("produit", JSON.stringify(produitEnlocalStorage));
}
