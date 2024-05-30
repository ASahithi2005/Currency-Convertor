const BASE = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// const BASE = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json";
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromcurr= document.querySelector(".from select");
let tocurr= document.querySelector(".to select");
let info = document.querySelector(".info");
for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if(select.name==="FROM" && currCode==="USD")
        {
            newOption.selected = "selected";     
        }
        else if(select.name==="TO" && currCode === "INR")
        {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{

        UpdateFlag(evt.target);
    })
}
const UpdateFlag = (element)=>{
        currCode = element.value;
        let countryCode = countryList[currCode];
        let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newsrc;
};
btn.addEventListener("click", async (element)=>{
    element.preventDefault();
    let amount = document.querySelector(".form input");
    let amtval = amount.value;
    if(amtval ==="" && amtval <= 1)
    {
        amtval = 1;
        amount.value = "1";
    }
    // console.log(tocurr.value.toLowerCase());
    
    const url = `${BASE}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    let from = fromcurr.value.toLowerCase();
    let to = tocurr.value.toLowerCase();
    let rate = data[from][to];
    // console.log(rate);
        let finalamt = amtval * rate;
        info.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`;
        
})
