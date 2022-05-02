import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}


   export const serverPort= process.env.SERVER_PORT;
   export const dbEndpoint= process.env.DB_ENDPOINT; 
   export const dbPort= process.env.DB_PORT;
   export const mongooseDebug= process.env.DB_DEBUG;
