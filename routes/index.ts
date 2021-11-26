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

		avaliacao.nota = parseInt(avaliacao.nota);
		if (isNaN(avaliacao.nota) || avaliacao.nota < 0 || avaliacao.nota > 5) {
			res.status(400);
			res.json("Nota inválida");
			return;
		}

		if (!avaliacao.comentario) {
			res.status(400);
			res.json("Comentário inválido");
			return;
		}

		avaliacao.idFilme = parseInt(avaliacao.idFilme);
		if (isNaN(avaliacao.idFilme)) {
			res.status(400);
			res.json("Id inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO cadastro (nome, nota, comentario, idFilme) VALUES (?, ?, ?, ?)", [avaliacao.nome, avaliacao.nota, avaliacao.comentario, avaliacao.idFilme]);

		});

		res.json(true);
	}

	public async cadastrar(req: app.Request, res: app.Response) {
		res.render("index/cadastrar");
	}


	@app.http.post()
	@app.route.formData()
	public async cadastrarFilme(req: app.Request, res: app.Response){
		// Os dados enviados via POST ficam dentro de req.body
		let filme = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!filme) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!filme.Nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		filme.Ano = parseInt(filme.Ano);
		if (isNaN(filme.Ano)) {
			res.status(400);
			res.json("Ano inválido");
			return;
		}

		if (!filme.Diretor) {
			res.status(400);
			res.json("Diretor inválido");
			return;
		}

		if (!filme.Sinopse) {
			res.status(400);
			res.json("Sinopse inválida");
			return;
		}

		if (!filme.Genero) {
			res.status(400);
			res.json("Gênero inválido");
			return;
		}

		if (!filme.SubGenero) {
			res.status(400);
			res.json("Sub gênero inválido");
			return;
		}

		if (!req.uploadedFiles || !req.uploadedFiles.Imagem || req.uploadedFiles.Imagem.size > (1024 * 1024)) {
			res.status(400);
			res.json("Imagem inválida");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.

			await sql.beginTransaction();

			await sql.query("INSERT INTO filme (idFilme, Nome, Ano, Diretor, Sinopse, Genero, SubGenero) VALUES (?, ?, ?, ?, ?, ?, ?);", [filme.idFilme, filme.Nome, filme.Ano, filme.Diretor, filme.Sinopse, filme.Genero, filme.SubGenero]);

			filme.idFilme = await sql.scalar("SELECT last_insert_id()") as number;

			await app.fileSystem.saveUploadedFile("/public/img/filmes/" + filme.idFilme + ".jpg", req.uploadedFiles.Imagem);

			await sql.commit();
		});

		res.json(true);
	}
}

export = IndexRoute;
