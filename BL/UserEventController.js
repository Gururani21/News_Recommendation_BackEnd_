const UserEventDataLayer = require("../Data/UserEventDataLayer");


const AdduserEvent = async(req, res)=> {
    try {
        
        const data = req.body;
        await UserEventDataLayer.AddUserEvent(data);

        res.status(200).json({ status: "Sucess", data });
        
    } catch (error) {
        console.log(error)
    }

    

}
const getUserHistory = async (req, res)=>{
    try {

        const query = req.params;
        console.log(query);
    
        const user_id = query["id"];
        
        const data = req.body;
      const historydata=   await UserEventDataLayer.getHistory(data, user_id);

        res.status(200).json({ status: "Sucess", data:historydata });
        
    } catch (error) {
        console.log(error)
    }
}
const UserEventController = {
        AdduserEvent,
        getUserHistory
  
  };
  module.exports = UserEventController;