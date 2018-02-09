const router = require('express').Router();

router.get('/newSite', (req, res) => {
    res.render('add');
});

router.get('/editSite', (req, res) => {
    res.render('edit');
});

router.get('/removeSite', (req, res) => {
    res.render('remove');
});

module.exports = router;