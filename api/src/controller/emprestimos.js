const { PrismaClient } = require('@prisma/Empretimos');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { aluno_ra, livro_id } = req.body;
        const emprestimo = await prisma.emprestimo.create({
            data: {
                aluno_ra,
                livro_id,
             
            }
        });
        return res.status(201).json(emprestimo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    try {
        const emprestimos = await prisma.emprestimo.findMany({
            include: {
                aluno: true,
                livro: true   
            }
        });
        return res.json(emprestimos);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const readOne = async (req, res) => {
    try {
        const emprestimo = await prisma.emprestimo.findUnique({
            where: {
                id: parseInt(req.params.id) 
            },
            include: {
                aluno: true, 
                livro: true 
            }
        });

        if (!emprestimo) {
            return res.status(404).json({ error: 'Empréstimo não encontrado' });
        }

        return res.json(emprestimo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params; 
        const { data_devolucao } = req.body;

        const emprestimo = await prisma.emprestimo.update({
            where: { id: parseInt(id) },
            data: {
                data_devolucao,
            
            }
        });

        return res.status(202).json(emprestimo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.emprestimo.delete({
            where: {
                id: parseInt(req.params.id) 
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = { create, read, readOne, update, remove };
