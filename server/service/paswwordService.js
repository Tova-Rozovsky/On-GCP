import 'dotenv/config'
import { executeQuery } from './query.js'
import {  getByIdQuery, updateQuery,deleteQuery } from './allQuery.js';

export class PaswwordService {

    async getByuserId(id) {
        const query = getByIdQuery("passwords");
        const result = await executeQuery(query, [id]);
        return result;
    }
    
    async delete(id) {
        const query = deleteQuery("passwords");
        const result = await executeQuery(query, [id]);
        return result;
    }
   
}