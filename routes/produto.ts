import app = require("teem");

class RotaProduto {
	public async index(req: app.Request, res: app.Response) {
		res.send("Eu sou o index do Produto!");
	}
    
    public async criar(req: app.Request, res: app.Response) {
		res.send("Produto criado!");
	}

	public async atualizar(req: app.Request, res: app.Response) {
		res.send("Produto atualizado!");
	}

	public async excluir(req: app.Request, res: app.Response) {
		res.send("Produto excluido!");
	}
}

export = RotaProduto;
