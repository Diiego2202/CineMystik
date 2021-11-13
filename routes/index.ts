import app = require("teem");

class IndexRoute {

	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async sobre(req: app.Request, res: app.Response) {
		res.render("index/sobre");
	}

	public async cadastro(req: app.Request, res: app.Response) {
		res.render("index/cadastro");
	}

	public async homepage(req: app.Request, res: app.Response) {
		res.render("index/homepage");
	}

	public async teste(req: app.Request, res: app.Response) {
		// Mais para frente iremos melhorar os tipos, para não usar any[] :)
		let filme: any[];
		let tot_filmes: any;

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			filme = await sql.query("SELECT idFilme, nome, ano, diretor, sinopse, genero, subgenero FROM filme");
			tot_filmes = await sql.query("SELECT count(idfilme) from filme");

		});
		
		let opcoes = {
			filme: filme,
			tot_filmes
		};

		res.render("index/teste", opcoes);
	}

}

export = IndexRoute;
