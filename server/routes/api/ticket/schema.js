const { createSchema } = require('fastify-schema');

const submitTicketSchema = createSchema({
  body: {
    type: 'object',
    properties: {
      appid: { type: 'string', pattern: '^[0-9]+$' },
      name: { type: 'string' }, // Add the "name" field
      email: { type: 'string', format: 'email' },
      contactNo: { type: 'string', pattern: '^[0-9]{10}$' },
      query: { type: 'string' },
    },
    required: ['appid', 'name', 'email', 'contactNo', 'query'], // Update the required fields
  },
});

module.exports = {
  submitTicketSchema,
};
