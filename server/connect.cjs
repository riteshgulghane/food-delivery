// const { MongoClient } = require("mongodb");

// require("dotenv").config({ path: "./config.env" });

// const uri = process.env.ATLAS_URI;

// let client; // Store the MongoClient instance globally
// let database; // Store the database instance globally
// let collection; // Store the collection instance globally
// let inactivityTimeout; // Store the timeout ID

// const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes (example)
// const DATABASE_NAME = "fooddelivery";
// const COLLECTION_NAME = "restaurants";

// async function connectToDatabase() {
//   try {
//     client = new MongoClient(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await client.connect();
//     console.log("Connected to MongoDB");

//     database = client.db(DATABASE_NAME);
//     collection = database.collection(COLLECTION_NAME);

//     resetInactivityTimeout();
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }

// function resetInactivityTimeout() {
//   if (inactivityTimeout) {
//     clearTimeout(inactivityTimeout);
//   }

//   inactivityTimeout = setTimeout(async () => {
//     console.log("Inactivity timeout reached. Disconnecting from MongoDB.");
//     await disconnectFromDatabase();
//   }, INACTIVITY_TIMEOUT);
// }

// async function disconnectFromDatabase() {
//   if (client) {
//     try {
//       await client.close();
//       console.log("Disconnected from MongoDB");
//       client = null;
//       database = null;
//       collection = null;
//       inactivityTimeout = null;
//     } catch (error) {
//       console.error("Error disconnecting from MongoDB:", error);
//     }
//   }
// }

// // Example query function (use this for all your database operations)
// async function findDocuments(query) {
//   if (!collection) {
//     throw new Error(
//       "Not connected to the database. Call connectToDatabase() first."
//     );
//   }
//   resetInactivityTimeout(); // Reset the timeout on every query
//   return collection.find(query).toArray();
// }

// // Example insert function
// async function insertDocument(document) {
//   if (!collection) {
//     throw new Error(
//       "Not connected to the database. Call connectToDatabase() first."
//     );
//   }
//   resetInactivityTimeout(); // Reset the timeout on every query
//   return collection.insertOne(document);
// }

// // --- Example usage (in your main application code) ---
// async function MongoDBConnect() {
//   try {
//     // 1. Connect at application startup
//     await connectToDatabase();

//     // 2. Perform database operations (queries, inserts, updates, etc.)
//     const results = await findDocuments({});
//     console.log("Documents found:", results);

//     await insertDocument({ name: "New User", email: "new.user@example.com" });

//     // The connection will be automatically closed after INACTIVITY_TIMEOUT
//     // if no further database operations are performed.
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// export default MongoDBConnect;
