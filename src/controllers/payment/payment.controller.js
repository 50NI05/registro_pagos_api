import { pool } from '../../db.js'
import timezone from "moment-timezone";

export const addPayment = async (req, res) => {
  const { apartment, name, amount } = req.body

  const current_date = timezone.tz('America/Caracas').format('YYYY-MM-DD HH:mm:ss');
  // console.log(fecha_actual);

  try {
    const [rows] = await pool.query('INSERT INTO t_payment (apartment, name, amount, payment_date) VALUES (?, ?, ?, ?)', [apartment, name, amount, current_date])

    if (rows.affectedRows) {
      res.status(200).send({
        status: 'SUCCESS',
        data: 'El pago se ha registrado correctamente'
      })
    } else {
      res.json({
        status: 'Error',
        data: 'El pago no se pudo procesar. Por favor, intente más tarde'
      })
    }
  } catch (error) {
    res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}

export const getPayment = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM t_payment')
    res.json({
      status: 'SUCCESS',
      data: rows
    })
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      // data: 'Something goes wrong'
      data: 'Algo va mal'
    })
  }
}