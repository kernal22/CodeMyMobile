const Pagination = require('../model/pagination.model');
const FriendModel = require('../model/friend.model');

const friendModel = new FriendModel();

class FriendController {
    async getUserDetails(req, res) {
        let userid = req.body.userid;
        let data = await friendModel.getUserDetails(userid);
        if(data) {
            res.json({status: true, data: data});
        } else {
            res.json({status: false, data: null});
        }
    }

    async getUserList(req, res) {
        try {
            let page = Number(req.params.page);
            let page_id = page;
            let perPage = 2;
            let current_page = page_id > 0 ? page_id : current_page;

            const countTotalUser = await friendModel.getCountTotalUser();
            let totalCount = countTotalUser[0].totalUserCount;

            const paginate = new Pagination(totalCount, current_page, perPage);

            let data = await friendModel.getUserList(paginate);
            if(data) {
                res.json({status: true, data: data});
            } else {
                res.json({status: false, data: null});
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getFriendLists(req, res) {
        try {
            let userid = req.body.userid;
            let data = await friendModel.getFriendLists(userid);
            if(data) {
                res.json({status: true, data: data});
            } else {
                res.json({status: false, data: null});
            }
        } catch (error) {
            
        }
    }
}

module.exports = FriendController;