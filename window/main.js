let r = localStorage["r"];

try {
  r = JSON.parse(r);
} catch (_) {
  r = [];
}

let rTab = document.querySelector("#result-table");

function createTd(val, tr) {
  let td = document.createElement("td");
  td.innerHTML = val;
  tr.append(td);

  return td;
}
let last = r.slice(-1).pop();
console.log(last)
if(last){
  
  if (last["hit"] == "Hit") {
    console.log("hui");
    var audioSuccess = new Audio("success.mp3");
    audioSuccess.volume = 0.4;
    audioSuccess.play();
  }
  else{
    var audioSuccess = new Audio("fail.mp3");
    audioSuccess.volume = 0.4;
    audioSuccess.play();
  }
}


for (i of r) {
  
  let tr = document.createElement("tr");
  rTab.append(tr);

  createTd(i["x"], tr);
  createTd(i["y"], tr);
  createTd(i["r"], tr);
  let dateElem = createTd(i["date"], tr);
  let date = new Date(+dateElem.innerHTML);
  date = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  dateElem.innerHTML = date;
  createTd(i["execTime"], tr);
  createTd(i["hit"], tr);
}
