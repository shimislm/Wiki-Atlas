import { createCommonCountries, createSingleCountry } from "./countriesManager.js";

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
        search.value="";
        createSingleCountry(select.value)
    })
    window.onhashchange = function() {
        history.back;
       }
    search.addEventListener("keypress",(e)=>{
        if(e.key === "Enter"){
                createSingleCountry(search.value)
        }
        select.value="";
    })
    search_btn.addEventListener("click",()=>{
        select.value="";
        if(search.value.length <2){
            alert("Please insert minimm 2 letters")
        }
        else{
            createSingleCountry(search.value);
        }
        
    })
    usa_li.addEventListener("click",()=>{
        search.value="";
        select.value="";
        createSingleCountry("united states of america");
    })
    israel_li.addEventListener("click",()=>{
        search.value="";
        select.value="";
        createSingleCountry("israel");
    })
    thailand_li.addEventListener("click",()=>{
        search.value="";
        select.value="";
        createSingleCountry("thailand");
    })
    uk_li.addEventListener("click",()=>{
        search.value="";
        select.value="";
        createSingleCountry("united kingdom");
    })
    france_li.addEventListener("click",()=>{
        search.value="";
        select.value="";
        createSingleCountry("france");
    })
}