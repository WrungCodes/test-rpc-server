import express from 'express';
import { json } from 'body-parser'

const http = express();
http.use(json());

// rpc endpoint
http.post("/", (req, res) => {

})

// return rpc custom error
http.all('*', async (req, res) => {});
  
export { http };