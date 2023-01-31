const { Router, response } = require('express')
const router = Router()

router.use((req, res, next) => {
    if(req.session.user) next();
    else res.send(401);
})
const supermarket = [
    {
        id: 1,
        store: 'Wallmart',
        review: 3.5
    },
    {   
        id: 4,
        store: 'Target',
        review: 4
    },
    {   
        id: 3,
        store: 'Seven11',
        review: 2.9
    }
]

//ROUT PARAM
router.get('/:id', (req, res) => {
    const { id } = req.params
    const marketId = supermarket.find((s) => s.id == id)
    console.log(marketId)
    res.send(marketId)

})

//QUERI PARAM
router.get('/', (req, res) => {
    const { review } = req.query
    const parsedRevw = parseFloat(review)

    res.cookie('visited', 'true', {
        maxAge: 10000
    })

    console.log(req.cookies)
    if (review && !isNaN(parsedRevw)) {
        const marketFilter = supermarket.filter((s) => s.review >= parsedRevw)
        res.send(marketFilter)
    } else {
        
        res.send(supermarket)
    }    
})

router.get('/objetos/list', (req, res) => {
    const list = req.session.list
    if (!list) {
        res.send('La lista esta vacia')
    }
    else {
        res.send(list)
    }
})

router.post('/objetos/list/item', (req, res) => {
    const {item, quant} = req.body
    const listItem = {item, quant}
    if (req.session.list) {
        req.session.list.items.push(listItem)
    } else {
        req.session.list = {
            items: [listItem]
        }
    }
    res.sendStatus(201)
})

module.exports = router