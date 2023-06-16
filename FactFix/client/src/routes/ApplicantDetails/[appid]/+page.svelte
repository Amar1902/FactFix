<script>
import { page } from '$app/stores'
import {onMount } from 'svelte'
import {api} from '../../../api/api'
import ApplicantDetails from '../../../component/ApplicantDetails.svelte';
let appid = $page.params.appid
let dataloaded = false
let application
let error = ''
onMount(async ()=>{
    try {
    let { application: lApplication} = await api.getApplicationDetails({appid})
    application = lApplication
    dataloaded = true

    }catch(e) {
        console.log('exception in processing request: ', e)
        error = JSON.stringify(e)
    }
})

// onMount(async ()=> {
//     try{
//     let { application: lApplication} = await api.getApplicationDetails({appid})
//     application = lApplication
//     dataloaded = true
    
// }catch(e) {
//         console.log('errorerrorerror: ', e)
//         error = JSON.stringify(e)
//     }
// })

</script>
{#if dataloaded}
<ApplicantDetails {application}/>

{:else if error}
<div>
    error in handing getApplicationDetails {JSON.stringify(error)}
</div>
{:else}
...loading
{/if}
