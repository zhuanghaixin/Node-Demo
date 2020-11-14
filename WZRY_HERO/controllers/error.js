exports.get404=(req, res, next) => {
    res.status(404).send({
        code:404,
        msg:'Not Found'
    });
}
