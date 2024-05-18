const  puppeteer = require("puppeteer");




 const getQuotes = async (url) => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  


  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
 
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  }).catch( async(err)=>{
    await browser.close();
  });

   // Get page data
   const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    const collection = document.getElementsByTagName("p");

    // Fetch the sub-elements from the previously fetched quote element
    // Get the displayed text and return it (`.innerText`)
    //const text = quote.querySelector(".text").innerText;
    //const author = quote.querySelector(".author").innerText;
 // console.log(quote, document)
  const content = [];
  if(collection){

   // var t = quote[0].innerText
//    const  content = quote.map(item=> item.innerText)

   Array.from(collection).forEach(function (element) {
    let text = element.innerText
  
    if(text){

        text = text.trim();
       text =text.replace(/\n/g, '')
        if(text.split(" ").length<10){
            text = null
        }
       
      if(text)
        content.push(text)
    }
});
   return content
  }
  return quote
   // return { text, author };
  });

  // Display the quotes
  console.log(quotes);

  // Close the browser
  await browser.close();
  return quotes;
};


module.exports = getQuotes;
