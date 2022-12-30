import { Router } from "express";
import { categoriasDAO } from "../DAO/categoriasDAO.js";

const router = Router();

router.get("/categorias", (req, res, next) => {
  categoriasDAO
    .getAll()
    .then((categorias) => res.json(categorias))
    .catch(next);
});

router.get("/categorias/:id", (req, res) => {
  const id = req.params.id;
  categoriasDAO
    .getOne(id)
    .then((categoria) => {
      if (categoria) {
        res.json(categoria);
      } else {
        res.status(404).json({ error: "Categoria does not exist" });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.post("/categorias", (req, res) => {
  const data = req.body;
  categoriasDAO
    .createOne(data)
    .then((categoria) => res.json(categoria))
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.patch("/categorias/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  categoriasDAO
    .updateOne(id, data)
    .then((categoria) => {
      if (categoria) {
        res.json(categoria);
      } else {
        res.status(404).json({ error: "Categoria does not exist" });
      }
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});
router.delete("/categorias/:id", (req, res) => {
  const id = req.params.id;
  categoriasDAO
    .deleteOne(id)
    .then(() => res.json({ deleted: true }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

export default router;