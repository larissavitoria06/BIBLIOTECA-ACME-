const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
  return res.json({ titulo: 'Biblioteca ACME' });
});

const Aluno = require('./controller/Alunos');
const Emprestimos = require('./controller/emprestimos');
const Livros = require('./controller/livros');

router.post('/alunos', Aluno.create); 
router.get('/alunos', Aluno.read);
router.get('/alunos/:id', Aluno.readOne);
router.patch('/alunos/:id', Aluno.update);
router.delete('/alunos/:id', Aluno.remove);

router.post('/emprestimos', Emprestimos.create);
router.get('/emprestimos', Emprestimos.read);
router.patch('/emprestimos/:id', Emprestimos.update);
router.delete('/emprestimos/:id', Emprestimos.remove);

router.post('/livros', Livros.create);
router.get('/livros', Livros.read);
router.get('/livros/:id', Livros.readOne);
router.patch('/livros/:id', Livros.update);
router.delete('/livros/:id', Livros.remove);

module.exports = router;
