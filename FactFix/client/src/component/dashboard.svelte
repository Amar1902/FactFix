<script>
  import ApplicantDetails from "./ApplicantDetails.svelte";
  import Signin from "./Signin.svelte";
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  import { debounce } from "lodash";
  import { api } from "../api/api";

  import { onMount } from "svelte";
  const dispatch = createEventDispatcher();

  let name = "";
  let appId = "";
  let applications = [];
  let dataloaded = false;
  let skip = 0;
  let limit = 20;
  let pageCount = 0;
  let currentPage = 1;
  let queryA = [];
  // let query =  fetch (`http://localhost:5000/api/dashboard/getQuery`)
  onMount(async () => {
    let { applications: lapplications } = await api.handleInput({
      appId,
      skip,
      limit,
    });
    console.log("applications is", applications);
    applications = lapplications.applications;

    dataloaded = true;
  });

  const handleInput = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/dashboard/getAllApplicationsPage?skip=${skip}&limit=${limit}`
      );
      const data = await response.json();
      applications = data.applications;
      pageCount = Math.ceil(data.totalCount / limit);
      console.log("data is ", data);
      dataloaded = true;
      console.log("applications are: ", applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
 
  let query
  let ticket = false
const handleQuery = async () => {
  try {
    let {query:lquery} = await api.getQuery({})
    console.log("Query is: ",query)
    query = lquery.application
    ticket = true
  } catch (error) {
    console.error("Error fetching applications:", error);
    }
  };


  const filterInput = debounce(async () => {
    try {
      let reply = await fetch(
        `http://localhost:5000/api/dashboard/getInfo/${appId}`
      );
      const data = await reply.json();
      applications = [data.application];

      pageCount = Math.ceil(data.totalCount / limit);
      console.log("data is ", data);

      console.log("applications are: ", applications);
      if (reply.status != 200) throw Error("Not found");
      // const { success, error, errorMsg, token } = await reply.json();
      dataloaded = true;
      // return {error, errorMsg, token ,applications};
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  }, 1000); // if you want to change delay time for debounce change the value accordingly

  const debouncedHandleInput = debounce(filterInput, 1000);

  const goToPreviousPage = async () => {
    if (currentPage > 1) {
      currentPage--;
      console.log("skip is:", skip);
      console.log("limit is:", limit);
      skip = (currentPage - 1) * limit;
      console.log("skip is:", skip);
      await handleInput();
      goto(`/dashboard?skip=${skip}&limit=${limit}`);
    }
  };

  const goToNextPage = async () => {
    if (currentPage < pageCount) {
      currentPage++;
      console.log("skip is:", skip);
      console.log("limit is:", limit);
      skip = (currentPage - 1) * limit;
      console.log("skip is:", skip);
      await goto(`/dashboard?skip=${skip}&limit=${limit}`);
      await handleInput(skip, limit);
    }
  };

  const handleClick = async ({ appid }) => {
    console.log("Clicked on applicant details");

    try {
      console.log("Response:");

      let reply = await fetch("http://localhost:5000/api/dashboard/hello");
      const data = await reply.json();
      console.log("Response:", data);
      console.log("Clicked on applicant details route got hit");
      goto(`/ApplicantDetails/${appid}`);
      // Perform any additional actions with the response data
    } catch (error) {
      console.error("Error:", error);
    }
  };

  $: {
    if (appId) {
      debouncedHandleInput();
    }
  }

  handleInput();
</script>

<!-- {handleInput()} -->

<header class="sticky top-0">
  <div class="grid grid-cols-12  ">
    <div class="col-span-2 bg-gray-100 ">
      <img class="h-30 w-40 " src="./src/img/pngwing.png" alt="pcb logo" />
    </div>
    <div class="col-span-10 bg-gray-100  flex justify-between ">
      <div class=" flex justify-center items-center font-bold text-4xl">
        FactFix : Candidate information correction system
      </div>

      <div class="flex justify-center items-center">
        <button
          class="bg-indigo-500 flex items-start mx-5 p-3 rounded text-white text-xl border-3 border-black hover:bg-indigo-400"
          on:click={() => goto("/signin")}>Logout</button
        >
      </div>
    </div>
  </div>
  <div class="bg-white shadow-lg p-6">
    <!-- Dashboard heading -->
    <div
      class="flex text-white justify-between text-lg font-bold p-6 mb-6 bg-gray-600 mt-6  rounded-md"
    >
    <div>
      Fact-Fix Dashboard
    </div>
    <div>
      <button on:click={handleQuery} class="bg-white hover:bg-gray-100 rounded-lg text-gray-600 p-2">
        See All Queries
      </button>
      <button on:click={()=> goto("/Ticket") } class="bg-white hover:bg-gray-100 rounded-lg text-gray-600 p-2">Create Ticket</button>
    </div>
    </div>
    <div class="flex flex-row space-x-4">
      <!-- Input box and button -->
      <input
        type="text"
        bind:value={appId}
        on:input={debouncedHandleInput}
        class="border-gray-300 border rounded-md p-2 w-full"
        placeholder="Search by appid, name, emailid..."
      />
      <button
        class="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors"
        >Search</button
      >
    </div>
  </div>
</header>
<!-- Applicant summary -->
{#if dataloaded}

<!-- GRID -->
<div class=" grid grid-cols-2">
  <!-- column 1  -->
  <div class="grid">
    
    <div class="text-xl font-bold flex justify-center pt-3"> All Applications </div>
    <div
    class="bg-white flex-1 overflow-y-auto overflow-scroll shadow-md rounded my-6 m-4 cursor-pointer"
  >
    <table class="text-left w-full border-collapse ">
      <thead>
        <tr class="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th class="py-3 px-4 font-semibold text-center">App ID</th>
          <th class="py-3 px-4 font-semibold text-center">Name</th>
          <th class="py-3 px-4 font-semibold text-center">Category</th>
          <th class="py-3 px-4 font-semibold text-center">Email ID</th>
          <th class="py-3 px-4 font-semibold text-center">Mobile No</th>
        </tr>
      </thead>
      <tbody>
        {#each applications as application}
          <tr
            class="hover:bg-gray-100 border-b border-gray-200 py-10"
            on:click={handleClick({ appid: application.appid })}
          >
            <td class="py-3 px-4 text-center">{application.appid}</td>
            <td class="py-3 px-4 text-center"
              >{application.personalInfo.name}</td
            >
            <td class="py-3 px-4 text-center"
              >{application.personalInfo.category}</td
            >
            <td class="py-3 px-4 text-center"
              >{application.personalInfo.email}</td
            >
            <td class="py-3 px-4 text-center"
              >{application.personalInfo.mobile}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  </div>

  <!-- column 2 -->
  <div class="grid">
    <!-- <div class="text-xl font-bold flex justify-center">All Queries</div> -->
    <div class="flex-1 overflow-y-auto overflow-scroll shadow-md rounded my-6 m-4 cursor-pointer">
     
      
      {#if ticket}
      <table class="text-left w-full mt-9 shadow-md bg-white rounded">
        <thead>
          <tr class="bg-gray-600 text-white uppercase text-sm leading-normal">
            <th class="py-3 px-4 font-semibold text-center">App ID</th>
            <th class="py-3 px-4 font-semibold text-center">Name</th>
            <th class="py-3 px-4 font-semibold text-center">Contact no.</th>
            <th class="py-3 px-4 font-semibold text-center">Email ID</th>
            <th class="py-3 px-4 font-semibold text-center">Description</th>
          </tr>
        </thead>
        <tbody>
          {#each query as query}
            <tr
              class="hover:bg-gray-100 border-b border-gray-200 py-10"
            >
              <td class="py-3 px-4 text-center"
                >{query.appid}</td>
              <td class="py-3 px-4 text-center"
                >{query.applicantName}</td
              >
              <td class="py-3 px-4 text-center"
                >{query.contact}</td
              >
              <td class="py-3 px-4 text-center"
                >{query.email}</td
              >
              <td class="py-3 px-4 text-center"
                >{query.description}</td
              >
            </tr>
          {/each}
        </tbody>
      </table>
      {/if}
      </div>
  </div>
</div>



  <!-- <div
    class="bg-white flex-1 overflow-y-auto overflow-scroll shadow-md rounded my-6 m-4 cursor-pointer"
  >
    <table class="text-left w-full border-collapse ">
      <thead>
        <tr class="bg-gray-600 text-white uppercase text-sm leading-normal">
          <th class="py-3 px-4 font-semibold text-center">App ID</th>
          <th class="py-3 px-4 font-semibold text-center">Name</th>
          <th class="py-3 px-4 font-semibold text-center">Category</th>
          <th class="py-3 px-4 font-semibold text-center">Email ID</th>
          <th class="py-3 px-4 font-semibold text-center">Mobile No</th>
        </tr>
      </thead>
      <tbody>
        {#each applications as application}
          <tr
            class="hover:bg-gray-100 border-b border-gray-200 py-10"
            on:click={handleClick({ appid: application.appid })}
          >
            <td class="py-3 px-4 text-center">{application.appid}</td>
            <td class="py-3 px-4 text-center"
              >{application.personalInfo.name}</td
            >
            <td class="py-3 px-4 text-center"
              >{application.personalInfo.category}</td
            >
            <td class="py-3 px-4 text-center"
              >{application.personalInfo.email}</td
            >
            <td class="py-3 px-4 text-center"
              >{application.personalInfo.mobile}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div> -->
{/if}
<div class="inline-flex bg-gray-200 border-black border-2 rounded-lg m-2 p-2 items-center mt-4">
  {#if currentPage > 1}
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 border-black border-2 font-bold py-2 px-4 rounded-xl"
      on:click={goToPreviousPage}
    >
      Prev
    </button>
  {/if}

  <label
    class="block text-gray-700 border-3xl text-sm p-2 font-bold mx-2"
    for="page"
  >
    Page {currentPage} of {pageCount}
  </label>

  {#if currentPage < pageCount}
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 border-black border-2 font-bold py-2 px-4 rounded-xl"
      on:click={goToNextPage}
    >
      Next
    </button>
  {/if}
</div>
<!-- QUERYYYY -->
<!-- <div class="flex-1 overflow-y-auto overflow-scroll shadow-md rounded my-6 m-4 cursor-pointer">
<button on:click={handleQuery} class="bg-indigo-500 text-white p-2 hover:bg-indigo-400 rounded">
  Query
</button>

{#if ticket}
<table class="text-left w-full shadow-md bg-white rounded my-6 m-4  ">
  <thead>
    <tr class="bg-gray-600 text-white uppercase text-sm leading-normal">
      <th class="py-3 px-4 font-semibold text-center">App ID</th>
      <th class="py-3 px-4 font-semibold text-center">Name</th>
      <th class="py-3 px-4 font-semibold text-center">Contact no.</th>
      <th class="py-3 px-4 font-semibold text-center">Email ID</th>
      <th class="py-3 px-4 font-semibold text-center">Description</th>
    </tr>
  </thead>
  <tbody>
    {#each query as query}
      <tr
        class="hover:bg-gray-100 border-b border-gray-200 py-10"
      >
        <td class="py-3 px-4 text-center"
          >{query.appid}</td>
        <td class="py-3 px-4 text-center"
          >{query.applicantName}</td
        >
        <td class="py-3 px-4 text-center"
          >{query.contact}</td
        >
        <td class="py-3 px-4 text-center"
          >{query.email}</td
        >
        <td class="py-3 px-4 text-center"
          >{query.description}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
{/if}
</div> -->