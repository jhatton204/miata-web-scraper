const express = require('express');
const app = express();
const cron = require('cron');
const puppeteer = require('puppeteer');
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
// Database name
const dbName = 'scrapedData';
// Collection name
const collectionName = 'miataPrices';

// URL of the Facebook Marketplace page for Mazda Miata listings
const URL = 'https://www.facebook.com/marketplace/104039339632793/search/?query=miata';
const interval = '0 */12 * * *'; // Every 12 hours

// Function to store the scraped data in MongoDB
async function storeDataInDB(data) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted into the database.`);
  } catch (error) {
    console.error('Error storing data in MongoDB:', error);
  } finally {
    await client.close();
  }
}

// Function to scrape Mazda Miata prices from the Facebook Marketplace page
async function scrapeData() {
  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Open a new page within the browser
    const page = await browser.newPage();

    // Navigate to the Facebook Marketplace page
    await page.goto(URL);

    // Wait for at least one price element to appear on the page
    await page.waitForSelector('span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x676frb.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u', { timeout: 60000 });

    // Extract prices from the page using client-side JavaScript execution
    const prices = await page.evaluate(() => {
      // Select all elements containing Mazda Miata prices
      const priceElements = document.querySelectorAll('span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x676frb.x1lkfr7t.x1lbecb7.x1s688f.xzsf02u');
      const prices = [];

      // Iterate over the selected elements and extract their text content
      priceElements.forEach(element => {
        // Trim leading and trailing whitespace from the text content and add to the prices array
        prices.push({ price: element.textContent.trim() }); // Store each price as an object
      });

      return prices; // Return the array of prices as objects
    });

    // Close the browser instance
    await browser.close();

    return prices; // Return the array of prices scraped from the page
  } catch (error) {
    // Throw an error message if scraping fails
    throw new Error(`Error scraping data: ${error}`);
  }
}

// Create a cron job to scrape data at the specified interval
const job = new cron.CronJob(interval, async () => {
  try {
    const prices = await scrapeData();
    await storeDataInDB(prices); // Store the scraped data in MongoDB
  } catch (error) {
    console.error(error);
  }
});

// Start the cron job
job.start();

// Start the Express.js server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
