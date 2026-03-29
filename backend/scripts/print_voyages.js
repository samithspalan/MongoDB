import db from '../db.js'

async function printVoyages(){
  try{
    const [rows] = await db.query('SELECT * FROM voyage')
    console.log('Voyages:', JSON.stringify(rows, null, 2))
  }catch(e){
    console.error('Error querying voyages:', e.message)
    process.exitCode = 1
  }finally{
    try{ await db.end() }catch(e){}
  }
}

printVoyages()
