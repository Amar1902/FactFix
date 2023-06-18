const fastify = require('fastify')();
const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection string
let uri = process.env.DB_URI;
const client = new MongoClient(uri);
module.exports = async function (fastify, opts) {

fastify.put('/updation', async (request, reply) => {
  try {
    console.log("test");
    const { id } = request.params;
    const { name } = request.body;

    // Connect to the MongoDB database
    await client.connect();
    const db = client.db('your-database-name');
    const collection = db.collection('users');

    // Update the name in the database
    await collection.updateOne(
      { _id: ObjectId(id) },
      { $set: { name: name } }
    );

    reply.send({ success: true, message: 'Name updated successfully' });
  } catch (error) {
    console.error(error);
    reply.status(500).send({ success: false, message: 'Failed to update name' });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
}
