const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {
    async create(req, res) {
        console.log(req.body);
        const { nome, saldo_inicial, senha } = req.body;
        const id = crypto.randomBytes(2).toString('HEX');

        await connection('clientes').insert({
            id,
            nome,
            saldo_inicial,
            senha
        })
        return res.json({ 'salve seu id': id });
    },

    async delete(req, res) {
        const { id } = req.params;
        const senha = req.body.senha;


        const bd = await connection('clientes')
            .where('id', id)
            .select('id', 'senha')
            .first();

        if (bd.senha !== senha) {

            return res.status(401).json({ error: "senha não confere" });
        }
        await connection('clientes')
            .where('id', id)
            .delete();
        return res.status(204).send()
    },
    async lista(req, res) {
        const clientes_all = await connection('clientes').select('*');
        return res.json(clientes_all);
    },
    async edita(req, res) {
        const { id } = req.params;
        await connection('clientes')
            .where('id', id)
            .update({
                nome: req.body.nome,
                saldo_inicial: req.body.saldo,
                senha: req.body.senha
            });

        return res.status(200).json({ "atualizado com sucesso ": id });

    }
}
