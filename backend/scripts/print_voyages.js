import { connectDB, getCollection } from '../db.js'

async function printVoyages(){
  try{
    await connectDB()
    const rows = await getCollection('voyage')
      .find({}, { projection: { _id: 0 } })
      .sort({ voyage_id: 1 })
      .toArray()
    console.log('Voyages:', JSON.stringify(rows, null, 2))
  }catch(e){
    console.error('Error querying voyages:', e.message)
    process.exitCode = 1
  }
}

printVoyages()
