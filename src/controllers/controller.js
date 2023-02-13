const { send } = require('express/lib/response')
const pool = require('../db')

const getAllCargo = async (req, res, next) => {
    try {

        const allCargo = await pool.query('SELECT *FROM cargo')
        res.json(allCargo.rows)

    } catch (error) {
        return next(error);
    }


}

const getCargo = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await pool.query("SELECT * FROM cargo WHERE id= $1", [id])
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cargo no encontrado"
            });

        res.json(result.rows[0]);
    } catch (error) {
        return next(error);
    }


}

const createCargo = async (req, res, next) => {
    const { tipocargo, descripcioncargo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO cargo (tipoCargo, descripcionCargo) VALUES ($1,$2) RETURNING *',
            [tipocargo, descripcioncargo]);

        res.json(result.rows[0]);

    } catch (error) {
        return next(error);
    }
}

const deleteCargo = async (req, res, next) => {

    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM cargo WHERE id = $1", [id]);

        if (result.rowCount === 0)
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        return res.sendStatus(204)
    } catch (error) {
        return next(error);

    }

}


const updateCargo = async (req, res, next) => {
    const { id } = req.params;
    const { tipocargo, descripcioncargo } = req.body;
    try {
        const result = await pool.query("UPDATE cargo SET tipocargo=$1, descripcioncargo=$2 WHERE id= $3 RETURNING*", [tipocargo, descripcioncargo, id]);
        console.log(result)

        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Cargo no encontrado"
            })

        return res.json(result.rows[0])

    } catch (error) {
        return next(error);

    }



}


module.exports = {
    getAllCargo,
    getCargo,
    createCargo,
    deleteCargo,
    updateCargo
}