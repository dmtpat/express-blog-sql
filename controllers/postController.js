const posts = require("../data/posts.js")

//------------>^.^<---------INDEX-------------------------------------
function index(req, res) {
	console.log(req.query);
	let results = posts;
	if (req.query.tags) {
		results = posts.filter(post => post.tags.find(tag => tag.toLowerCase() == req.query.tags.toLowerCase()) ? true : false);
		//results = posts.find(post => post.tags.toLowerCase() == req.query.tags.toLowerCase()) ? true : false
	}

	res.json(results);
}
//--------------------------SHOW------------------/¨\7-----------------
function show(req, res) {
	const id = Number(req.params.id)
	const result = posts.find(post => post.id == id)

	if (!result) {
		return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
	}
	res.send(result);
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
//---------(^..^)S----------DESTROY--------------------------------
function destroy(req, res) {
	const id = Number(req.params.id)
	const result = posts.find(post => post.id == id)

	if (!result) {
		return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
	}
	posts.splice(posts.indexOf(result), 1);
	console.log(`pizza ${id} eliminata`, posts)
	return res.sendStatus(204);

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