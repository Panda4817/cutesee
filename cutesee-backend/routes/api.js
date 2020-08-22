var express = require("express");
var router = express.Router();
var axios = require('axios');

router.get('/:q', async (req, res) => {
    var term = req.params.q;
    console.log(term);
    try {
            var response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: process.env.API_KEY,
                q: `cute ${term}`,
                image_type: 'photo',
                safesearch: true,
                per_page: 200,
                pretty: true
            }
        })
        res.send(response.data);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;