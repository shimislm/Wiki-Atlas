import { createCommonCountries, createSingleCountry, displayBorderName } from "./countriesManager.js";

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
        // console.log(this.latlng)
    }
    renderCommon() {
        let parent = document.querySelector(this.parent)
        let myDiv = document.createElement("div");
        myDiv.className = "country justify-content-between h-100 p-0";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML += `
        <div class="country-box bg-light border border-2 mx-md-2  rounded-4 opacity-100 text-dark h-100 p-2">
        <h2 class=" text-center mb-1 rounded-4" >Name: ${this.name}</h2>
        <div class="h-75 flag rounded-4 m-2 shadow" style="background-image:url(${this.flag}) ;">
        </div>
        <div class="h-50">
        <h4>Capital: ${this.capital}</h4>
        </div>

    </div>`
        let box = myDiv.querySelector(".country-box")
        box.addEventListener("click", () => {
            parent.innerHTML = "";
            this.render();
        })
    }
    render() {
        document.querySelector(this.parent).classList.remove("row-cols-lg-3")
        let countryName = [this.name];
        let myDiv = document.createElement("div");
        myDiv.className = "country w-100 row my-2 justify-content-between p-0";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML += `
        <div class="country-box bg-light mx-md-0 text-dark col-md-5 py-2 d-flex flex-column align-items-start">
        <h2 class=" text-center mb-1 rounded-4" >Name: ${this.name}</h2>
        <img class="rounded-4 align-self-center shadow m-2" src="${this.flag}" alt="${this.name}" width="100%">
        <h4>Capital: ${this.capital}</h4>
        <h6>Borders:<span class="borderLink"> No borders</span></h6>
        <h6>Population: ${this.pop}</h6>
        <h6>Languages: ${this.languages}</h6>
        <h6>Currency: ${this.currency} </h6>
        <h6>Region: ${this.region} </h6>
        <button class="btn btn-primary mt-2 text-end">Back</button>
        </div>
        <div class="map border border-white border-2 col-md-6 my-md-2 my-3 rounded-4 p-0 overflow-hidden">
        </div>
        `
        let map = myDiv.querySelector(".map")
        map.className = "country-box p-0 rounded-end-4 text-dark col-md-7 p-0"
        map.innerHTML = `
        <iframe 
            width="100%" 
            height="100%
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            src="https://maps.google.com/maps?q=${this.latlng[0]},${this.latlng[1]}&hl=en&z=5&amp;output=embed"
            >
        </iframe>
        `
        let btn = myDiv.querySelector(".btn")
        btn.addEventListener("click", () => {
            createCommonCountries();
        })
        const borders = myDiv.querySelector(".borderLink");
        console.log(borders)
        let neib = document.createElement("a")
        if (this.borders != "No Borders") {
            borders.innerHTML = " ";
            this.borders.forEach(async item => {
                countryName = await displayBorderName(item)
                neib.innerHTML += `<a class="linkBorder">${countryName}</a> `
                borders.append(neib)
            })   
        }
        
        let link = await borders.querySelector(".linkBorder")
        link.addEventListener("click", createSingleCountry(countryName))
    }
}