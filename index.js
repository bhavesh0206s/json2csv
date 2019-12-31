const keys = (json)=>{
  return Object.keys(json[0])
}

const json2Csv = (json)=>{
  let csvArr = []
  csvArr.push(keys(json))
  for(let i of json){
    csvArr.push(Object.values(i))
  }
  return csvArr
}

const convertCsvBtn = document.querySelector(".convert-csv")
const csvText = document.querySelector("#csv")
const jsonText = document.querySelector("#json")
const quote = document.querySelector('input[id="quote"]')
const heading = document.querySelector('input[id="labels"]')
const openJson = document.querySelector("#json-file")
const downloadBtn = document.querySelector("#download_link")

openJson.addEventListener("change", (e)=>{ 
    let input = e.target;
    let reader = new FileReader();
    reader.onload = ()=>{
        let text = reader.result;
        jsonText.textContent = text;
    }
    reader.readAsText(input.files[0]);
})

convertCsvBtn.addEventListener("click", (e)=>{
    try{
        let jsonObj = JSON.parse(json.value.trim())
        let csvArr = json2Csv(jsonObj)
        csvText.textContent = "";
        if(!heading.checked){
            csvArr.shift()
        }
        if(quote.checked){
            const quoteChecked = () => {
                for(let i = 0; i<csvArr.length; i++){
                    for(let j = 0; j<csvArr[i].length; j++){
                        csvArr[i][j] = String(csvArr[i][j])
                        let newKey = '"'+csvArr[i][j]+'"'
                        csvArr[i][j] = csvArr[i][j].replace(csvArr[i][j], newKey)
                    }
                }
            }
            quoteChecked();
        }
        csvArr.forEach((row)=>{
            csvText.innerHTML += `${row}\n<br/>`;
        })
    }
    catch{
        csvText.textContent = "";
        csvText.textContent = "Invalid JSON format"
    }
})

downloadBtn.addEventListener("click", ()=>{
    if(csvText.textContent == ""){
        alert("Sorry! You have not converted anything.")
        downloadBtn.removeAttribute("download")
    }
    else{
        let text = csvText.textContent;
        let data = new Blob([text], {type: "text/csv"});
        let url = window.URL.createObjectURL(data);
        downloadBtn.href = url;
        url = window.URL.createObjectURL(data);
        window.URL.revokeObjectURL(url);
    }
})