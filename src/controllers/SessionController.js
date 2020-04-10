const loginCon = require('../database/connection');

var sess_count = 0;

module.exports = {
	async autentica(req, res) {

		appSession = req.session;

		const id = req.body.id;
		const senha = req.body.senha;
		console.log(id, senha);

		const bd = await loginCon('clientes')
			.where('id', id)
			.select('id', 'senha')
			.first();
		if (bd == null || senha !== bd.senha) {
			return res.status(401).json({ mess: "usuario inválido ou senha inválidos" })
		}

		if (
			sess_count >= 5
		) {
			console.log(">> Usuario: " + id + ", EXCESSO DE SESSOES ATINGIDO."); // RSP
			return res.status(500).send({ error: 'mais de 5 pessoas estão usando o caixa, aguarde sua vez' });
		}

		if (req.session.userid != null) {
			console.log(">> Sessao previamente existente sera ENCERRADA. Usuario: " + appSession.userid); // RSP
			sess_count--;
		}

		sess_count++;
		console.log(">> Usuario: " + id + ": sessao de numero " + sess_count); // RSP

		req.session.userid = id;
		req.session.session_number = sess_count;

		return res.status(200).json({ mess: "usuario redirecionado com sucesso" });
	}
}
