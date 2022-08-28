import Country from "./country.js";
let allCountries_ar = []
//**Create all common cuntries on first load */
export const createCommonCountries = (_ar = allCountries_ar) => { 
  document.querySelector("#id_country").innerHTML=""
  document.querySelector("#id_country").classList.add("row-cols-md-3")
  allCountries_ar = _ar;
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
  allCountries_ar = _.sortBy(allCountries_ar,"name.common")
  allCountries_ar.forEach(item =>{
    select.innerHTML +=`
    <option value="${item.name.common}">${item.name.common}</option>`;
  })
}
/** create single country UI */
export const createSingleCountry = input => {
  input = input.toLowerCase();
  document.querySelector("#id_country").innerHTML=""
  let ar = allCountries_ar.filter(item => item.name.official.toLowerCase().includes(input) || item.name.common.toLowerCase().startsWith(input) || item.name.common.toLowerCase().includes(input))
  document.querySelector("#id_load").classList.add("d-none");
  console.log(ar)
  if(ar[0]!= "null"){
    ar.forEach(item => {
      let country = new Country("#id_country",item);
      country.render();
    })
  }
  else{
    document.querySelector("#id_country").innerHTML="<h2>Country didn't found</h2>"
  }
} 
/**Get country code and return full cuntry name */
export const displayBorderName = async (code) =>{
  let url = `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`;
  let resp = await fetch(url);
  let data = await resp.json();
  let {name} = data[0];
  return name.common;
}