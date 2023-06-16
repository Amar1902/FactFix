"use strict";
const { default: fastify } = require("fastify");

module.exports = async function (fastify, opts) {
  let ticketSchema = await fastify.mongo.db.collection("ticket");
  fastify.post("/saveTicket",
  async function (request, reply) {
    try {
      let appid = Number(request.body.appid)
      let ticket = await ticketSchema.updateOne(
        { appid },
        {
          $set: request.body,
        },
        { upsert: true }
      );
      console.log("request body", request.body);
      return { error: 0, errorMsg: "", ticket: request.body };
    } catch (e) {
      console.log("error is saveTicket");
      return { error: 0, errorMsg: e };
    }
  });

  // fastify.post('/saveTickets', submitTicket);
  // async function submitTicket(request, reply) {
  //   try {
  //     let submitTicketSchema = fastify.mongo.db.collection('ticket');
  //     const ticketData = request.body; // Assuming the request body contains the form data

  //     // Perform data validation
  //     if (!ticketData.appid || !/^\d+$/.test(ticketData.appid)) {
  //       throw new Error('AppId should only contain numbers');
  //     }

  //     if (!ticketData.email || !isValidEmail(ticketData.email)) {
  //       throw new Error('Invalid email format');
  //     }

  //     if (!ticketData.contactNo || !/^\d{10}$/.test(ticketData.contactNo)) {
  //       throw new Error('Contact No. should be 10 digits');
  //     }

  //     // Insert the ticket data into the database
  //     const result = await collection.insertOne(ticketData);

  //     reply.send({
  //       message: 'Ticket submitted successfully',
  //       ticketId: result.insertedId.toString(), // Optional: If you want to return the inserted ticket ID
  //     });
  //   } catch (error) {
  //     reply.code(500).send({ error: error.message || 'Failed to submit ticket' });
  //   }
  // }

  // function isValidEmail(email) {
  //   // Use a regular expression or any email validation library to validate the email format
  //   // Example regular expression for basic email format validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }
};
