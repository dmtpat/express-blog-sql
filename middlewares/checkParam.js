
function checkParam(req, res, next) {

    const id = Number(req.params.id)
    console.log("Middleware di check param in funzione!")
    if (isNaN(id)) {
        return res.status(400).json({ error: "User Error", message: "Id non valido" })
    }
    next();

}
module.exports = checkParam;