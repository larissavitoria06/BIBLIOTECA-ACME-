const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const aluno = await prisma.aluno.create({
            data: req.body
        });
        return res.status(201).json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const read = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany();
        return res.json(alunos);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const readOne = async (req, res) => {
    try {
        const aluno = await prisma.aluno.findUnique({
            where: {
                aluno_ra: req.params.ra 
            },
            select: {
                aluno_ra: true,
                nome: true,
                telefone: true
            }
        });
        return res.json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const aluno = await prisma.aluno.update({
            where: {
                aluno_ra: req.params.ra 
            },
            data: req.body
        });
        return res.status(200).json(aluno); 
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        await prisma.aluno.delete({
            where: {
                aluno_ra: req.params.ra 
            }
        });
        return res.status(204).send(); 
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = { create, read, readOne, update, remove };
