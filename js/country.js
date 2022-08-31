import {createCommonCountries, createSingleCountry, displayBorderName ,createWeather} from "./countriesManager.js";
export default class Country {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.name = _item.name.common;
        this.borders = _item.borders ? _item.borders : "No Borders";
        let corrency = Object.values(_item.currencies)
        this.currency = `${corrency[0].name} ${corrency[0].symbol}`;
        this.flag = _item.flags.png;
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        this.capital = _item.capital
        let languages = Object.values(_item.languages)
        this.languages = languages;
        this.region = _item.region;
        this.latlng = _item.latlng;
    }
    /**create first common cuntries*/
    renderCommon() {
        let parent = document.querySelector(this.parent)
        let myDiv = document.createElement("div");
        myDiv.className = "country justify-content-between h-100 p-0";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML +=`<div class="country-box bg-light border border-2 mx-md-2  rounded-4 opacity-100 text-dark h-100 p-2">
        <h2 class=" text-center mb-1 rounded-4" >Name: ${this.name}</h2>
        <div class="h-75 flag rounded-4 m-2 shadow" style="background-image:url(${this.flag}) ;">
        </div>
        <div class="h-50">
        <h4>Capital: ${this.capital}</h4></div></div>`
        let box = myDiv.querySelector(".country-box")
        box.addEventListener("click", () => {
            parent.innerHTML = "";
            this.render();
        })
    }
    /**create single or result of searched countries */
    render() {
        createWeather(this.latlng[0] ,this.latlng[1]);
        document.querySelector(this.parent).classList.remove("row-cols-lg-3")
        let myDiv = document.createElement("div");
        myDiv.style = "cursor: default;"
        myDiv.className = "country w-100 row my-2 justify-content-between p-0";
        // myDiv.style = "cursor: none;"
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML += `<div class="country-box bg-light mx-md-0 text-dark col-md-5 py-2 d-flex flex-column align-items-start" style="cursor: default;">
        <h2 class=" text-center mb-1 rounded-4" >Name: ${this.name}</h2>
        <img class="rounded-4 align-self-center shadow m-2" src="${this.flag}" alt="${this.name}" width="100%">
        <h4>Capital: ${this.capital}</h4>
        <h6 class="row borderLink align-items-center">Borders: No borders</h6>
        <h6>Population: ${this.pop}</h6>
        <h6>Languages: ${this.languages}</h6>
        <h6>Currency: ${this.currency} </h6>
        <h6>Region: ${this.region} </h6>
        <button class="btn btn-primary mt-2 text-end">Back</button></div>
        <div class="map border border-white border-2 col-md-6 my-md-2 my-3 rounded-4 p-0 overflow-hidden"></div>`
        // render the map
        let map = myDiv.querySelector(".map")
        map.className = "country-box p-0 rounded-end-4 text-dark col-md-7 p-0"
        map.innerHTML = `<iframe width="100%" height="100% frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&hl=en&z=5&amp;output=embed"></iframe> `
        // create back button
        let btn = myDiv.querySelector(".btn")
        btn.addEventListener("click", () => {
            createCommonCountries();
        })
        let borders = myDiv.querySelector(".borderLink");
        let borders_ar =  this.borders;
        // Create all borders one by one
        if (borders_ar!= "No Borders") {
            borders_ar.forEach(async (item, i) => {
                // Check wither arr is empty
              if(i >= 0){
                borders.innerHTML = "Borders:"
              }
              // Wait for for all border to be loaded
              const CountryName = await displayBorderName(item)
              let border = document.createElement("a");
              border.className = "singleBorder col-auto p-1"
              border.style = "cursor: pointer;";
              border.innerHTML = `${CountryName}`;
              borders.append(border);
              border.addEventListener("click", () => {
                createSingleCountry(CountryName)
              })
            })
          }
    }
}