const News = require("../Models/NewsModel");
const UserEvents = require("../Models/UserEventsModel");

const AddUserEvent = async (userEvent) => {
  try {
    const userEventdata = new UserEvents({
      user_id: userEvent.user_id,
      type: userEvent.type,
      news_id: userEvent.news_id,
    });

    await userEventdata.save();
  } catch (error) {
    console.log(error);
  }
};
const getHistory = async (history, user_id) => {
  try {
    const data = await UserEvents.find({
      type: history.type,
      user_id: user_id,
    }).limit(5);

    const news_idList = data.map((item) => item.news_id);
    // const newsdata = await News.find({ news_id: { $in: news_idList } }).limit(
    //   5
    // );
    console.log(news_idList);
    const historylst = [];
    for (const id of news_idList) {
      const newsdata = await News.find({ news_id: id });
      console.log(newsdata);
      historylst.push(newsdata);
    }

    return historylst;
  } catch (error) {
    console.log(error);
  }
};

const UserEventDataLayer = {
  AddUserEvent,
  getHistory,
};

module.exports = UserEventDataLayer;
