//no esta conectado a nada
import { pool } from "../db.js";

export const getAll = async(req, res) => {
    const [rows] = await pool.query('SELECT * FROM notes')
    res.json(rows);}

export const getOne = async(req, res) => {
const [rows] = await pool.query('SELECT * FROM notes WHERE ID=?',[req.params.id])
if(rows.length<=0) return res.status(404).json({message: 'note not found'})
res.json(rows[0])}

export const createOne = async (req, res) => {//
    const {title,text,archive} = req.body;
    const [rows] = await pool.query('INSERT INTO notes (title, text, archive) VALUES(?,?,?)', [title,text,archive])
    res.send({
        id: rows.insertId,
        title,
    })
    
};
export const updateOne = async(req, res) => {
    const {id} = req.params;
    const {title,text}= req.body;
    const [result] = await pool.query("UPDATE notes SET title = IFNULL(?,title), text = IFNULL(?,text) WHERE id= ?", [title,text,id])
    if(result.affectedRows<=0) return res.status(404).json({message: 'note not found'})
    console.log(result)
    res.send("note with id:"+ id +" updated")
};
export const deleteOne = async (req, res) => {
    const [result] = await pool.query('DELETE FROM notes WHERE ID=?',[req.params.id])
    if(result.affectedRows<=0) return res.status(404).json({message: 'note not found'})
    console.log(result)
    res.sendStatus(204)}