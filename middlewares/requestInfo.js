
function reqInfo(req, res, next) {

    console.log({
        date: new Date().toLocaleString(),
        method: req.method
    });

    next()

}
module.exports = reqInfo;