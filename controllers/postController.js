const dbConnection = require("../data/dbConnection.js")

//------------>^.^<---------INDEX-DB----------------------------------
function index(req, res) {
	console.log(req.query);

	const sqlQuery = "SELECT * FROM posts";
	dbConnection.query(sqlQuery, (error, rows) => {
		console.log("connesso index");
		if (error) {
			return res.status(500).json({ error: "DB error", message: "erore recupero dati dal DB" });
		}

		let results = rows;
		res.json(results);
	})

	// if (req.query.tags) {
	// 	results = posts.filter(post => post.tags.find(tag => tag.toLowerCase() == req.query.tags.toLowerCase()) ? true : false);
	// 	//results = posts.find(post => post.tags.toLowerCase() == req.query.tags.toLowerCase()) ? true : false
	// }

}
//--------------------------SHOW------------------/¨\7-----------------
function show(req, res) {
	const id = Number(req.params.id)

	const sqlQuery = "SELECT * FROM posts WHERE id = ?";
	dbConnection.query(sqlQuery, [id], (error, row) => {
		if (error) {
			return res.status(500).json({ error: "DB error", message: "errore nel recupero dati Db" });
		}
		const result = row;

		if (!result) {
			return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
		}
		res.send(result);
	})

	// const result = posts.find(post => post.id == id)

}
//--------------------------STORE--------(^..^)S----------------------
function store(req, res) {
	console.log(`Vuoi creare un nuovo post`, req.body);
	const idArray = [];
	posts.forEach(post => { idArray.push(post.id); });
	const maxId = Math.max(...idArray)
	console.log("il max id è", maxId);
	const newPost = {
		id: maxId + 1,
		title: req.body.title,
		content: req.body.content,
		image: req.body.image,
		tags: req.body.tags
	}
	posts.push(newPost);
	console.log(posts);
	return res.status(201).json(newPost);

}
//--------------------------UPDATE----->^.^<-------------------------

function update(req, res) {
	const id = Number(req.params.id)
	const result = posts.find(post => post.id == id)

	if (!result) {
		return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
	}
	console.log("risultato", result)
	console.log("Body", req.body)
	result.title = req.body.title;
	result.content = req.body.content;
	result.image = req.body.image;
	result.tags = req.body.tags;

	res.status(200).json(result);
}
//--------------------------MODIFY--------------/¨\7------------
function modify(req, res) {
	const id = Number(req.params.id)
	const result = posts.find(post => post.id == id)

	if (!result) {
		return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
	}
	const allowedParam = ["title", "content", "image", "tags"];
	for (const element of allowedParam) {
		if (req.body[element]) {
			result[element] = req.body[element]
		}
	}
	res.status(200).json(result);
	// res.send(`Vuoi aggiornare (parzialmente) il post numero: ${req.params.id}`);
}
//---------(^..^)S----------DESTROY-DB-----------------------------
function destroy(req, res) {
	const id = Number(req.params.id)
	// const result = posts.find(post => post.id == id)

	// if (!result) {
	// 	return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
	// }
	const sqlQuery = "DELETE FROM posts WHERE id =?";
	dbConnection.query(sqlQuery, [id], (error) => {
		if (error) {
			res.status(500).json({ error: "DB error", message: "errore recupero dati DB " })
		}
		console.log("post eliminato");
		return res.sendStatus(204);
	})
	// console.log(`pizza ${id} eliminata`, posts)
	// posts.splice(posts.indexOf(result), 1);

}


const controllers = {
	index,
	show,
	store,
	update,
	modify,
	destroy
};

module.exports = controllers