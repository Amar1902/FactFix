<script>
  import Signin from "./Signin.svelte";
  import Dashboard from "./dashboard.svelte";
  import { goto } from "$app/navigation";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { api } from "../api/api";
  const dispatch = createEventDispatcher();
  export let application;
  application = application.application;
  
  // Edit Button script
  let user;
  let content = "";
  let inputValue = "";
  let isEditing = false;
  let editName=false;
  let editDate =false;
  let editQualification = false;
  let editCategory = false;
  let editGender = false;
  let uploadsLocation = "https://pcb01uploads.s3.ap-south-1.amazonaws.com/";


  const startEditing1=(field)=>{
    console.log()
    switch(field){
      case 'name':
        editName=!editName;
        break;
      case 'dob':
        editDate=!editDate;
        break;
      case 'qualification':
        editQualification=!editQualification;
        break;
      case 'category':
        editCategory=!editCategory;
        break;
      case 'gender':
        editGender=!editGender;
        break;
    }
  }

  const cancelEditing=(field)=>{
    console.log()
    switch(field){
      case 'name':
        editName=!editName;
        break;
      case 'dob':
        editDate=!editDate;
        break;
      case 'qualification':
        editQualification=!editQualification;
        break;
      case 'category':
        editCategory=!editCategory;
        break;
      case 'gender':
        editGender=!editGender;
        break;
    }
  }

  const saveContent = async(field) => {
    switch (field) {
      case "name":
      console.log('name is',inputValue)
        user = await api.updateApplication({appid:application.appid,name:inputValue})
        application.personalInfo.name = user.result.personalInfo.name
        inputValue=''
        editName=!editName
        break;
      case "dob":
        console.log('dob is',inputValue)
        user = await api.updateApplication({appid:application.appid,dob:inputValue})
        editDate=!editDate
        break;
      case "qualification":
        console.log('qualification is',inputValue)
        user = await api.updateApplication({appid:application.appid,qualification:inputValue})
        editQualification=!editQualification
        break;
      case "category":
        console.log('category is',inputValue)
        user = await api.updateApplication({appid:application.appid,category:inputValue})
        editCategory=!editCategory
        break;
      case "gender":
        console.log('gender is',inputValue)
        user = await api.updateApplication({appid:application.appid,gender:inputValue})
        editGender=!editGender
        break;

      default:
        return false;
    }
  };
</script>
<!-- {JSON.stringify(application)} -->

<!-- {JSON.stringify(application)} -->
<!-- {JSON.stringify(inputValue)} -->

<!-- Header -->
<div class="grid grid-cols-12 bg-gray-300 shadow-2xl shadow-black md:space-x-8">
  <div class="col-span-2 flex ml-10 justify-start items-center  md:space-x-8">
    <img class="h-30 w-40 " src="../src/img/pngwing.png" alt="pcb logo" />
  </div>

  <div class="col-span-10 flex justify-start items-center text-center text-base md:text-4xl font-bold md:space-x-8">
    FactFix : Candidate information correction system
  </div>
</div>
<!-- Header end -->




<div class="flex flex-col md:flex-row space-y-6 md:space-y-0">
  <!-- Left half -->
  <div />
  <div class="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg">
    <!-- back button -->
    <button
      class="bg-gray-200 hover:bg-blue-400 h-12 px-12 rounded font-bold"
      on:click={() => goto("/dashboard")}>Back</button>
    <!-- Applicant photo -->

    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src={uploadsLocation + application.uploads.photo}
      alt="Applicant photo"
      class="rounded w-64 h-60 mx-auto mb-4/"
    />

    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src={uploadsLocation + application.uploads.sign}
      alt="Applicant photo"
      class="w-32 h-30 mx-auto mb-4"
    />


    <!-- APPID and name -->
    <div
      class="flex justify-center bg-gray-300 rounded mb-6 p-6 font-bold text-xl"
    >
      APPID: {application.appid}
    </div>
    <!-- Applicant details -->
    <div class="grid grid-cols-12 gap-1 bg-gray-200">
      <div
        class="col-span-3 flex bg-gray-300 rounded items-center justify-end pr-6 text-black font-bold text-xl "
      >
        Name :
      </div>

      
      {#if editName}
        <div class="col-span-6 text-gray-800  p-6 items-center justify-center">
          <input
            type="text"
            id="first_name"
            bind:value={inputValue}
            class="bg-gray-50 border border-gray-300 w-72 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={application.personalInfo.name}
            required
          />
        </div>
      {:else}
        <div class="col-span-6 text-gray-800  p-6 items-center justify-center">
          {application.personalInfo.name}
        </div>
      {/if}


<!-- Edit button if else -->
    <div class="flex justify-center items-center text-white">

        {#if editName}
        
        <div class="col-span-2  flex items-center justify-end">
          
          <button
            class="px-2 py-1 border rounded-md text-white bg-green-500 hover:bg-green-600 mr-2"
            on:click={() => {
              saveContent("name");
            }}>Save</button>

          <button
            class="px-3 py-1 border rounded-md text-gray-700 hover:text-gray-800"
            on:click={()=>{cancelEditing('name')}}>Cancel</button>
        
        </div>
      {:else}
        <div
          class="border rounded-md px-2 py-1 text-gray-800 p-6 items-center justify-inline  "
        >
          {content}
        </div>
        <div class="col-span-3 flex justify-end items-center text-white">
          <button
            class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold"
            >View</button
          >
          <button
            class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold mx-4 "
            on:click={()=>{startEditing1('name')}}>Edit</button
          >
        </div>
      {/if}
  

        
      </div>

      <div
        class=" col-span-3 flex bg-gray-300 rounded items-center justify-end pr-6 text-black font-bold text-xl"
      >
        Date of Birth :
      </div>


      {#if editDate}
      <div class="col-span-6 text-gray-800  p-6 items-center justify-center">
        <input
        type="text"
        id="first_name"
        bind:value={inputValue}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={application.personalInfo.dob}
        required
      />
        </div>
      {:else}
        <div class="col-span-6 text-gray-800  p-6 items-center justify-center">
          {application.personalInfo.dob}
        </div>
      {/if}

      <div class="flex justify-center items-center text-white">
        {#if editDate}

          <div class="col-span-2  flex items-center justify-end">
            <button
              class="px-2 py-1 border rounded-md text-white bg-green-500 hover:bg-green-600 mr-2"
              on:click={() => {
                saveContent("dob");
              }}>Save</button
            >
            <button
              class="px-3 py-1 border rounded-md text-gray-700 hover:text-gray-800"
              on:click={()=>{cancelEditing('dob')}}>Cancel</button
            >
          </div>
        {:else}
          <div
            class="border rounded-md px-2 py-1 text-gray-800 p-6 items-center justify-inline  "
          >
            {content}
          </div>
          <div class="col-span-3 flex justify-end items-center text-white">
            <button
              class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold"
              >View</button
            >
            <button
              class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold mx-4 "
              on:click={()=>{startEditing1('dob')}}>Edit</button
            >
          </div>
        {/if}
      </div>

      <div
        class="col-span-3 flex bg-gray-300 rounded items-center justify-end pr-6 text-black font-bold text-xl"
      >
        Qualification :
      </div>




      {#if editQualification}
      <div class="col-span-6 text-gray-800  p-6 items-center justify-center">
        <input
              type="text"
              id="first_name"
              bind:value={inputValue}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bachelor's degree"
              required
            />
        </div>
      {:else}
      <div class="col-span-6 text-gray-800 p-6 items-center justify-center">
        Bachelor's degree
      </div>
      {/if}
      
      <div class="flex justify-center items-center text-white">
        {#if editQualification}
          <div>
            
          </div>
          <div class="col-span-2  flex items-center justify-end">
            <button
              class="px-2 py-1 border rounded-md text-white bg-green-500 hover:bg-green-600 mr-2"
              on:click={() => {
                saveContent("qualification");
              }}>Save</button
            >
            <button
              class="px-3 py-1 border rounded-md text-gray-700 hover:text-gray-800"
              on:click={()=>{cancelEditing('qualification')}}>Cancel</button
            >
          </div>
        {:else}
          <div
            class="border rounded-md px-2 py-1 text-gray-800 p-6 items-center justify-inline  "
          >
            {content}
          </div>
          <div class="col-span-3 flex justify-end items-center text-white">
            <button
              class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold"
              >View</button
            >
            <button
              class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold mx-4 "
              on:click={()=>{startEditing1('qualification')}}>Edit</button
            >
          </div>
        {/if}
      </div>

      <div
        class="col-span-3 flex bg-gray-300 rounded items-center justify-end pr-6 text-black font-bold text-xl"
      >
        Category :
      </div>
      
      
      {#if editCategory}
      <div class="col-span-6 text-gray-800  p-6 items-center justify-center">
        <input
              type="text"
              id="first_name"
              bind:value={inputValue}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={application.personalInfo.category}
              required
            />
        </div>
      {:else}
      <div class="col-span-6 text-gray-800 p-6 items-center justify-center">
        {application.personalInfo.category}
      </div>
      {/if}
      
      
      
      
      <div class="flex justify-center items-center text-white">
        {#if editCategory}
          <div>
            
          </div>
          <div class="col-span-2  flex items-center justify-end">
            <button
              class="px-2 py-1 border rounded-md text-white bg-green-500 hover:bg-green-600 mr-2"
              on:click={() => {
                saveContent("category");
              }}>Save</button
            >
            <button
              class="px-3 py-1 border rounded-md text-gray-700 hover:text-gray-800"
              on:click={()=>{cancelEditing('category')}}>Cancel</button
            >
          </div>
        {:else}
          <div
            class="border rounded-md px-2 py-1 text-gray-800 p-6 items-center justify-inline  "
          >
            {content}
          </div>
          <div class="col-span-3 flex justify-end items-center text-white">
            <button
              class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold"
              >View</button
            >
            <button
              class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold mx-4 "
              on:click={()=>{startEditing1('category')}}>Edit</button
            >
          </div>
        {/if}
      </div>

      <div
        class="col-span-3 flex bg-gray-300 rounded items-center justify-end pr-6 text-black font-bold text-xl"
      >
        Gender :
      </div>


      {#if editGender}
      <div class="col-span-6 text-gray-800  p-6 items-center justify-center">
        <input
              type="text"
              id="first_name"
              bind:value={inputValue}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={application.personalInfo.gender}
              required
            />
        </div>
      {:else}
      <div class="col-span-6 text-gray-800 p-6 items-center justify-center">
        {application.personalInfo.gender}
      </div>
      {/if}




      
      <div class="flex justify-center items-center text-white">
        {#if editGender}
          <div class="col-span-2  flex items-center justify-end">
            <button
              class="px-2 py-1 border rounded-md text-white bg-green-500 hover:bg-green-600 mr-2"
              on:click={() => {
                saveContent("gender");
              }}>Save</button
            >
            <button
              class="px-3 py-1 border rounded-md text-gray-700 hover:text-gray-800"
              on:click={()=>{cancelEditing('gender')}}>Cancel</button
            >
          </div>
        {:else}
          <div
            class="border rounded-md px-2 py-1 text-gray-800 p-6 items-center justify-inline  "
          >
            {content}
          </div>
          <div class="col-span-3 flex justify-end items-center text-white">
            <button
              class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold"
              >View</button
            >
            <button
              class="bg-blue-500 hover:bg-blue-600 h-12 px-12 rounded font-bold mx-4 "
              on:click={()=>{startEditing1('gender')}}>Edit</button
            >
          </div>
        {/if}
      </div>
    </div>
  </div>

  <!-- Right half -->
  <div class="w-full md:w-1/2 ml-2">
    <!-- Document view -->
    <div class="bg-white shadow-sm rounded-lg h-full">
      <iframe
        src={uploadsLocation + application.uploads.dob}
        title="Amar Hanumant Khawale.pdf"
        class="h-full w-full rounded"
      />
    </div>
  </div>
</div>
