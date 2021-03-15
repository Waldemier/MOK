const {Router} = require('express')
const {CesareanEncryption}= require("../public/cesarean")
const {attackSimulatedMethod} = require('../public/attack')

const router = Router();
const cesarean = new CesareanEncryption();


router.get('/info', (request, response) => {
    response.status(200).render('information')
})

router.get('/', (request, response) => {
    response.status(200).render('encryption')
})

router.get('/decrypt', (request, response) => {
    response.status(200).render('decryption')
})

router.get('/attack', (request, response) => {
    response.render('decryption', {attack: true})
})

router.post('/attack', (request, response) => {
    const {attackEncryption} = request.body;
    
    //Warnings
    //both
    if(/[a-zA-Z]/.test(attackEncryption) && /[А-Яа-яёЁЇїІіЄєҐґ]/.test(attackEncryption)) {
        response.status(400).render('decryption', { attack: true, warning: "Warning message. Must be contain either Ukrainian or English." })
    }
    //ukr
    if(/[a-zA-Z]/.test(attackEncryption) && request.body.hasOwnProperty('ukr')) {
        response.status(400).render('decryption', { attack: true, warning: "Warning message. Must be in Ukrainian." })
    }
    //eng
    if(!(/[a-zA-Z]/.test(attackEncryption)) && !request.body.hasOwnProperty('ukr')) {
        response.status(400).render('decryption', { attack: true, warning: "Warning message. Must be in English." })
    }

    let attackResults;
    try {
        attackResults = request.body.hasOwnProperty('ukr') ? attackSimulatedMethod(attackEncryption, 'ukr'): attackSimulatedMethod(attackEncryption);
    } catch(e) {
        response.status(400).render('decryption', { attack: true, error: e.message })
    }

    response.status(200).render('decryption', { attack: true, attackResults, successAttack: true })
})

router.post('/encrypt', (request, response) => {
    const {message, key} = request.body;

    //Warnings
    //both
    if(/[a-zA-Z]/.test(message) && /[А-Яа-яёЁЇїІіЄєҐґ]/.test(message)) {
        response.status(400).render('encryption', { warning: "Warning message. Must be contain either Ukrainian or English." })
    }
    //ukr
    if(/[a-zA-Z]/.test(message) && request.body.hasOwnProperty('ukr')) {
        response.status(400).render('encryption', { warning: "Warning message. Must be in Ukrainian." })
    }
    //eng
    if(!(/[a-zA-Z]/.test(message)) && !request.body.hasOwnProperty('ukr')) {
        response.status(400).render('encryption', { warning: "Warning message. Must be in English." })
    }

    //Key validation
    if(!Number.parseInt(key)) response.status(400).render('encryption', { error: "Invalid key. Must be a number" })

    //Language validation
    let result;
    let table;
    try {
        result = request.body.hasOwnProperty('ukr') ? cesarean.encryption(message, key, 'ukr'): cesarean.encryption(message, key);
        table = cesarean.frequencyTableMethodCreate(result);
    } catch(e) {
        response.status(400).render('encryption', { error: e.message })
    }
    response.status(200).render('encryption', { table, success: true, message, encryptionMessage: result, encryptionKey: key })
})

router.post('/decrypt', (request, response) => {
    const {encrypt, key} = request.body;

    //Warnings
    //both
    if(/[a-zA-Z]/.test(encrypt) && /[А-Яа-яёЁЇїІіЄєҐґ]/.test(encrypt)) {
        response.status(400).render('decryption', { warning: "Warning message. Must be contain either Ukrainian or English." })
    }
    //ukr
    if(/[a-zA-Z]/.test(encrypt) && request.body.hasOwnProperty('ukr')) {
        response.status(400).render('decryption', { warning: "Warning message. Must be in Ukrainian." })
    }
    //eng
    if(!(/[a-zA-Z]/.test(encrypt)) && !request.body.hasOwnProperty('ukr')) {
        response.status(400).render('decryption', { warning: "Warning message. Must be in English." })
    }

    //Key validation
    if(!Number.parseInt(key)) response.status(400).render('decryption', { error: "Invalid key. Must be a number" })


    //Language validation
    let result;
    try {
        result = request.body.hasOwnProperty('ukr') ? cesarean.decryption(encrypt, key, 'ukr'): cesarean.decryption(encrypt, key);
    } catch (e) {
        response.status(400).render('decryption', { error: e.message })
    }
   
    response.status(200).render('decryption', { success: true, encrypt, decryptionMessage: result, decryptionKey: key })
})

module.exports = router;