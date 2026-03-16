# express-blog-sql

Prendiamo le API precedentemente create per il vostro blog ed aggiungiamo la persistenza tramite la connessione a un DB
## PT 1

### MILESTONE 1
1. Importiamo il db in allegato su MySQL Workbench

2. Installiamo il client mysql2 con npm i mysql2 nell’app Express

3. Creiamo un file di configurazione per connettere il database 

4. Inseriamo un console.log nella logica di connessione e proviamo ad avviare l’applicazione per verificare che non ci siano errori.

### MILESTONE 2
1. Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON 

2. Verifichiamo su Postman che la risposta sia corretta


### MILESTONE  3
1. Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database

2. Verifichiamo su Postman che la chiamata non dia errore e risponda 204

3. Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso

### BONUS
- Facciamo sì che l’API di SHOW restituisca il post desiderato in formato JSON
- Verifichiamo su Postman che la risposta sia corretta

## PT 2

- create un metodo di show che restituisca il singolo post
- aggregate in show anche i dati relativi ai tag
- scrivete il metodo di create
- scrivete il metodo di update

### Bonus
- index con filtro per i tags
- delete con 404
- insert/update che restituiscono l'oggetto in questione
- mysql2 con promise