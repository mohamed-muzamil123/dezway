var express = require('express');
var router = express.Router();
const { getDB } = require('../config/connection');

const invoiceHelpers = require('../helpers/invoiceHelpers');
/* GET admin listing. */
router.get('/', function(req, res, next) {  // 🔹 Use `/` here, NOT `/admin`
    console.log("✅ Admin page is accessed");
invoiceHelpers.getAllClients().then((clients)=>{
    
    res.render('admin',{clients});  // 🔹 Ensure you have a "views/admin.hbs" file
    

})

    
});


router.post('/add-invoice',function(req,res){
  
invoiceHelpers.addInvoice(req.body,(callback)=>{
    console.log(req.body)
   res.redirect('/admin')
    
})
 
})

router.post('/delete', async (req, res) => {
    const db = getDB();
    const id = req.body.id;
    const { ObjectId } = require('mongodb');
  
    try {
      await db.collection('invoice').deleteOne({ _id: new ObjectId(id) });
      req.flash('success_msg', 'Deleted successfully!');
      res.redirect('/admin');
    } catch (err) {
      console.error('Delete Error:', err);
      req.flash('error_msg', 'Something went wrong.');
      res.redirect('/admin');
    }
  });
  


  

module.exports = router;
