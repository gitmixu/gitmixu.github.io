# Äänestyssovelluksen käyttötapauskuvaukset #

# Nimi: Äänestyksen valinta
Käyttäjät: user
Laukaisija: user valitsee sivulta halutun äänestyksen
Esiehto: halutun äänestyksen klikkaus
Jälkiehto: äänestyksen tiedot avautuvat
Käyttötapauksen kulku:
    1. user kirjautuu äänestyssovellukseen
    2. user selaa sivua (äänestyksiä)
    3. user valitsee halutun äänestyksen
Poikkeuksellinen toiminta: 
    - jos haluaa äänestää pitää kirjautua

# Nimi: Äänestyksien selaaminen
Käyttäjät: user, admin
Laukaisija: nettisivun avaaminen
Esiehto: nettisivun avaaminen
Jälkiehto: äänestyksien selaus
Käyttötapauksen kulku:
    1. user avaa nettiselaimella Äänestyssovellus-sivun.
    2. user selaa sivulla vaihtoehtoja.
Poikkeuksellinen toiminta:
    - Käyttäjä sulkee sivun.

# Nimi: Kirjautuminen
Käyttäjät: user, admin
Laukaisija: kirjaudu painike
Esiehto: tietojen kirjoittaminen
Jälkiehto: 
    - sivu tunnistaa onko kyseessä admin vai user
    - user pääsee äänestämään
    - admin pääsee lisäämään ja poistamaan äänestyksiä
Käyttötapauksen kulku:
    1. sivun avaaminen selaimella
    2. kirjaudu-painikkeen klikkaus
    3. tietojen kirjaus
    4. kirjautuminen
Poikkeuksellinen toiminta:
    - ilman kirjautumista voi jatkaa sivun selaamista ilman äänestämistä

# Nimi: Poista äänestys
käyttäjät: admin
Laukaisija: poista-painike
Esiehto: kirjautuminen adminina
Jälkiehto: äänestyksen poisto
Käyttötapauksen kulku:
    1. sivun avaaminen selaimella
    2. adminina kirjautuminen
    3. äänestysvaihtoehdon poista-painikkeen klikkaus
    4. poistamisen varmistus
Poikkeuksellinen toiminta:
    - ei adminina kirjautumista, jolloin ei voi hallita äänestyksiä.

# Nimi: Uusi äänestys
käyttäjät: admin
Laukaisija: luo uusi äänestys-painike
Esiehto: kirjautuminen adminina
Jälkiehto: äänestyksen lisäys
Käyttötapauksen kulku:
    1. sivun avaaminen selaimella
    2. adminina kirjautuminen
    3. luo uusi äänestys-painikkeen klikkaus
    4. äänestysvaihtoehdon määrittely
       a. nimi
       b. vaihtoehdot (kuvat (a-c))
Poikkeuksellinen toiminta:
    - ei adminina kirjautumista, jolloin ei voi hallita äänestyksiä.