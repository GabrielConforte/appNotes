import { Router } from "express";
import  {notasDAO} from "../DAO/notasDAO.js";
const router = Router()

router.get('/notes', (req, res, next) => {//funciona ok
    notasDAO
      .getAll()
      .then(notes => res.json(notes))
      .catch(next);
  });
  router.get('/notes/:id', (req, res) => {//funcion ok
    const id = req.params.id;
    notasDAO
      .getOne(id)
      .then(note => {
        if (note) {
          res.json(note);
        } else {
          res.status(404).json({ error: "Note does not exist" });
        }
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  router.post('/notes', (req, res) => {//funciona ok
    const data = req.body;
    notasDAO
      .createOne(data)
      .then(note => res.json(note))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  router.patch('/notes/:id', (req, res) => {// funciona ok
    const id = req.params.id;
    const data = req.body;
    notasDAO
    .updateOne(id, data)
    .then(note => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).json({ error: "Note does not exist" });
      }
    })
    .catch(error => res.status(500).json({ error: error.message }));
  });
  
  router.delete('/notes/:id', (req, res) => {// funciona ok
    const id = req.params.id;
    notasDAO
      .deleteOne(id)
      .then(() => res.json({ deleted: true }))
      .catch(error => res.status(500).json({ error: error.message }));
  });

  router.patch('/archive/:id', (req, res) => {
    const id = req.params.id;
    notasDAO
      .getOne(id)
      .then(note => {
        if (note) {
          const archive = !note.archive;
          notasDAO
            .toggleArchive(id, archive)
            .then(updatedNote => res.json(updatedNote))
            .catch(error => res.status(500).json({ error: error.message }));
        } else {
          res.status(404).json({ error: "The requested note does not exist" });
        }
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });

  router.get('/archive', (req, res) => {
    notasDAO
      .getArchived()
      .then(notes => res.json(notes))
      .catch(error => res.status(500).json({ error: error.message }));
  });

  router.patch("/notes/:id/categoria", (req, res) => {
    const id = req.params.id;
    const categoriaId = req.body.categoriaId;
  
    notasDAO
      .updateOne(id, categoriaId)
      .then((note) => {
        if (note) {
          res.json(note);
        } else {
          res.status(404).json({ error: "Note does not exist" });
        }
      })
      .catch((error) => res.status(500).json({ error: error.message }));
  });

  router.get('/notes/:id/filter', (req, res) => {//funcion ok
    const id = req.params.id;
    notasDAO
      .getFilter(id)
      .then(note => {
        if (note) {
          res.json(note);
        } else {
          res.status(404).json({ error: "Note does not exist" });
        }
      })
      .catch(error => res.status(500).json({ error: error.message }));
  }); 
  
export default router;