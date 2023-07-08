// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// /**
// * Check out the `createdAt` field below. This is set up to use Mongo's automatic document
// * expiration service by giving the Mongoose schema the `expires` property.
// * After 30 seconds, the session will automatically be removed from the collection!
// * (actually, Mongo's cleanup service only runs once per minute so the session
// * could last up to 90 seconds before it's deleted, but still pretty cool!)
// */
// const sessionSchema = new Schema({
//   cookieId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, expires: 30, default: Date.now }
// });

// module.exports = mongoose.model('Session', sessionSchema);

//create table in postgresql to store session information 
//information = sessionID, user ID, creation timestamp, cookieID, last access timestamp, etc
//when session is started, generation unique session ID -> assign session ID to the user and store it in the session table 
//update session table wh

// Yes, you can store sessions in PostgreSQL. PostgreSQL is a powerful relational database management system that supports various data types and provides advanced features for data storage and retrieval. While PostgreSQL does not have built-in session management functionality like some other databases, you can design your application to store session-related data in PostgreSQL tables.

// Here's a general approach to storing sessions in PostgreSQL:

// Design a session table: Create a table in PostgreSQL to store session-related information. The table could include columns such as session ID, user ID, creation timestamp, last access timestamp, and any other relevant data you need for your sessions.

// Generate and manage session IDs: When a user starts a session, generate a unique session ID, which can be a random string or a UUID. Assign this session ID to the user and store it in the session table along with other relevant data.

// Store session data: If your sessions require additional data, such as user preferences or temporary information, you can create additional tables to store that data. Use the session ID as a foreign key to associate the session data with the corresponding session in the session table.

// Manage session lifecycle: Update the session table whenever a user accesses or modifies their session. Update the last access timestamp column to track session activity. You can also implement session expiration mechanisms based on a certain duration of inactivity or a specific timeout period.

// Handle session retrieval and deletion: When a user needs to retrieve their session, use the session ID to fetch the corresponding session data from the session table or related tables. When a session expires or a user logs out, delete the session data from the tables to free up resources.