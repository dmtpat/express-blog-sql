
function notFound(req, res, next) {

    console.log("middleware di not found");
    res.status(404).json({ error: "si è verificato un errore", message: "404 Page not found" })
}
module.exports = notFound