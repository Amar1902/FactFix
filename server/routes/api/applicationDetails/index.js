'use strict'

module.exports = async function (fastify, opts) {
  let applicationSchema = fastify.mongo.db.collection("applications");

  fastify.get(
    "/getApplicationDetails/:appid",
    { schema: schemas.getApp },
    async function (request, reply) {
      try {
        let { appid } = request.params;
        // const id  = request.params.id;
        console.log("appid is : ", appid);

        appid = Number(appid)
        const application = await applicationSchema.findOne({ appid });
        console.log('applicaation is', application)
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


  fastify.put(
    "/updateApplication",
    { schema: schemas.getApp },
    async function (request, rep) {
      let appId = Number(request.body.appid);
      const newName = request.body.name;
      const newDob = request.body.dob;
      const newQualification = request.body.qualification;
      const newCategory = request.body.category;
      const newGender = request.body.gender;

      try {
        let result;
        console.log('appid is', appId)
        if (newName) {
           result = await applicationSchema.updateOne(
            { appid: appId },
            {
              $set: {
                "personalInfo.name": newName,
              },
            }
          );

        }else if(newDob){
          result = await applicationSchema.updateOne(
            { appid: appId },
            {
              $set: {
                "personalInfo.dob": newDob,
              },
            }
          );

        }
        else if(newQualification) {
          result = await applicationSchema.updateOne(
            {appid: appId},
            {
              $set: {
                  "personalInfo.qualification": newQualification,
              }
            }
          )
        } 
        else if(newCategory) {
          result = await applicationSchema.updateOne(
            {appid: appId},
            {
              $set: {
                  "personalInfo.category": newCategory
              }
            }
          )
        }
         else if(newGender){
          result = await applicationSchema.updateOne(
            {appid: appId},
            {
              $set: {
                  "personalInfo.gender": newGender
              }
            }
          )
        }

        result = await applicationSchema.findOne({appid:appId})
        console.log('result is../.....', result)
        return rep.send({ message: 'Name updated successfully',result })
      } catch (error) {
        console.error('Error updating name:', error);
        rep.code(500).send({ error: 'Internal Server Error' });
      }

    });


}