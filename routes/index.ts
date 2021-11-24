import app = require("teem");

class IndexRoute {

	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async sobre(req: app.Request, res: app.Response) {
		res.render("index/sobre");
	}

	public async filme_do_dia(req: app.Request, res: app.Response) {
		let filme: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().
			//let total: number = await sql.scalar("SELECT COUNT(*) from filme");

			filme = await sql.query("SELECT nome, ano, diretor, sinopse, genero, subgenero FROM filme");

		});
		
		let opcoes = {
			filme: filme
		};

		res.render("index/filme_do_dia", opcoes);
	}

	public async galeria(req: app.Request, res: app.Response) {
		// Mais para frente iremos melhorar os tipos, para não usar any[] :)
		let filme: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().
			//let total: number = await sql.scalar("SELECT COUNT(*) from filme");

			filme = await sql.query("SELECT idFilme, nome, ano, diretor, sinopse, genero, subgenero FROM filme ORDER BY nome");

		});
		
		let opcoes = {
			filme: filme
		};

		res.render("index/galeria", opcoes);
	}

	


	public async avaliar(req: app.Request, res: app.Response) {
		// Mais para frente iremos melhorar os tipos, para não usar any[] :)
		let filme: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			filme = await sql.query("SELECT idFilme, nome FROM filme ORDER BY nome");

		});
		
		let opcoes = {
			filme: filme
		};

		res.render("index/avaliar", opcoes);
	}


	@app.http.post()
	@app.route.formData()
	public async cadastrarAvaliacao(req: app.Request, res: app.Response){
		// Os dados enviados via POST ficam dentro de req.body
		let avaliacao = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!avaliacao) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!avaliacao.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!avaliacao.nota) {
			res.status(400);
			res.json("Nota inválida");
			return;
		}

		if (!avaliacao.comentario) {
			res.status(400);
			res.json("Comentário inválido");
			return;
		}

		if (!avaliacao.idFilme) {
			res.status(400);
			res.json("idFilme inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO cadastro (nome, nota, comentario, idFilme) VALUES (?, ?, ?, ?)", [avaliacao.nome, avaliacao.nota, avaliacao.comentario, avaliacao.idFilme]);

		});

		res.json(true);
	}
}

export = IndexRoute;
