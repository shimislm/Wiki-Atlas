import {createCommonCountries, createAllSelects} from "./countriesManager.js"
import {declareEvents} from "./viewEvents.js"
const init = () =>{
    doApi();
    declareEvents()
}
const doApi = async() =>{
    document.querySelector("#id_load").classList.remove("d-none");
    let url = "https://restcountries.com/v3.1/all";
    let resp = await fetch(url);
    let data = await resp.json();
    // console.log(data);
    data = data.filter(item => item.name.common != "Palestine")
    createCommonCountries(data);
    createAllSelects()
}

init();