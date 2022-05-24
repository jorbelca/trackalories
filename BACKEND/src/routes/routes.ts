import express from 'express'

const router = express.Router()


router.get('/', (_req, res) => {
    res.send('Response to GET')
})

router.post('/', (_req, res) => {
    res.send('Response to POST')
})

export default router