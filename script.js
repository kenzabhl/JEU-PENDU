const motElement = document.getElementById('mot');
const mauvaisesLettres = document.getElementById('mauvaises-lettres');
const rejouerBtn = document.getElementById('rejouer-bouton');
const popup = document.getElementById('popup-contenue');
const notification = document.getElementById('notification-contenue');
const messageFinal = document.getElementById('message-final');

const figurePartie = document.querySelectorAll('.figure-partie');

const mots = [ "angle", "armoire", "banc", "bureau", "cabinet", "carreau", "chaise", "classe", "coin", "couloir", "dossier", "eau", "aller", 
"amener", "apporter", "appuyer", "attendre", "bosser",  "dormir","absent", "assis", "haut", "crayon", "stylo", "feutre",  "trompette", "voix",
"xylophone", "attention", "camarade","mensonge","madame","frite", "gobelet", "jambon", "poulet", "radis", "restaurant","aigle", "animaux", "aquarium",  
"cerf", "chouette", "cigogne", "crocodile", "dauphin", "girafe", "hibou", "hippopotame", "kangourou", "lion", "loup", "ours", "panda", "panthère",
"perroquet", "phoque", "renard", "requin", "singe", "tigre"];


// Sélectionne un mot aléatoirement 

let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

const bonnesLettresTableau = [];
const mauvaisesLettresTableau = [];


// Afficher le mot cacher 

function afficherMot() {
  motElement.innerHTML = `
  ${motSelectionne
.split('')
.map(
    lettre => `<span class="lettre">
    ${bonnesLettresTableau.includes (lettre)
    ? lettre : ''} </span>`
)
.join('')}`;

const motCache = motElement.innerText.replace (/\n/g, '');

if (motCache === motSelectionne) {
    messageFinal.innerText = "BRAVO TU AS GANGE + !";
    popup.style.display = 'flex';
}

}


// Mauvaises Lettres

function updateMauvaiseLettres() {
    mauvaisesLettres.innerHTML = `
    ${mauvaisesLettresTableau.map (lettre => `<span> ${lettre} </span>`)}`




// Afficher le bonhomme 



figurePartie.forEach((partie, index) => {
     const erreurs = mauvaisesLettresTableau.length;

    if (index < erreurs) {
        partie.style.display = 'block';
    } else {
        partie.style.display = 'none';
    }

    })


    // Vérifier si on a perdu 


if(mauvaisesLettresTableau.length === figurePartie.length) {
    messageFinal.innerText = 'MALHEUREUSEMENT TU AS PERDU ¥ !'
    popup.style.display = 'flex';
}



}


// Afficher la notification 

function afficherNotification() {
    notification.classList.add('afficher');
    setTimeout (()=> {
        notification.classList.remove('afficher')
    }, 2000);
}


// EVENT LISTENERS

window.addEventListener('keydown', event => {
  

    if (event.keyCode >= 65 && event.keyCode <= 90) {

        const lettre = event.key;


        if(motSelectionne.includes(lettre)) {

        if (!bonnesLettresTableau.includes(lettre)) {
            bonnesLettresTableau.push(lettre);

            afficherMot()


        } else {
            afficherNotification();
        }



        } else {
            if (!mauvaisesLettresTableau.includes(lettre)) {
                mauvaisesLettresTableau.push(lettre);

                updateMauvaiseLettres();

            } else {
                afficherNotification();
            }
        }
    }

  });
  

// REJOUER ET REDEMARRER


rejouerBtn.addEventListener('click', () =>{

    bonnesLettresTableau.splice(0);
    mauvaisesLettresTableau.splice(0);

    motSelectionne = mots[Math.floor(Math.random() * mots.length)];

    afficherMot();

    updateMauvaiseLettres();

    popup.style.display = 'none';

})

afficherMot();





