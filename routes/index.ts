import app = require("teem");

class IndexRoute {

	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async sobre(req: app.Request, res: app.Response) {
		res.render("index/sobre");
	}

	public async avaliar(req: app.Request, res: app.Response) {
		res.render("index/avaliar");
	}

	public async filme_do_dia(req: app.Request, res: app.Response) {
		res.render("index/filme_do_dia");
	}

	public async galeria(req: app.Request, res: app.Response) {
		// Mais para frente iremos melhorar os tipos, para não usar any[] :)
		let filme: any[];

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().

			filme = await sql.query("SELECT idFilme, nome, ano, diretor, sinopse, genero, subgenero FROM filme");

		});
		
		let opcoes = {
			filme: filme
		};

		res.render("index/galeria", opcoes);
	}

}

export = IndexRoute;
