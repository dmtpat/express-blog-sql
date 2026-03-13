
function errorHandler(err, req, res, next) {

    res.status(500).json({ error: "Si è verificato un errore", message: err.message })

}
module.exports = errorHandler;