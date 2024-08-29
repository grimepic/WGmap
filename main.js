// roliga kommentarer för att förklara allt

const mtext = document.getElementById("rooster") //ha ha cock

mtext.addEventListener("click", myFunction);

function myFunction() {
  mtext.style.color = "red"
}
function addZero(t) { // lägger till en siffra om det är en siffra 1 blir till 01
    if (t < 10) { t = "0" + t};
    return t
}
function getTime() { // klocka
    var date = new Date
    var h = date.getHours()
    var m = date.getMinutes()
    var s = date.getSeconds()
    h = addZero(h)
    m = addZero(m)
    s = addZero(s)
    var result = h + ":" + m + ":" + s
    return result
}
function getLektion(data, klass) {
    var results = [];
    const obj = data[klass].lessonInfo
    const datum = new Date()
    const dag = (datum.getDay())
    console.log(dag)
    const time = getTime()
    //console.log(obj)
    var rastcheck = true;
    for (const lektion of obj) {
        if ((lektion.dayOfWeekNumber == dag) && (lektion.timeEnd > time) && (lektion.timeStart < time)) { //yanderedev bör vara proud
            rastcheck = false
            var namn;
            if (lektion.blockName == "IND2FM") { // :C
                namn = "IND2FM"
            } else {
                namn = lektion.texts[0]
            }
            console.log(klass," har börjat", namn, "i klassrum", lektion.texts[Number(lektion.texts.length -1)])
            rastcheck = false
            var tois = [lektion.texts, lektion.timeStart, lektion.timeEnd]
            results.push(tois)
        }
    }
    return results;
}

function clearHTML() {
	let box = document.getElementsByClassName("box")[0];
	Array.from(box.children).forEach(child => child.remove());
}

function uppdateraHTML(text, klass) {
	let box = document.getElementsByClassName("box")[0];
	let child = document.createElement("p");
	child.innerHTML = klass+" har just nu "+text;
	box.appendChild(child);
}
function generateLektionFrånArray(currlektion) {
    let result = "";
    if(currlektion.length == 0) return "ingen lektion";
    for (lek_index in currlektion) {
        result+=currlektion[lek_index];
        if(lek_index < currlektion.length-1) result += " och ";

    }
    return result;
}
function uppdatera() {
	clearHTML();
    const program = ["TE23", "TE24", "ESMUS24", "FT24", "EK22A", "NA23"] //alla linjer jag tagit med
    fetch('classinfo.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        for (let i = 0; i < program.length; i++) {
           var currlektion = getLektion(data, program[i])
			uppdateraHTML(generateLektionFrånArray(currlektion), program[i]);
          // var skatext = program[i] + " har just nu " + currlektion[0][0] + " i " + currlektion[0][2]
           //console.log(skatext)
/*            console.log(currlektion)
           if (currlektion[3] == true) {
            console.log(program[i], "har rast just nu")
           } */


        }



    });
}

uppdatera();
setInterval(uppdatera, 5000)
