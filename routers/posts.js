const express = require('express');
const router = express.Router();
const posts = require("../data/posts.js")

const postsController = require("../controllers/postController.js");
const checkParam = require('../middlewares/checkParam.js');

router.use('/:id', checkParam)


//index (cRud)
router.get('/', postsController.index)

//Show (cRud)
router.get('/:id', postsController.show)

//Store (Crud)
//Il verbo POST serve a aggiungere una nuova Entità Centrale
router.post('/', postsController.store)

//Update (crUd)
//Il verbo PUT serve a sostituitre una Entità con una completamente nuova
router.put('/:id', postsController.update)

//Modify (crUd)
//Il verbo PATCH serve a "pachare", modivicare il parte l'Entità
router.patch('/:id', postsController.modify)

//Destroy (cruD)
// il verbo DELETE serve a eliminare una Entità
router.delete('/:id', postsController.destroy)

module.exports = router;
