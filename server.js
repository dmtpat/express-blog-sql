
const express = require('express')

const app = express();
const port = 3000;

//importo le rotte dal file delle rotte per le Entità Posts
const postsRouter = require('./routers/posts');

//importo i middlewares dalla cartella dei middlewares
const notFound = require("./middlewares/notFound")
const errorsHandler = require("./middlewares/errorsHandler");
const reqInfo = require('./middlewares/requestInfo');


app.use(express.static('public'));
app.use(express.json());
app.use(reqInfo);

app.get('/', (req, res) => {
    console.log("Ecco la prima chiamata!");
    res.send("Server del mio blog");// invia una risposta alla richiesta per la rotta di base '/'
    //res.json(posts);
})

//applico l'uso delle rotte importate da routere imposto il prefisso come da standard REST
app.use("/posts", postsRouter);

app.use(notFound);
app.use(errorsHandler);

app.listen(port, () => {
    console.log("la chiamata è stata accettata")
})