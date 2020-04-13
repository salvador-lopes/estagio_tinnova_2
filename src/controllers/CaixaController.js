const db = require('../database/connection');
async function getSaldo(idCliente) {
    const result = await db('clientes')
        .where('id', idCliente)
        .select('saldo_inicial')
        .first();

    return result.saldo_inicial;
}
function contaNotas(saque) {
    console.log(saque);
    const notas = [100, 50, 20, 10, 5, 2];
    const nota = [];
    notas.forEach(valor => {
        const resto = saque % valor;
        const qtde = (saque - resto) / valor;
        if (qtde >= 1) {
            saque = saque - (qtde * valor);
            nota.push({ nota: valor, qtde: qtde })
        }
        return;
    });
    return (nota);
}
async function updateSaldo(novoSaldo, idCliente) {

    await db('clientes')
        .where('id', idCliente)
        .update({
            saldo_inicial: novoSaldo
        });
}
module.exports = {


    async saca(req, res) {
        const saque = req.body.saque;
        const idCliente = req.body.id;

        if (req.session.userid == null) {
            return res.status(401).json({ error: "usuário ainda não autenticado" });
        }

        const saldo = await getSaldo(idCliente);

        if (saldo >= saque) {

            const notas = contaNotas(saque);
            const novoSaldo = saldo - saque;
            updateSaldo(novoSaldo, idCliente);

            const respBody = { msg: 'saque efetuado com sucesso', notas: notas, saldoFinal: novoSaldo };
            return res.json(respBody);
        }
        else {
            return res.json({ msg: 'não foi possível efetuar o saque' });

        }


    }

}





