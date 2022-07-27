import { Pool } from 'pg/lib';
import { config } from '../config';
const pool = new Pool(config);
let client=null;
 export default async function  connect () {
  if(client!=null){return client;}
 client = await pool.connect();
 return client;
}


