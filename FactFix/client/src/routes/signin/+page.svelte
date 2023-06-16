<script>
    import Signin from "../../component/Signin.svelte";
    import { onMount } from "svelte";
    import { api } from "../../api/api";
    import { goto } from "$app/navigation";
    import { token } from "../../stores/stores";
    let captcha;
    let alertMsg = "";
    let id;
    onMount(async () => {
        // 1. getcaptcha
        console.log("about to call getcaptcha: ");
        const {
            error,
            errorMsg,
            captcha: lcaptcha,
            id: lid,
        } = await api.getcaptcha();
        console.log("error is: ", error);
        if (error) {
            alertMsg = errorMsg;
            return false;
        }
        console.log("error is: ", error);
        captcha = lcaptcha;
        id = lid;
        console.log("captch is ", id);
    });
    const signin = async (login, password, captcha) => {
        try {
            console.log("passed");
            console.log("login", login, password, captcha);
            // 1. Call API
            const {
                error,
                errorMsg,
                token: ltoken,
            } = await api.loginSupport({
                login,
                password,
                captcha,
            });
            if (error) {
                alertMsg = errorMsg;
                return false;
            }
            $token = ltoken;
            console.log('will be routed to dashboard')
            goto("/dashboard");
        } catch (e) {
            console.error("exception in sigin", e);
            return false;
        }
    };

    const onSignin = (e) => {
        const { login, password, captcha } = e.detail;

        signin(login, password, captcha);
    };
    // 1. call api

    // 2. api should return success or error
    // 3. if error return false
    // 4. if success then store token in store
    // 5. goto('/dashboard')

    const onCaptcha = () => {
        const { login, password, captcha } = e.detail;
    };
</script>



<!-- for tracing
    alertMsg is : {JSON.stringify(alertMsg)}
captcha is : {JSON.stringify(captcha)} -->
<Signin {captcha} {id} on:signin={onSignin} on:captcha={onCaptcha} />

{#if alertMsg}
    <div class="flex items-center justify-center bg-gray-200 text-red-600 p-3 rounded">{alertMsg}</div>
{/if}
<!-- 
alertMsg is : {JSON.stringify(alertMsg)}
captcha is : {JSON.stringify(captcha)} -->

<!-- for tracing
    alertMsg is : {JSON.stringify(alertMsg)}
captcha is : {JSON.stringify(captcha)} -->
<!-- <Signin 
{captcha}
on:signin={onSignin} 
on:captcha={onCaptcha} 
/> -->
