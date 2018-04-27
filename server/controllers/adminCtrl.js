module.exports = {
    changePartName: (req, res) => {
        const dbInstance = req.app.set("db")
        
        console.log(req.user)
        console.log(req.body)

        dbInstance
        .admin
        .change_part_name([req.body.partId, req.body.name])
        .then(parts => { res.status(200).json(parts)})
        .catch(err => console.log(err))
        }
}