const { Router } = require('express')
const router = Router()

testArray = []


router.use((req, res, next) => {
    if(req.session.user) next();
    else res.send(401);
})

router.get('/', (req, res) => {
    
    res.sendStatus(200)
})


router.get('/:id', (req, res) => {
    const { items } = req.params;
    console.log(items)
    
})

router.post('/', (req, res) => {
    console.log(req.body)
    testArray.push(req.body)
    res.sendStatus(201)
})

module.exports = router