import { createCommonCountries , createSingleCountry,displayBorderName } from "./countriesManager";

export default class Country{
    constructor(_parent , _item){
        this.parent = _parent;
        this.name = _item.name.common;
        let borders = Object.values(_item.borders)
        this.borders = borders ? borders : "No Borders" ;
        let corrency = Object.values(_item.currencies)
        this.currency = `${corrency[0].name} ${corrency[0].symbol}`;
        this.flag = _item.flags.svg;
        this.pop = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        this.capital = _item.capital
        let languages = Object.values(_item.languages)
        this.languages = languages;
        this.region = _item.region;
        this.displayBorderName = displayBorderName;
        this.createSingleCountry = createSingleCountry

    }
    renderCommon(){
        let parent = document.querySelector(this.parent)
        let myDiv = document.createElement("div");
        myDiv.className = "country justify-content-between h-100";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML += `
        <div class="country-box text-bg-warning rounded-4 opacity-100 text-dark h-100 p-2">
        <div class="h-75 flag rounded-4" style="background-image:url(${this.flag}) ;">
        </div>
        <div class="h-50">
        <h2>Name: ${this.name}</h2>
        <h2>Capital: ${this.capital}</h2>
        </div>

    </div>`
    let box = myDiv.querySelector(".country-box")
        box.addEventListener("click", ()=>{
            parent.innerHTML="";
            this.render();
        })
    }
    render(){
        document.querySelector(this.parent).classList.remove("row-cols-md-3")
        let countryName = [this.name];
        let myDiv = document.createElement("div");
        myDiv.className = "country row my-2 justify-content-between";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML += `
        <div class="country-box border text-bg-warning rounded-4 opacity-100 text-dark col-md-5 py-2">
        <img src="${this.flag}" alt="${this.name}" width="100%">
        <h2>Name: ${this.name}</h2>
        <h2>Capital: ${this.capital}</h2>
        <h4 class="full_border">Borders:</h4>
        <h6>Population: ${this.pop}</h6>
        <h6>Languages: ${this.languages}</h6>
        <h6>Currency: ${this.currency} </h6>
        <h6>Region: ${this.region} </h6>
        <button class="btn btn-primary mt-2 text-end">Back</button>
        </div>
        <div class="map border col-md-6 rounded-4 p-0">
        </div>
        
        `
        let map =myDiv.querySelector(".map")
        map.innerHTML =`
        <iframe class="rounded-4 border border-dark" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3487012.6004784335!2d35.081815549999995!3d31.406252499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1siw!2sil!4v1661624962274!5m2!1siw!2sil" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        `
        let btn = myDiv.querySelector(".btn")
        btn.addEventListener("click",()=>{
            createCommonCountries();
        })
        let borderLink = myDiv.querySelector(".full_border");
        const borderArr =[];
        if(borderArr){
            this.borders.forEach(async item =>{
                countryName =await displayBorderName(item)
                borderLink.innerHTML +=  `<span class="li"> ${countryName} |</span>`
                borderArr.push(countryName);
            })
        }
        borderArr.forEach(item =>{
            borderLink.querySelector(".li").addEventListener("click", createSingleCountry(item))
            console.log(borderArr)
        })
        
        
    }
}