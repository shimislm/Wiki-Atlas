import { createSingleCountry } from "./countriesManager.js";

export const declareEvents = () => { 
    let select = document.querySelector("#id_select")
    let search =document.querySelector("#search-input");
    let search_btn =document.querySelector("#search-button");
    let usa_li =document.querySelector("#usa_link")
    let israel_li =document.querySelector("#israel_link")
    let france_li =document.querySelector("#france_link")
    let uk_li =document.querySelector("#uk_link")
    let thailand_li =document.querySelector("#thailand_link")
    select.addEventListener("change", ()=>{
        console.log(select.value)
        createSingleCountry(select.value)
    })
    search.addEventListener("keypress",(e)=>{
        console.log(e.key)
        if(e.key === "Enter"){
                createSingleCountry(search.value)
        }
    })
    search_btn.addEventListener("click",()=>{
        createSingleCountry(search.value);
    })
    usa_li.addEventListener("click",()=>{
        createSingleCountry("united states");
    })
    israel_li.addEventListener("click",()=>{
        createSingleCountry("israel");
    })
    thailand_li.addEventListener("click",()=>{
        createSingleCountry("thailand");
    })
    uk_li.addEventListener("click",()=>{
        createSingleCountry("united kingdom");
    })
    france_li.addEventListener("click",()=>{
        createSingleCountry("france");
    })
}