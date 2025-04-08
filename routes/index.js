var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/userHelpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/client-code',(req,res)=>{
  
 res.render('client-code')
});

router.post('/clientLogin',(req,res)=>{
  
  userHelpers.clientLogin(req.body,(client,loginStatus)=>{
if(loginStatus){
  let totalAmount = Number(client.amount)+Number(50);
  res.render('invoice',{client,totalAmount})
}

  })


})


module.exports = router;
