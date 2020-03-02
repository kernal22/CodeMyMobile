const MysqlConnection = require('../db_connection/mysql.connection');

const mysql = new MysqlConnection();

class FriendModel {
    async getUserList(paginate) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `select * from user_detail limit ${paginate.perPage} offset ${paginate.offset}`;
                let data = await mysql.executeQuery(query);
                return resolve(data);
            } catch (error) {
                return reject(error);
            }
        })
    }

    async getCountTotalUser() {
        return new Promise(async (resolve ,reject) => {
            try {
                let query = 'select count(user_id) as totalUserCount from user_detail';
                let result = await mysql.executeQuery(query);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        })
    }

    async getFriendLists(userid) {
        return new Promise(async (resolve ,reject) => {
            try {
                let query = `select * from user_detail as ua inner join friend_list fl on ua.user_id = fl.user_id where fl.user_id = ${userid} or fl.friend_id = ${userid}`;
                let result = await mysql.executeQuery(query);
                return resolve(result);
            } catch (error) {
                return reject(error);
            }
        })
    }

    async getUserDetails(userid) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = `select * from user_detail where user_id = ${userid}`;
                let data = await mysql.executeQuery(query);
                return resolve(data);
            } catch (error) {
                return reject(error);
            }
        })
    }
}

module.exports = FriendModel;