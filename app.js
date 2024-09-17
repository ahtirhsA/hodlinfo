const express=require('express')
const app=express()
//const fetch=require('node-fetch')
const axios = require('axios');



const {open}=require('sqlite')
const sqlite3=require('sqlite3')


const path=require('path')
const dbpath=path.join(__dirname,'crypto.db')

let db;




const initializeConnection=async()=>{

try {
    db=await open(
        {
            filename:dbpath,
            driver:sqlite3.Database
        }
    )

    app.listen(3004,()=>{
        console.log('Server is running at http://localhost:3004')
    })

}
catch(e){
   console.log(`The error message is ${e}`)
}
}

initializeConnection()

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'views' });
});



const results=()=>{

setInterval(async ()=>{

   const response=await axios.get('https://api.wazirx.com/api/v2/tickers');
   const data=await response.data
   
   const newArr=Object.entries(data).map((i)=>i[1])



const insertQuery = `
   INSERT INTO crypto_users (name, last, buy, sell, volume, base_unit) 
   VALUES (?, ?, ?, ?, ?, ?)
 `;

 const insertPromises = newArr.map(item => {
   return db.run(insertQuery, [
     item.name, 
     item.last, 
     item.buy, 
     item.sell, 
     item.volume, 
     item.base_unit
   ]);
 });

 await Promise.all(insertPromises);



},5000)

    
      
}

app.get('/api/getTop10',async (req,res)=>{
     const que=`
       SELECT * FROM crypto_users
       LIMIT 10;
     `
     const resQue=await db.all(que)
     console.log(resQue)
     res.send(resQue)
})



results()

