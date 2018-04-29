module.exports = {
    changePartName: (req, res) => {
        const dbInstance = req.app.set("db")

        dbInstance
        .admin
        .change_part_name([req.body.partId, req.body.name])
        .then(parts => { res.status(200).json(parts)})
        .catch(err => console.log(err))
    },
    changePartCategory: (req, res) => {
        const dbInstance = req.app.set("db")

        dbInstance
        .admin
        .change_part_category([req.body.partId, req.body.category])
        .then(parts => { res.status(200).json(parts)})
        .catch(err => console.log(err))
    },
    changePartPrice: (req, res) => {
        const dbInstance = req.app.set("db")

        dbInstance
        .admin
        .change_part_name([req.body.partId, req.body.price])
        .then(parts => { res.status(200).json(parts)})
        .catch(err => console.log(err))
    },
    changePartModel: (req, res) => {
        const dbInstance = req.app.set("db")

        dbInstance
        .admin
        .change_part_name([req.body.partId, req.body.model])
        .then(parts => { res.status(200).json(parts)})
        .catch(err => console.log(err))
    },
    changePartSpecial: (req, res) => {
        const dbInstance = req.app.set("db")

        dbInstance
        .admin
        .change_part_name([req.body.partId, req.body.special])
        .then(parts => { res.status(200).json(parts)})
        .catch(err => console.log(err))
    },
}