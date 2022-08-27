import Country from "./country.js";
let allCountries_ar = []
export const createCommonCountries = (_ar) => { 
  allCountries_ar = _ar;
  let startPage_ar = ["israel","united states","france","united kingdom","thailand"];
  startPage_ar = _ar.filter(item => startPage_ar.includes(item.name.common.toLowerCase()))
  document.querySelector("#id_load").classList.add("d-none");
  startPage_ar.forEach(item => {
        let country = new Country("#id_country",item, displayBorderName, createSingleCountry);
        country.renderCommon();
      })
}
export const createAllSelects=()=>{
  let select = document.querySelector("#id_select")
  allCountries_ar.forEach(item =>{
    select.innerHTML +=`
    <option value="${item.name.common}">${item.name.common}</option>`;
  })
}
export const createSingleCountry = input => {
  input = input.toLowerCase();
  document.querySelector("#id_country").innerHTML=""
  let input_ar = [input];
  input_ar = allCountries_ar.filter(item => input_ar.includes(item.name.common.toLowerCase()) || input_ar.includes(item.name.common.toLowerCase()))
  document.querySelector("#id_load").classList.add("d-none");
  input_ar.forEach(item => {
        let country = new Country("#id_country",item,displayBorderName, createSingleCountry);
        country.render();
      })

} 
const displayBorderName = async (code) =>{
  let url = `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`;
  let resp = await fetch(url);
  let data = await resp.json();
  // console.log(data)
  let {name} = data[0];
  // console.log(name.common)
  return name.common;
}