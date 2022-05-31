const { response } = require('express')

const createMonitor = async (req, res = response) => {
    req.getConnection(async (err, conn) => {
        if (err) return res.send(err);
        const { identification, name, lastName, photo, program, semester, email, phoneNumber } = req.body;
        const monitor = {
            name,
            last_name: lastName,
            photo,
            program,
            semester,
            identification: identification,
            email,
            phone_number: !phoneNumber ? null : phoneNumber
        }

        conn.query(`select * from monitor where identification = ?`, [monitor.identification], (err, rows,) => {
            if (err) return res.send(err);

            if (rows.length) {

                res.json({
                    error: {
                        value: `identification=${monitor.identification}`,
                        msg: `la identificacion ${monitor.identification} ya esta registrado.`,
                        param: "identification",
                        location: "body"
                    }
                });

            } else {
                conn.query('insert into monitor set ?', monitor, (err, rows) => {
                    if (err) return res.send(err);
                    res.json({
                        status: 'success',
                        id: rows.insertId
                    })
                })
            }
        })
    })
}

const findAllMonitores = async (req, res = response) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query('select * from monitor', (err, rows) => {
            if (err) return res.send(err);

            const monitores = rows.map(item => {
                return {
                    id: item.id,
                    photo: item.photo,
                    identification: item.identification,
                    name: item.name,
                    lastName: item.last_name,
                    program: item.program,
                    semester: item.semester,
                    phoneNumber: item.phone_number,
                    email: item.email
                }
            })
            res.json(monitores)
        })
    })
}

const editMonitor = async (req, res = response) => {
    req.getConnection(async (err, conn) => {
        if (err) return res.send(err);
        const { identification, name, lastName, photo, program, semester, email, phoneNumber } = req.body;
        const monitor = {
            name,
            last_name: lastName,
            photo,
            program,
            semester,
            identification: identification,
            email,
            phone_number: !phoneNumber ? null : phoneNumber
        }

        const id = parseInt(req.params.id)

        conn.query(`select * from monitor where identification = ?`, [monitor.identification], (err, rows,) => {
            if (err) return res.send(err);

            if (rows.length === 1) {

                conn.query('update monitor set ? where id=?', [monitor, id], (err, rows) => {
                    if (err) return res.send(err);

                    res.json({
                        status: 'success',
                        affectedRows: rows.affectedRows
                    })
                })
            } else {
                res.json({
                    error: {
                        value: `identification=${monitor.identification}`,
                        msg: `la identificacion ${monitor.identification} no se encuentra registrado.`,
                        param: "identification",
                        location: "body"
                    }
                });
            }
        })
    })
}

const deleteMonitor = async (req, res = response) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.send(err)
        }
        const id = req.params.id
        if (id) {
            conn.query('Delete from monitor where id= ?', [id], (err, rows) => {
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
                            msg: `el monitor no se encuentra registrado.`,
                            param: "id",
                            location: "params"
                        }
                    });
                }

            })
        }

    })
}

module.exports = {
    createMonitor,
    findAllMonitores,
    editMonitor,
    deleteMonitor
}