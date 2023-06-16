let apiServer = import.meta.env.VITE_APISERVER + "/api";

const getcaptcha = async () => {
  let url = new URL(`${apiServer}/auth/getcaptcha`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, captcha, id } = await reply.json();
    console.log('captcha is: ', captcha)
    console.log('error is: ', error)
    return { error, errorMsg, captcha, id };
  } catch (e) {
    console.log("api.getcaptcha failed with error :", e);
    return { error: -1, errorMsg: "exception in getting captcha" };
  }
};


const getCurrentDate = async () => {
  let url = new URL(`${apiServer}/application/getCurrentDate`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reply.status != 200) throw Error("Not found");

    const { error, errorMsg, currentDate } = await reply.json();
    return { error, errorMsg, currentDate };
  } catch (e) {
    console.log("api.getCurrentDate failed with error :", e);
    return { error: -1, errorMsg: "exception in getting current date" };
  }
};


const loginSupport = async ({ login, password, captcha }) => {
  let url = new URL(`${apiServer}/auth/loginSupport`);
  let params = {
    login,
    password,
    captcha,
  };
  console.log("captch is:", captcha.id);
  try {
    let reply = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { success, error, errorMsg, token, user } = await reply.json();
    console.log('loginSupport will return successfully ')
    return { success, error, errorMsg, token };
  } catch (e) {
    console.log("api.loginSupport failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }

};



const updateApplication = async ({appid, name, dob, qualification, category, gender}) => {
  let url = new URL(`${apiServer}/applicationDetails/updateApplication`);
  let params = {
    appid,name,dob,qualification,category,gender
  };
  console.log("appid is:", params);
  try {
    let reply = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (reply.status != 200) throw Error("Not found");

    const { success, error, errorMsg, result } = await reply.json();
    console.log(' Updated successfully ')
    return { success, error, errorMsg, result};
  } catch (e) {
    console.log("failed with error :", e);
    return { error: -1, errorMsg: e, success: false };
  }

};

  const saveTicket = async ({ applicantName,email,contact,description,appid }) => {
    let url = new URL(`${apiServer}/ticket/saveTicket`);
    let params = {
      applicantName,email,contact,description,appid
    };
    console.log("captch is:", params);

    try {
      let reply = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
  
      if (reply.status != 200) throw Error("Not found");
  
      const {  error, errorMsg, ticket} = await reply.json();
      console.log('saveTicket will return successfully ')
      return { error, errorMsg, ticket };
    } catch (e) {
      console.log("api.loginSupport failed with error :", e);
      return { error: -1, errorMsg: e, success: false };
    }
  };









const handleInput = async ({ appId, skip, limit }) => {
  let url = new URL(`${apiServer}/dashboard/getAllApplicationsPage?skip=${skip}&limit=${limit}`);

  try {

    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (reply.status != 200) throw Error("Not found");
    let applications = await reply.json()
    console.log('applications is', applications)
    return { applications }
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { error: -1, errorMsg: e }
  }
};

const getApplicationDetails = async ({appid}) => {
  let url = new URL(`${apiServer}/applicationDetails/getApplicationDetails/${appid}`);

  try {

    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (reply.status != 200) throw Error("Not found");
    let application = await reply.json()
    console.log('application is', application)
    return { application }
  } catch (error) {
    console.error("Error fetching application:", error);
    return { error: -1, errorMsg: e }
  }
};


const getQuery = async ({}) => {
  let url = new URL(`${apiServer}/dashboard/getQuery`);
  try {
    let reply = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (reply.status != 200) throw Error("Not found");
    let query = await reply.json()
    console.log('query is', query)
    return { query }
  } catch (error) {
    console.error("Error fetching application:", error);
    return { error: -1, errorMsg: e }
  }
}



// api/api.js
// const { connect, saveData } = require("./database");

// Connect to the MongoDB database
// connect();

// Save data to MongoDB
// const saveContent = async (field, value) => {
//   try {
//     await saveData(field, value);
//     isEditing = false;
//   } catch (error) {
//     console.error("Failed to save content", error);
//   }
// };

// module.exports = { saveContent };

export const api = {
  getcaptcha,
  loginSupport,
  getCurrentDate,
  handleInput,
  getApplicationDetails,
  updateApplication,
  saveTicket,
  getQuery
  // saveContent
} 
