const News = require("../Models/NewsModel");


const AddNews= async(newsData )=>{
    try {
        const news = new News({
            news_id: newsData.article_id,
            title: newsData.title,
            link: newsData.link,
            keywords:newsData.keywords,
            creator: newsData.creator,
           
            description: newsData.description,
            content: newsData.content,
            pubDate: newsData.pubDate,
            image_url: newsData.image_url,
            source_id: newsData.source_id,
           
            source_url: newsData.source_id,
            source_icon: newsData.source_icon,
            language: newsData.language,
            country: newsData.country,
            category: newsData.category
          });
    
    
         await news.save();
      
    } catch (error) {
        console.log(error)
    }

    
}

const updateNews = async (newsId, data)=>{

    try {
        
      
    const filter = { news_id: newsId };
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        content:data
      },
    };
    const result = await News.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    );
    } catch (error) {
        console.log(error)
        
    }
}
const deleteNews = async(newsId)=>{
    const filter = { news_id: newsId };
    const result = await News.deleteOne(filter);
    console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );
}


const NewsDataLayer = {
    AddNews,
    updateNews,
    deleteNews

}


module.exports = NewsDataLayer;