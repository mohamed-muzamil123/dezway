const { getDB } = require('../config/connection');
const collection = require('../config/collection');


module.exports={

    clientLogin:async (userData,callback)=>{
        
        console.log(userData);
        
        let loginStatus =false;
        const db = getDB();
        const collection = db.collection('invoice');
       let client = await collection.findOne({clientCode:userData.clientCode})
       if(client){
        loginStatus =true;
        
        
     callback(client,loginStatus)
       }
      
    }

}