<script>
  import { createEventDispatcher } from "svelte";
  import { goto } from "$app/navigation";
  export let captcha;
  export let id;
  const dispatch = createEventDispatcher();
  let user = {
    login: null,
    password: null,
    captcha: {
      id: "",
      text: "",
    },
  };



  const checkValidation = () => {
    console.log('checkValidation called user is:', user)
    if (!user.login || !user.password || !user.captcha.text) {
      console.log('checkValidation called #1')
      return false;
    }

    const { login, password, captcha } = user;
    const lcaptcha = {
      id: id,
      text: captcha.text,
    };
    console.log('checkValidation called #2',lcaptcha)
    dispatch("signin", { login, password, captcha: lcaptcha });
    
    return true
  };

    // if (checkValidation()) {
    //   goto('/dashbord');
    // }
</script>

<!-- {JSON.stringify(user)} -->
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

<div
  class="flex min-h-full bg-gradient-to-r from-indigo-300  items-center justify-center py-5 px-10 sm:px-6 lg:px-8"
>
  <div
    class="w-full max-w-md shadow-2xl shadow-black pt-1 space-y-4 p-10 pb-6 bg-white shadow- rounded"
  >
    <div class="bg-white  rounded">
      <img
        class="h-20 ml-16 pl-20"
        src="./src/img/pngwing.png"
        alt="Your logo here"
      />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        Sign in to your account
      </h2>
    </div>

    <input type="hidden" name="remember" value="true" />

    <div class="space-y-px rounded-md shadow-xl border-4 p-4 bg-white">
      <div>
        <p class="font-bold">Email address</p>

        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          required
          name="email"
          type="email"
          autocomplete="email"
          class="relative block w-full rounded-t-md border-3 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 placeholder:text-grey placeholder:pl-6 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-4"
          placeholder="Email address"
          bind:value={user.login}
        />
      </div>

      <p class="font-bold">Password</p>
      <div>
        <input
          id="password"
          required
          name="password"
          type="password"
          autocomplete="current-password"
          class="relative block w-full rounded-b-md border-0 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 px-3 placeholder:text-grey focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Password"
          bind:value={user.password}
        />
      </div>
    </div>

    <div class="flex items-center justify-between bg-white rounded">
      <div class="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label for="remember-me" class="ml-2 block text-sm text-gray-900"
          >Remember me</label
        >
      </div>

      <div class="text-sm">
        <a href="/" class="font-medium text-indigo-600 hover:text-black"
          >Forgot your password?</a
        >
      </div>
    </div>

    <div class="space-y-6 rounded-md shadow-xl border-4 p-4 bg-white">
      <div class="flex justify-center font-bold bg-white text-black">
        Please Enter Captcha
      </div>

      <div
        class="flex flex-row h-auto m-2 w-44 md:w-56 lg:w-56 xl:w-54 2xl:-54 bg-white captcha-back pt-2"
        id="captcha"
      >
        {@html captcha}
      </div>

      <input
        type="text"
        class="flex h-9 w-full p-3 border-2 border-gray-300"
        placeholder="Enter captcha"
        bind:value={user.captcha.text}
      />
      <!-- <div class="flex flex-row mt-3 h-14">
        <button
          tabindex="-1"
          type="button"
          class="flex justify-center  mt-2 my-2 mx-1 bg-white hover:bg-orange-500 focus:outline-none w-full font-bold "
          on:click|preventDefault={getCaptcha}
        >

        </button>
      </div> -->
    </div>

    <button
      type="submit"
      class="w-full shadow-lg shadow-black bg-blue-500 hover:bg-blue-400 text-white text-3xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 font-bold rounded py-2 text-center"
      on:click={checkValidation}>Submit</button
    >
  </div>
</div>
