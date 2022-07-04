"use strict";

const einkaufsliste = {

    eintraege: [],

    eintraege_aufrufen() {
        let gespeicherte_eintraege = JSON.parse(localStorage.getItem('myStorage'));

        if (gespeicherte_eintraege !== null) {
            this.eintraege = gespeicherte_eintraege;
        } else {
            this.eintraege = [];
        }
    },

    eintrag_erfassen() {
        let neuer_eintrag = {
            produkt: document.getElementById('eingabe_produkt').value,
            menge: document.getElementById('eingabe_menge').value,
            einheit: document.getElementById('eingabe_einheit').value,
            aktiv: true
        }
        this.eintraege.push(neuer_eintrag);
    },

    eintraege_speichern() {
        let json = JSON.stringify(this.eintraege);
        localStorage.setItem('myStorage', json);
    },

    html_eintrag_generieren(eintrag, i) {
        let listeneintrag = document.createElement('li');
        listeneintrag.setAttribute('id', i)
        if (eintrag.aktiv == false) {
            listeneintrag.setAttribute('class', 'inaktiv')
        }

        let ausgabe_produkt = document.createElement('span');
        ausgabe_produkt.setAttribute('class', 'ausgabe_produkt');
        ausgabe_produkt.setAttribute('id', i);
        ausgabe_produkt.textContent = eintrag.produkt
        listeneintrag.appendChild(ausgabe_produkt);

        let ausgabe_menge = document.createElement('span');
        ausgabe_menge.setAttribute('class', 'ausgabe_menge');        
        ausgabe_menge.setAttribute('id', i);
        ausgabe_menge.textContent = `${eintrag.menge} ${eintrag.einheit}`
        listeneintrag.appendChild(ausgabe_menge);

        return listeneintrag;
    },

    eintraege_anzeigen() {
        document.querySelectorAll('.einkaufsliste > ul').forEach(function(eintragsliste) {
            eintragsliste.remove();
        })

        let eintragsliste = document.createElement('ul');

        for (let i=0; i < this.eintraege.length; i++) {
            eintragsliste.appendChild(this.html_eintrag_generieren(this.eintraege[i], i))
        }

        document.querySelector('.einkaufsliste').appendChild(eintragsliste);
    },

    eintrag_hinzufuegen() {
        this.eintraege_aufrufen();
        this.eintrag_erfassen();
        this.eintraege_speichern();
        this.eintraege_anzeigen();
        location.reload();
    },

    eintrag_aktiv(id) {
        this.eintraege_aufrufen();
            if (this.eintraege[id].aktiv == true) {
                this.eintraege[id].aktiv = false;
            } else {
                this.eintraege[id].aktiv = true;
            }
        this.eintraege_speichern();
        this.eintraege_anzeigen();
        location.reload();
    },

    liste_aufraeumen() {
        for (let i = this.eintraege.length - 1; i >= 0; i--) {
            if (this.eintraege[i].aktiv == false) {
                this.eintraege.splice(i, 1);
            }
        }
        this.eintraege_speichern();
        location.reload();
    },

    liste_loeschen() {
        localStorage.clear();
        location.reload();
    }
}

// === Einträge beim Start anzeigen === //

einkaufsliste.eintraege_aufrufen();
    if (einkaufsliste.eintraege.length !== 0) {
        einkaufsliste.eintraege_anzeigen();
    }

// === Neuen Eintrag erzeugen === //

document.getElementById('eingabeleiste').addEventListener('submit',(e) => {
        e.preventDefault();
        einkaufsliste.eintrag_hinzufuegen();
        document.getElementById('eingabe_produkt').value = '';
        document.getElementById('eingabe_menge').value = '1';
    })

// === Eintrag Aktiv/Inaktiv === //

document.querySelector('ul').addEventListener('click', (e) => {
        if (e.target !== e.currentTarget) {
            let id = e.target.id;
            einkaufsliste.eintrag_aktiv(id);
        }
        e.stopPropagation();
    }, false);

// === Liste aufräumen === //

document.getElementById('liste_aufraeumen').addEventListener('click',() => {
        einkaufsliste.liste_aufraeumen();
    })

// === Liste löschen === //

document.getElementById('liste_loeschen').addEventListener('click',() => {
        einkaufsliste.liste_loeschen();
    })