# express-blog-routing

## PT I

Creare un file di routing `(routers/posts.js)` che conterrà le rotte necessario per l'entità `post`.

All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete)

Tutte le risposte saranno dei testi che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST.
Ad esempio: 
- Se viene chiamata /posts col verbo GET ci aspettiamo “Lista dei post”;
- Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo “Cancellazione del post 1”
- e via dicendo…

Registrare il router dentro `app.js` con il prefisso `posts/`.

### NOTE 
Avete anche l’array dei post che vi abbiamo fornito, salvatelo da qualche parte.
Ci servirà per i prossimi step.
Per oggi vi può servire in caso vogliate provare i bonus.

### BONUS 🎁 
- Provare a restituire la lista dei post dalla rotta index, in formato `json`
- Provare a restituire un singolo post dalla rotta show, sempre in formato `json`

---
---
## PT II

### MILESTONE 1
1. Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers 

    - All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi). 

2. Poi torniamo sul file delle rotte. Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.

3. Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima. 

4. Se tutto funziona, passiamo alla prossima milestone

### MILESTONE 2
1. Per iniziare, creiamo una cartella data  in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato.  Importiamo questo file in cima al controller. 

2. Ora passiamo ad implementare le logiche delle nostre CRUD:

    - Index dovrà restituire la lista dei post in formato JSON
    - Show dovrà restituire un singolo post in formato JSON
    - Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.

### BONUS
- Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
- In Show e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.

---
---

## PT III

### MILESTONE 1
Per iniziare, andiamo su Postman e prepariamo una nuova chiamata verso la nostra rotta store. 
- Impostiamo il verbo e l’endpoint corretti
- Selezioniamo il tab body e scegliamo il formato raw e JSON
- Inseriamo come corpo della nostra request un oggetto che rappresenti un nuovo post

Nota: 
se vogliamo avere delle immagini, inventiamole pure. 
Nota: 
ricordiamo che non bisogna passare l’id quando si crea una nuova risorsa: sarà il server (con l’aiuto del database) a fornirlo.

### MILESTONE 2
Impostiamo il body-parser per far sì che la nostra app riesca a decifrare il request body.
Poi, all’interno della rotta Store, stampiamo nel terminale i dati in arrivo, grazie a un console.log 

### MILESTONE  3
Implementiamo quindi la logica per aggiungere un nuovo post al nostro blog, e prepariamo la risposta adeguata.
Testiamolo con postman con due chiamate: store e poi index per verifica.

### MILESTONE 4
Ripetiamo il procedimento per la rotta di Update, in modo da avere la possibilità di modificare le nostre risorse. 

### BONUS
- Quelli del giorno prima, se non già fatti
- In Update, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.
- Provate a inventarvi qualche controllo di validazione. Ad esempio un errore se il titolo non ha almeno 3 caratteri o se una certa proprietà è assente.
In Create provare a recuperare l'id più alto esistente, non l'ultimo
- Provate a modificare il controller per fare un unico export di oggettone (v. mia repo)
Nota: 
i bonus sono appunto attività extra da svolgere se avete finito tutto e volete dilettarvi ulteriormente ⚠️ ce ne sono molti, in ordine di importanza (secondo me): voi partite da quelli che vi interessano di più

---
---

## PT IV

Dopo aver completato tutte le operazioni CRUD, completiamo le nostre API inserendo un middleware per la gestione delle rotte non registrate e uno per la gestione degli errori.

- Se viene chiamato un endpoint inesistente, un middleware dovrà rispondere un messaggio e uno status appropriato.
- Se viene generato un errore, un middleware si occuperà di rispondere con un messaggio e uno status appropriato.

### BONUS
Sperimentare con un vostro middleware che si occupi di intercettare richieste, loggare ora/metodo/rotta o fare qualunque cosa vi venga in mente.
