const { response } = require('express')

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

        /**
         * {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 3,
            "serverStatus": 2,
            "warningCount": 0,
            "message": "",
            "protocol41": true,
            "changedRows": 0
        }
         */
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

        /**
         * {
            "fieldCount": 0,
            "affectedRows": 1,
            "insertId": 3,
            "serverStatus": 2,
            "warningCount": 0,
            "message": "",
            "protocol41": true,
            "changedRows": 0
        }
         */
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

module.exports = {
    createMonitoring,
    findAllMonitoring,
    editMonitoring,
    deleteMonitoring
}