import { executeQuery } from './query.js';

export class ManagerService {

    async getAll() {
        try {
            const result = await executeQuery(`SELECT COUNT(*) AS nonManagerUserCount
            FROM ${process.env.DB_NAME}.users
            WHERE userType != 'מנהל' OR userType IS NULL`);
            return result;
        } catch (ex) {
            console.error('Error in getAllMembers:', ex);
            throw ex;
        }
    }
}