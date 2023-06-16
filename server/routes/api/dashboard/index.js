'use strict'

const { default: fastify } = require("fastify");
const debounce = require('lodash/debounce');

module.exports = async function (fastify, opts) {
  let applicationSchema = fastify.mongo.db.collection("applications");
  let ticketSchema = fastify.mongo.db.collection("ticket");

  const searchApplications = async (searchQuery) => {
    try {
      console.log('searchQuery',searchQuery)
      const skip = parseInt(request.query.skip) || 0;
      const limit = parseInt(request.query.limit) || 20;
      const totalCount = await applicationSchema.countDocuments({});
      const applications = await applicationSchema
        .find(
          { $or: [{ appid: searchQuery }, { 'personalInfo.name': searchQuery }, { 'personalInfo.email': searchQuery }] },
          { appid: 1, 'personalInfo.name': 1, 'personalInfo.category': 1, 'personalInfo.email': 1, 'personalInfo.mobile': 1 }
        )
        .skip(skip)
        .limit(limit)
        .toArray();

        console.log('applications is...',applications)
      return {
        skip,
        limit,
        totalCount,
        applications
      };
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw new Error('Internal Server Error');
    }
  }; 

  fastify.get("/searchApplications/:appid", async (request, reply) => {
    try {
      console.log('searchApplication api is called',request.params)
      // const searchQuery = request.query.searchQuery || '';
      const searchQuery = Number(request.params.appid);
      console.log('searchApplication api is called',searchQuery)

      const searchData = await searchApplications(searchQuery);
     return reply.send(searchData);
    } catch (error) {
      console.error('Error searching applications:', error);
     return reply.code(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.get(
    "/getInfo/:appid",
    { schema: schemas.getInfo},
    async function (request, reply) {
    try {
      let { appid } = request.params;
      // const id  = request.params.id;
      console.log("appid is : ", appid);
       
      appid = Number(appid)
      const application = await applicationSchema.findOne({ appid });
      console.log('application is',application)
    if (application) {
      return { application };
    } else {
      return { error: 'Record not found' };
    }
  } catch (error) {
    console.error('Error retrieving name:', error);
    reply.code(500).send({ error: 'Internal Server Error' });
  }

});

fastify.get("/getQuery",
{schema: schemas},
async function (request, reply) {
  try {
    const application = await ticketSchema.find({}).toArray();
    console.log('applicaation is', application)
    return {application}
    // if (application) {
    //   return { application };
    // } else {
    //   return { error: 'Record not found' };
    // }
  } catch (error) {
    console.error('Error retrieving name:', error);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

fastify.get('/getAllApplicationsPage', async (request, reply) => {
  try {
    const skip = parseInt(request.query.skip) || 0;
    const limit = parseInt(request.query.limit) || 20;
    console.log('query params are: ', JSON.stringify(request.query, null, 2))
    const totalCount = await applicationSchema.countDocuments({});
    const applications = await applicationSchema
      .find({}, { appid: 1, 'personalInfo.name': 1, 'personalInfo.category': 1, 'personalInfo.email': 1, 'personalInfo.mobile': 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    console.log('applications is ',applications)
    return {
      skip,
      limit,
      totalCount,
      applications
    };
  } catch (error) {
    console.error('Error fetching applications:', error);
    reply.code(500).send({ error: 'Internal Server Error' });
  }
});

fastify.get("/hello", async (request, reply) => {
  return {message:'Hello, World!'};
});


}