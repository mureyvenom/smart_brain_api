const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "90da5eb311ac48b5b2f45ecf04fc731d",
});

const handleApiCall = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(400).json('Clarifai API error')
    })
}


const handleImage = (req, res, db_conn) => {
    const {id} = req.body;

    db_conn('public.users')
    .where({
        id: id
    })
    .increment('entries', 1)
    .returning('entries')
    .then(count => {
        res.json(count[0]);
    })
    .catch(err => res.status(404).json('unable to get entries'))

}

module.exports = {
    handleImage: handleImage,
    handleApiCall
}