const { getDB } = require('../config/connection');
const collection = require('../config/collection');

module.exports={

    getAllClients: async()=>{
        const db = getDB();
        const collection = db.collection('invoice');
       return await collection.find().toArray();
    },

        addInvoice: async (invoice,callback) => {
          const db = getDB();
          const collection = db.collection('invoice'); // ✅ fix here
          await collection.insertOne(invoice);
          callback("ready")
        }
  

}