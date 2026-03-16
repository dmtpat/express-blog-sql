const dbConnection = require("../data/dbConnection.js")

//------------>^.^<---------INDEX-DB----------------------------------
function index(req, res) {
	console.log(req.query);
	const tagIdArray = [];
	let sqlQuery = "SELECT * FROM posts";

	const tagsQuery = "SELECT id FROM blog_db.tags WHERE label= ?";
	if (req.query) {
		dbConnection.query(tagsQuery, [req.query.tags], (error, rows) => {
			if (error) {
				return res.status(500).json({ error: "DB error", message: "erore recupero dati tags dal DB" });
			}
			console.log(rows[0].id);
			tagIdArray.push(rows[0].id);
			sqlQuery = `SELECT posts.*
				FROM blog_db.post_tag
				JOIN posts
				ON post_tag.post_id= posts.id
				WHERE tag_id = ?;
			`;
			dbConnection.query(sqlQuery, tagIdArray, (error, rows) => {
				console.log("connesso index");
				if (error) {
					return res.status(500).json({ error: "DB error", message: "erore recupero dati dal DB" });
				}

				let results = rows;

				console.log(results)
				if (!results) {
					return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
				}
				res.json(results);
			})
		})
	} else {

		dbConnection.query(sqlQuery, (error, rows) => {
			console.log("connesso index");
			if (error) {
				return res.status(500).json({ error: "DB error", message: "erore recupero dati dal DB" });
			}

			let results = rows;

			console.log(results)
			if (!results) {
				return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
			}
			res.json(results);
		})
	}



	// if (req.query.tags) {
	// 	results = posts.filter(post => post.tags.find(tag => tag.toLowerCase() == req.query.tags.toLowerCase()) ? true : false);
	// 	//results = posts.find(post => post.tags.toLowerCase() == req.query.tags.toLowerCase()) ? true : false
	// }

}
//--------------------------SHOW-DB---------------/¨\7-----------------
function show(req, res) {
	const id = Number(req.params.id)

	const sqlQuery = "SELECT * FROM posts WHERE id = ?";
	const paramsArray = [id]


	dbConnection.query(sqlQuery, paramsArray, (error, row) => {
		if (error) {
			return res.status(500).json({ error: "DB error", message: "errore nel recupero dati Db" });
		}
		console.log(row);
		if (row.length == 0) {
			return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
		}
		const results = row[0];
		const sqlQuery = `SELECT tags.label as "tags"
			FROM post_tag
			JOIN tags
			ON post_tag.tag_id= tags.id
			WHERE post_tag.post_id = ?
		`;

		dbConnection.query(sqlQuery, paramsArray, (error, row) => {
			if (error) {
				return res.status(500).json({ error: "DB error", message: "errore nel recupero dati Db" });
			}
			console.log(row);
			const tags = row.map(tag => tag.tags)
			console.log(tags)
			results.tags = tags
			console.log(results)
			res.send(results);
		});
	})
	// const result = posts.find(post => post.id == id)

}
//--------------------------STORE-DB-----(^..^)S----------------------
function store(req, res) {
	console.log(`Vuoi creare un nuovo post`, req.body);
	const sqlQuery = "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)";
	const paramsArray = [req.body.title, req.body.content, req.body.image];

	dbConnection.query(sqlQuery, paramsArray, (error, rows) => {
		if (error) {
			return res.status(500).json({ error: "DB Error", message: "Errore nel DB" });
		}
		console.log(rows.insertId);
		dbConnection.query("SELECT * FROM posts WHERE id = ?", rows.insertId, (error, row) => {

			const results = row[0];
			return res.status(201).json(results);
		})


	});
}
//--------------------------UPDATE-DB-->^.^<-------------------------

function update(req, res) {
	const id = Number(req.params.id)
	const sqlQuery = `UPDATE posts
		SET title = ?, content = ?, image = ?
		WHERE id= ?
	`;
	const paramsArray = [req.body.title, req.body.content, req.body.image, id];

	dbConnection.query(sqlQuery, paramsArray, (error, rows) => {
		if (error) {
			return res.status(500).json({ error: "DB Error", message: "Errore nel DB" });
		}
		dbConnection.query("SELECT * FROM posts WHERE id = ?", [id], (error, row) => {
			if (row.length == 0) {
				return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
			}
			const results = row[0];
			return res.status(200).json(results);
		})
	});


	// if (!result) {
	// 	return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
	// }
	// console.log("risultato", result)
	// console.log("Body", req.body)
	// result.title = req.body.title;
	// result.content = req.body.content;
	// result.image = req.body.image;
	// result.tags = req.body.tags;

	// res.status(200).json(result);
}
//--------------------------MODIFY-DB-----------/¨\7------------
function modify(req, res) {
	const id = Number(req.params.id)
	// const result = posts.find(post => post.id == id)

	const allowedParam = ["title", "content", "image"];

	const paramsArray = [];
	const queryModule = [];
	for (const element of allowedParam) {
		if (req.body[element]) {
			queryModule.push(`${element} = ?`);
			paramsArray.push(req.body[element]);
		}
	}
	const sqlQuery = `UPDATE posts SET ${queryModule.join(", ")} WHERE id = ?`;
	paramsArray.push(id);
	console.log("sql Query", sqlQuery);
	console.log("paramsArray", paramsArray)
	dbConnection.query(sqlQuery, paramsArray, (error, rows) => {
		if (error) {
			return res.status(500).json({ error: "DB Error", message: "Errore nel DB" });
		}
		dbConnection.query("SELECT * FROM posts WHERE id = ?", [id], (error, row) => {
			if (row.length == 0) {
				return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
			}
			const results = row[0];
			return res.status(200).json(results);
		})
	})

}
//---------(^..^)S----------DESTROY-DB-----------------------------
function destroy(req, res) {
	const id = Number(req.params.id)
	// const result = posts.find(post => post.id == id)

	// if (!result) {
	// 	return res.status(404).json({ error: "Not Found", message: "Post non trovato" })
	// }
	const sqlQuery = "DELETE FROM posts WHERE id =?";
	dbConnection.query(sqlQuery, [id], (error, rows) => {
		if (error) {
			res.status(500).json({ error: "DB error", message: "errore recupero dati DB " })
		}
		console.log("post eliminato");
		console.log(rows);
		if (rows.affectedRows == 0) {
			return res.status(404).json({ error: "Not Found", message: " Post NOT FOUND" })
		}
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