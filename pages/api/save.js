import {Save, Read} from '@/utils/helpers';

export default async function handler(req, res) {

  if(req.method === 'POST'){
  const {uuid,result} = req.body;
  console.log(uuid,result);
  await Save (uuid,result);
  res.status(200).json({ name: 'John Doe' })
  }
  
  if(req.method === 'GET'){
    const { uuid }= req.query;
    console.log(uuid);
  try{
    const results = await import (`@/saves/${uuid}.json`);
    res.status(200).json(results);
  
    }catch(e){
  
      res.status(200).json(false);
    }
   
  }
}

