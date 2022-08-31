import Country from "./country.js";
const allCountries_ar = []
//**Create all common cuntries on first load */
export const createCommonCountries = (_ar = allCountries_ar) => { 
  document.querySelector("#id_country").innerHTML=""
  document.querySelector("#id_country").classList.add("row-cols-md-3")
  // allCountries_ar.splice(0);
  allCountries_ar.splice(0,Infinity,..._ar);
  let startPage_ar = ["israel","united states","france","united kingdom","thailand"];
  startPage_ar = _ar.filter(item => startPage_ar.includes(item.name.common.toLowerCase()))
  // console.log(startPage_ar)
  document.querySelector("#id_load").classList.add("d-none");
  startPage_ar.forEach(item => {
        let country = new Country("#id_country",item);
        country.renderCommon();
      })
}
/**Create all countries to select input */
export const createAllSelects=()=>{
  let select = document.querySelector("#id_select")
  let sorted_arr = _.sortBy(allCountries_ar,"name.common")
  document.querySelector("#id_load").classList.add("d-none");
  sorted_arr.forEach(item =>{
    select.innerHTML +=`
    <option value="${item.name.common}">${item.name.common}</option>`;
  })
}
/** create single country UI */
export const createSingleCountry = input => {
  input = input.toLowerCase().replace(" ","");
  input.replace(" ", "")
  document.querySelector("#id_country").innerHTML=""
  let ar = allCountries_ar.filter(item =>
    // search by country official name 
  item.name.official.toLowerCase().includes(input) 
  // search by country code with 2 letters 
  ||item.cca2.toLowerCase().includes(input)
  // search by country code with 3 letters
  ||item.cca3.toLowerCase().includes(input)
  // search by country full name that includes input without spaces
  || item.name.common.replace(" ","").toLowerCase().includes(input) )
  document.querySelector("#id_load").classList.add("d-none");
  // Check if country exists acording to input
  if(ar.length > 0 ){
    ar.forEach(item => {
      let country = new Country("#id_country",item);
      country.render();
    })
  }
  // returns "Country didnt found massage"
  else{
    document.querySelector("#id_select").value = "";
    document.querySelector("#search-input").value = "";
    document.querySelector("#id_country").innerHTML=`<h2 class="display-1 bg-light rounded-4 p-3 w-100 text-center" >Country didn't found</h2>`
    setTimeout(function () {
      document.querySelector("#id_load").classList.add("d-none");
      document.querySelector("#id_country").innerHTML="";
      createCommonCountries();
  }, 2000);
  }
} 
/**Get country code and return full country name */
export const displayBorderName = async (code) =>{
  let url = `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`;
  let resp = await fetch(url);
  let data = await resp.json();
  let {name} = data[0];
  return name.common;
}