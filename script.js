const countries={
    AED: "AE",
    AFN: "AF",
    ARS: "AR",
    AUD: "AU",
    BDT: "BD",
    BRL: "BR",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    COP: "CO",
    DOP: "DO",
    EGP: "EG",
    EUR: "FR",
    FJD: "FJ",
    HKD: "HK",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    JMD: "JM",
    JPY: "JP",
    KWD: "KW",
    LKR: "LK",
    MMK: "MM",
    MXN: "MX",
    NPR: "NP",
    NZD: "NZ",
    PKR: "PK",
    QAR: "QA",
    RUB: "RU",
    SAR: "SA",
    SGD: "SG",
    THB: "TH",
    TRY: "TR",
    USD: "US",
    VND: "VN",
};
let dropdowns=document.querySelectorAll("select");
let i=0;
for(let dropdown of dropdowns){
    i++;
    for(let country in countries){
        newOption=document.createElement("option");
        newOption.innerText=country;
        newOption.value=country;
        if(i===1 && newOption.innerText==="USD"){
            newOption.selected="selected";
        }else if(i===2 && newOption.innerText==="INR"){
            newOption.selected="selected";
        }
        dropdown.append(newOption);
    }
    dropdown.addEventListener("change", (obj)=>{
        updateFlag(obj.target);
    });
}

function updateFlag(obj){
    let url=`https://flagsapi.com/${countries[obj.value]}/flat/64.png`;
    if(obj.id==="first"){
        let img=document.querySelector(".left-image img");
        img.src=url;
    }else if(obj.id==="second"){
        let img=document.querySelector(".right-image img");
        img.src=url;
    }
}

let input=document.querySelector("input");
if(input.value<=0 || input.value==""){
    input.value=1;
}

let btn=document.querySelector("form button");
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let firstSelect=document.querySelector("#first");
    let secondSelect=document.querySelector("#second");
    let URL=`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${firstSelect.value.toLowerCase()}/${secondSelect.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let finalValue=input.value*data[secondSelect.value.toLowerCase()];
    document.querySelector(".msg").innerText=`${input.value} ${firstSelect.value} = ${finalValue} ${secondSelect.value}`;
    document.querySelector(".final-msg").innerText=`The conversion rate of 1 ${firstSelect.value} is ${data[secondSelect.value.toLowerCase()]} ${secondSelect.value} as of ${data["date"]}`;
});