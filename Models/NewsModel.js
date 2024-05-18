const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    news_id: { type: String , required: true, unique: true },
    title: { type: String },
    link: { type: String },
    keywords: [{ type: String }],
    creator: [{ type: String }],
   
    description: { type: String },
    content:[ { type: String }],
    pubDate: { type: Date },
    image_url: { type: String },
    source_id: { type: String },
   
    source_url: { type: String },
    source_icon: { type: String },
    language: { type: String, default :'english' },
    country: [{ type: String }],
    category: [{ type: String }]

})


const News = mongoose.model('News', NewsSchema)


module.exports = News