const NewsDataLayer = require("../Data/NewsDataLayer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const getQuotes = require("../utils/getContentFromUrl");
const getNewsList = require("../utils/getNews");
const News = require("../Models/NewsModel");
const ResponseData = require("../utils/Response");

const AddUpdateNews = async (req, res) => {
  var t = await getQuotes(
    "https://www.abqjournal.com/news/national/2-skiers-killed-after-being-caught-in-utah-avalanche-following-late-spring-snowstorms-sheriff-says/article_fa73f137-ac10-5ff0-8daf-a6fddf9fe2c2.html"
  );
  console.log(t);

  return res.json({});
};

const list = [
  "pub_3489442722065b43dadd8643310ef1c2a8f91",
  "pub_349477d5ff5716d908a9907b5ac9b563b99c7",
  "pub_3489611898016e3a4033e4934a3b65986ad3b",
  "pub_34897d530ee1741fd86916a227310fc1cd16f",
  "pub_34898e54c45634bcc1727e14fe541065defa9",
  "pub_348871c2b5f6668c3b458e8dfc6560a31ea68",
];

// const run = async () => {
//   try {
//     list.forEach(async (key) => {
//       for (let index = 0; index < 30; index++) {
//         try {
//           const data = fs.readFileSync("example.txt", "utf8");
//           console.log("File read successfully:", data);

//           let newsListData = await getNewsList(data, key);
//           console.log(newsListData)
//     //console.log(newsListData)
//          //let newsListData = warData;
//           // newsListData= await Promise.all(
//           //     newsListData.map(async(item )=>  ({ ...item, content : await getQuotes(item.link)}))
//           // )

//           console.log("running /.........................dfdfdffffffffffffffffffffffffffffffffffffffffffff)))))))))))))))))))))))))")

//           newsListData.forEach(async (element) => {
//             try {
//               //element.content = await getQuotes(element.link)
//               // console.log(element )
//                element.article_id =uuidv4();
//                //element.category= ['Sports']
//               NewsDataLayer.AddNews(element);
//             } catch (error) {
//               console.log(error);
//             }
//           });
//         } catch (error) {
//             console.log(error)
//         }

//        console.log(index, key);
//       }
//     });
//   } catch (error) {
//     console.log("not able to read file", error);
//   }

//   newsListData.forEach(element => {

//   });
//   //console.log(newsListData)
// };
const updateNewsDb = async (req, res) => {
  // var t = await getQuotes("https://www.abqjournal.com/news/national/2-skiers-killed-after-being-caught-in-utah-avalanche-following-late-spring-snowstorms-sheriff-says/article_fa73f137-ac10-5ff0-8daf-a6fddf9fe2c2.html")
  // console.log(t)
  //console.log("here");
  //run();
  addContent();

  return res.json({ status: "running" });
};

const updateDocument = async () => {
  try {
    const lst = await News.findOne({ content: null });
    console.log(lst);
    if (lst.link) {
      let content = [];
      try {
        content = await getQuotes(lst.link);
      } catch (error) {
        await NewsDataLayer.deleteNews(lst.news_id);
      }

      console.log(lst.news_id);
      await NewsDataLayer.updateNews(lst.news_id, content);
    } else {
      //delete
      await NewsDataLayer.deleteNews(lst.news_id);
      console.log("test");
    }
  } catch (error) {
    console.log(error);
  }
};

const addContent = async () => {
  for (let index = 0; index < 25000; index++) {
    await updateDocument();
  }
};

const getNews = async (req, res) => {
 // console.log(req.query);
  let defaultSearch = {};
  if (req.query) {
    defaultSearch = { ...defaultSearch, ...req.query };
  }
  if (req.query["image_url"]) {
    defaultSearch = { ...defaultSearch, image_url: { $ne: null } };
  }
  if (req.query["category"]) {
  //  console.log(defaultSearch['category'])
    defaultSearch["category"] = defaultSearch["category"].split(",");
  }
 
 // console.log(defaultSearch)
  //console.log(defaultSearch);
  const data = await NewsDataLayer.getNews(defaultSearch);
  // console.log(data);

  res.status(200).json({ status: "Sucess", data });
};

const searchNews = async (req, res) => {
  try {
    const search = req.body["search"];
    const data = await NewsDataLayer.searchNews(search);  
    
    res.status(200).json({ status: "Sucess", data });
  } catch (error) {
    console.log(error);
  }
};

function jsonToCSV(jsonObject, fileName) {
  // Create CSV headers and data rows from JSON object
  const csvRows = [];

  // Assume jsonObject is an array of objects
  if (jsonObject.length) {
    // Extract headers
    const headers = Object.keys(jsonObject[0]);
    csvRows.push(headers.join(","));

    // Extract data
    for (const row of jsonObject) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '\\"'); // Escape double quotes
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
  }
}

//jsonToCSV(jsonData, "example.csv");

function jsonToCSV(jsonObject) {
  const csvRows = [];
  // Check if the input is an array of objects
  if (jsonObject.length) {
    // Extract headers
    const headers = Object.keys(jsonObject[0]);
    csvRows.push(headers.join(","));

    // Extract data
    jsonObject.forEach((row) => {
      const values = headers.map((header) => {
        const value = row[header];
        if (Array.isArray(value)) {
          // Convert array to a comma-separated list enclosed in brackets
          return `"["${value.join(", ")}"]"`;
        } else if (typeof value === "object" && value !== null) {
          // Convert object to a simplified list-like string
          const objectEntries = Object.entries(value).map(
            ([key, val]) => `${key}: ${val}`
          );
          return `"{"${objectEntries.join(", ")}"}"`;
        } else {
          // Handle normal scalar values
          const escaped = ("" + value).replace(/"/g, '\\"'); // Escape double quotes
          return `"${escaped}"`;
        }
      });
      csvRows.push(values.join(","));
    });
  }

  return csvRows.join("\n");
}

const creatCsvfile = async (req, res) => {
  let data = await News.find({});
  console.log("working", data[0]);
  data = data.map((item) => item._doc);

  const csvData = jsonToCSV(data);
  const csvFilePath = "output.csv";
  // Write the CSV data to a file
  fs.writeFile(csvFilePath, csvData, (err) => {
    if (err) {
      console.error("Error writing the CSV file:", err);
    } else {
      console.log("CSV file has been saved successfully!");
    }
  });

  res.json(data);
};

const getNewsById = async (req, res) => {
  try {
    const query = req.params;
    console.log(query);

    const news_id = query["id"];
    const data = await NewsDataLayer.getNewsById(news_id);
    return res.status(200).json({ status: "Sucess", data });
  } catch (err) {}
};
const serviceStaus = (req, res) => {
  const data = "running";
  return res.status(200).json({ status: "Sucess", data });
};
const NewsController = {
  AddUpdateNews,
  updateNewsDb,
  getNews,
  creatCsvfile,
  getNewsById,
  serviceStaus,
  searchNews,
};
module.exports = NewsController;
