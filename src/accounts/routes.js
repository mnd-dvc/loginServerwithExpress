const { Router } = require("express"); 
const controller = require("./controller"); 

const router = Router (); 

router.get("/", controller.getAccounts); 
router.post("/", controller.postUser); 

module.exports = router; 