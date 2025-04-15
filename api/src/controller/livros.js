const { PrismaClient } = require('@prisma/Livros');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const livro = await prisma.livro.create({
            data: req.body
        });
        return res.status(201).json(livro);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    const livros = await prisma.livro.findMany();
    return res.json(livros);
};

const readOne = async (req, res) => {
    try {
        const livro = await prisma.livro.findUnique({
            where: {
                livro_id: Number(req.params.id)
            },
            include: {
                emprestimos: true 
            }
        });
        return res.json(livro);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const livro = await prisma.livro.update({
            where: {
                livro_id: Number(req.params.id)
            },
            data: req.body
        });
        return res.status(202).json(livro);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.livro.delete({
            where: {
                livro_id: Number(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = { create, read, readOne, update, remove };
