<script>
  import {api} from '../api/api'
  import { goto } from "$app/navigation";

  let applicantName;
  let email;
  let contact;
  let description;
  let appid;

  const onSave =async()=> {
    appid = Number(appid)
    let {error,errorMsg,ticket} =await api.saveTicket({applicantName,email,contact,description,appid})
    if(error){
      console.log('error is',errorMsg)
      return false
    }
    else {
      alert("Record saved successfully"); // Display the alert message
    }
  }
  console.log('applicantName is,',applicantName)
</script>

<!-- Page heading -->
<div class="grid grid-cols-12 bg-gray-300 shadow-2xl shadow-black md:space-x-8">
  <div class="col-span-2 flex ml-10 justify-start items-center  md:space-x-8">
    <img class="h-30 w-40 " src="./src/img/pngwing.png" alt="pcb logo" />
  </div>

  <div
    class="col-span-10 flex justify-start items-center text-center text-base md:text-4xl font-bold md:space-x-8"
  >
    FactFix : Candidate information correction system
  </div>
</div>

<!-- Back button on top -->

<div class="pl-3 pt-3">
  <button on:click={()=> goto("/dashboard") }
    class="bg-blue-500 text-white font-bold rounded-md px-4 py-2 hover:bg-blue-600 transition-colors"
  >
    Back
  </button>
</div>

<!-- Heading -->
<div class="text-center font-bold text-3xl">Create Ticket</div>

<!-- Input Fields -->
<div class="grid grid-cols-8 bg-gray-300">
  <!-- Enter AppId -->
  <div class="text-center text-2xl m-4 p-4">App Id:</div>
  <div class="m-2 p-4">
    <input
      type="text"
      bind:value={appid}
      class="border-gray-300 p-3 border rounded-md w-full"
      placeholder="Enter AppId"
    />
  </div>

  <!-- Name -->
  <div class="text-center text-2xl m-4 p-4">Name:</div>
  <div class="m-2 p-4">
    <input
      type="text"
      bind:value={applicantName}
      class="border-gray-300 p-3 border rounded-md w-full"
      placeholder="Enter Name"
    />
  </div>

  <!-- Email -->
  <div class="text-center text-2xl m-4 p-4">Email:</div>
  <div class="m-2 p-4">
    <input
      type="text"
      bind:value={email}
      class="border-gray-300 p-3 border rounded-md w-full"
      placeholder="Enter Email"
    />
  </div>

  <!-- Contact -->
  <div class="text-center text-2xl m-4 p-4">Contact No.:</div>
  <div class="m-2 p-4">
    <input
      type="text"
      bind:value={contact}
      class="border-gray-300 p-3 border rounded-md w-full"
      placeholder="Enter Contact No."
    />
  </div>
</div>

<!-- New Grid -->

<div class="grid grid-cols-3">
  <!-- Col 1 Row 1 -->
  <div class="text-xl font-bold ml-10 mt-10">Describe Query:</div>
  <!-- Col 2 Row 1 -->
  <div class="text-xl font-bold ml-10 mt-10">Upload Documents:</div>
  <!-- Col 3 Row 1-->
  <div />

  <!-- Col 1 Row 2 -->
  <div>
    <textarea
      bind:value={description}
      class="resize h-80 w-96 rounded-2xl m-10 p-4 bg-white border-2 border-black"
      placeholder="Enter query in details"
    />
  </div>
  <!-- Col 2 Row 2 -->

  <div class="col-span-1 flex">
    <input
      class=" mt-10 p-2 h-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-black dark:placeholder-gray-400"
      id="file_input"
      type="file"
    />
    <button
      class=" h-10 mt-10 ml-2 text-white font-bold bg-indigo-500 p-2 rounded"
      >Cancel</button
    >
  </div>
  <div />
  <div />
  <div class="">
    <button 
    on:click={onSave}
    class="text-white w-40 mr-4 font-bold bg-indigo-500 p-2 rounded">
      Save
    </button>
    <button class="text-white w-40 font-bold bg-indigo-500 p-2 rounded">
      Discard
    </button>
  </div>
  <div />
</div>
