let r="http://13.127.112.220:8080";let e={findCompany:async({district:e,licenseType:t,licenseNo:o})=>{let s={district:e,licenseNo:o,licenseType:t},a=new URL(`${r}/exciserecords/findCompany`);Object.keys(s).forEach((r=>a.searchParams.append(r,s[r])));try{let r=await fetch(a.toString(),{method:"GET",headers:{"Content-Type":"application/json"}});if(200!=r.status)throw Error("Company not found");const e=await r.json(),{error:t,errorMsg:o,exciserecord:s}=e;return{error:t,errorMsg:o,company:s}}catch(i){return console.log("api.findCompany failed with error :",i),{error:-1,errorMsg:i}}},validateGstLastFour:async({company:e,gstLastFour:t})=>{let o=new URL(`${r}/exciserecords/validateGstLastFour`),s={licenseNo:e.licenseNo,licenseType:e.licenseType,district:e.district,gstLastFour:t};Object.keys(s).forEach((r=>o.searchParams.append(r,s[r])));try{let r=await fetch(o.toString(),{method:"GET",headers:{"Content-Type":"application/json"}});if(200!=r.status)throw Error("Not found");const{matched:e,gstLastFour:t}=await r.json();return e?{error:0,errorMsg:"",matched:e,gstLastFour:t}:{error:-1,errorMsg:"GST last for did not match",matched:e,gstLastFour:t}}catch(a){return console.log("api.registerLicensee failed with error :",a),{error:-1,errorMsg:a}}},registerLicensee:async({name:e,email:t,mobileno:o,licenseInfo:s})=>{let a=new URL(`${r}/auth/registerLicensee`),i={name:e,email:t,mobileno:o,licenseInfo:s};try{let r=await fetch(a.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(200!=r.status)throw Error("Not found");return{error:0,errorMsg:"",registrionResult:await r.json()}}catch(n){return console.log("api.registerLicensee failed with error :",n),{error:-1,errorMsg:n}}},validateVerificationCode:async({licenseNo:e,verificationId:t,verificationCode:o})=>{let s=new URL(`${r}/auth/validateVerificationCode`),a={licenseNo:e,verificationId:t,verificationCode:o};try{let r=await fetch(s.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(200!=r.status)throw Error("Not found");const{matched:e,login:t,errorMsg:o}=await r.json();return e?{error:0,errorMsg:o,matched:e,login:t}:{error:-1,errorMsg:o,matched:e}}catch(i){return console.log("api.registerLicensee failed with error :",i),{error:-1,errorMsg:i}}},createLogin:async({login:e,password:t,verificationId:o})=>{let s=new URL(`${r}/auth/createLogin`),a={login:e,password:t,verificationId:o};try{let r=await fetch(s.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(200!=r.status)throw Error("Not found");const{success:e,error:t,errorMsg:o}=await r.json();return{success:e,error:t,errorMsg:o}}catch(i){return console.log("api.createLogin failed with error :",i),{error:-1,errorMsg:i,success:!1}}},login:async({login:e,password:t,captcha:o})=>{let s=new URL(`${r}/auth/login`),a={login:e,password:t,captcha:o};console.log("input params are: ",a);try{let r=await fetch(s.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(200!=r.status)throw Error("Not found");const{success:e,error:t,errorMsg:o,token:i,user:n}=await r.json();return console.log("token is: ",i),console.log("user is: ",n),{success:e,error:t,errorMsg:o}}catch(i){return console.log("api.login failed with error :",i),{error:-1,errorMsg:i,success:!1}}},forgotPassword:async({login:e})=>{let t=new URL(`${r}/auth/forgotPassword`),o={login:e};try{let r=await fetch(t.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(200!=r.status)throw Error("Not found");const{success:e,error:s,errorMsg:a}=await r.json();return{success:e,error:s,errorMsg:a}}catch(s){return console.log("api.forgotPassword failed with error :",s),{error:-1,errorMsg:s,success:!1}}},verifyResetPasswordId:async({resetId:e})=>{let t=new URL(`${r}/auth/verifyResetPasswordId`),o={resetId:e};try{let r=await fetch(t.toString(),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(200!=r.status)throw Error("Not found");const{valid:e,error:s,errorMsg:a,login:i}=await r.json();return{valid:e,error:s,errorMsg:a,login:i}}catch(s){return console.log("api.verifyResetPasswordId failed with error :",s),{valid:!1,error:-1,errorMsg:s}}},getcaptcha:async()=>{let e=new URL(`${r}/auth/getcaptcha`);try{let r=await fetch(e.toString(),{method:"GET",headers:{"Content-Type":"application/json"}});if(200!=r.status)throw Error("Not found");const{error:t,errorMsg:o,captcha:s,id:a}=await r.json();return{error:t,errorMsg:o,captcha:s,id:a}}catch(t){return console.log("api.verifyResetPasswordId failed with error :",t),{error:-1,errorMsg:"exception in getting captcha"}}}};export{e as a};