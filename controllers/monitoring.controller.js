const { response } = require('express')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
        user: process.env.USER_EMAIL, 
        pass: process.env.PASSWORD_EMAIL,
    },
});

const createMonitoring = async (req, res = response) => {
    req.getConnection(async (err, conn) => {
        if (err) return res.send(err);
        const { course, idMonitor, date, classroom } = req.body;
        const monitoring = {
            course,
            id_monitor: idMonitor,
            date,
            classroom
        }

        conn.query(`insert into monitoring set ?`, [monitoring], (err, rows) => {
            if (err) return res.send(err);

            res.json({
                status: 'success',
                id: rows.insertId
            })
        })
    })
}

const findAllMonitoring = async (req, res = response) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('select mtg.id, mtg.course, mtg.date, mtg.classroom, mtr.id as id_monitor, mtr.name, mtr.last_name, mtr.photo, mtr.program, mtr.semester, mtr.identification, mtr.email, mtr.phone_number  from monitoring mtg inner join monitor mtr on mtg.id_monitor=mtr.id',
            (err, rows) => {
                if (err) return res.send(err);

                const monitoring = rows.map(item => {

                    return {
                        id: item.id,
                        course: item.course,
                        idMonitor: {
                            id: item.id_monitor,
                            name: item.name,
                            lastName: item.last_name,
                            photo: item.photo,
                            program: item.program,
                            semester: item.semester,
                            identification: item.identification,
                            email: item.email,
                            phoneNumber: item.phone_number
                        },
                        date: item.date,
                        classroom: item.classroom
                    }
                })
                res.json(monitoring)
            })
    })
}

const editMonitoring = async (req, res = response) => {
    req.getConnection(async (err, conn) => {
        if (err) return res.send(err);

        const { course, idMonitor, date, classroom } = req.body;
        const monitoring = {
            course,
            id_monitor: idMonitor,
            date,
            classroom
        }

        const id = parseInt(req.params.id)

        conn.query(`select * from monitoring where id = ?`, [id], (err, rows,) => {
            if (err) return res.send(err);

            if (rows.length === 1) {

                conn.query('update monitoring set ? where id=?', [monitoring, id], (err, rows) => {
                    if (err) return res.send(err);

                    res.json({
                        status: 'success',
                        affectedRows: rows.affectedRows
                    })
                })
            } else {
                res.json({
                    error: {
                        value: `id=${id}`,
                        msg: `la monitoria  no se encuentra registrado.`,
                        param: "identification",
                        location: "body"
                    }
                });
            }
        })
    })
}

const deleteMonitoring = async (req, res = response) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err)
        }
        const id = req.params.id
        if (id) {
            conn.query('Delete from monitoring where id= ?', [id], (err, rows) => {
                if (err) return res.send(err);

                if (rows.affectedRows === 1) {
                    res.json({
                        status: 'success',
                        affectedRows: rows.affectedRows
                    })
                } else {
                    res.json({
                        error: {
                            value: `id=${id}`,
                            msg: `la monitoria no se encuentra registrado.`,
                            param: "id",
                            location: "params"
                        }
                    });
                }

            })
        } else {
            res.json({
                error: {
                    value: `id=${id}`,
                    msg: `Id invalido de la monitoria.`,
                    param: "id",
                    location: "params"
                }
            });
        }

    })
}

const notifyMonitor = async (req, res = response) => {
    const { idMonitor, course, classroom, date, message } = req.body
    const contenctHtml = `
    <h1>Recordatorio de Monitoria</h1>
    <ul>
        <li>Monitor: ${idMonitor.name} ${idMonitor.lastName}</li>
        <li>Identificación: ${idMonitor.identification}</li>
        <li>Programa: ${idMonitor.program}</li>
        <li>Curso: ${course}</li>
        <li>Salon de Clase: ${classroom}</li>
        <li>Fecha: ${date}</li>
    </ul>
    <p>${message}</p>
    `
    try {
        const info = await transporter.sendMail({
            from: `"Recordatorio monitoria ${date} - ${course}" <andrescampuzanotest@gmail.com>`,
            to: `${idMonitor.email}`,
            subject: `Recordatorio monitoria ${date} - ${course}`,
            html: contenctHtml,
        });

        res.json({
            accepted: info.accepted,
            response: info.response,
            messageId: info.messageId,
            status: 'success'
        })
    } catch (error) {
        console.error(error);
        res.json(JSON.stringify(error))
    }

}

module.exports = {
    createMonitoring,
    findAllMonitoring,
    editMonitoring,
    deleteMonitoring,
    notifyMonitor
}