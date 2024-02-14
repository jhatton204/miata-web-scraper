# Miata Web Scraper

The Miata Web Scraper is a powerful web scraping tool designed to extract pricing information for Mazda Miata listings from the Facebook Marketplace. This tool utilizes Puppeteer, a headless browser automation library, to navigate through listings and capture pricing details with precision and efficiency.

## Key Features

- **Automated Data Extraction**: Utilizes Puppeteer to automate the process of navigating through Facebook Marketplace listings and extracting pricing information.
- **MongoDB Integration**: Seamlessly stores the extracted data in a MongoDB database for easy access, retrieval, and scalability.
- **Scheduled Scraping**: Offers the capability to set up automated scraping tasks at specified intervals using the Cron job scheduler.
- **Customizable**: Provides flexibility for customization, allowing users to adjust scraping parameters and adapt the tool to their specific requirements.

## How to Use

1. **Clone the Repository**: Clone this repository to your local machine using `git clone https://github.com/your-username/miata-web-scraper.git`.
2. **Install Dependencies**: Navigate to the project directory and install dependencies by running `npm install`.
3. **Set Up MongoDB**: Ensure you have MongoDB installed and running on your local machine. Update the MongoDB connection URI, database name, and collection name in the `server.js` file as needed.
4. **Run the Scraper**: Start the scraper by running `node server.js`. This will launch the scraping process, extracting pricing information from the specified Facebook Marketplace page for Mazda Miata listings.
5. **Customize Scraping Parameters**: Modify the scraping parameters in the `server.js` file according to your preferences, such as the URL of the Facebook Marketplace page and the scraping interval.

## Dependencies

- [Puppeteer](https://github.com/puppeteer/puppeteer): Headless Chrome Node.js API for browser automation.
- [MongoDB](https://www.mongodb.com/): A NoSQL database for storing the scraped data.
- [Cron](https://github.com/kelektiv/node-cron): A tool for scheduling tasks in Node.js.

## API

For additional functionality and data processing, check out the [Miata API](https://github.com/jhatton1/miata-api).
