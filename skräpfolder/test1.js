import fetch from 'node-fetch';
import fs from "fs"
import axios from 'axios';
import { time } from 'console';

async function getKey() {
    try {
      const response = await axios.post(
        "https://web.skola24.se/api/get/timetable/render/key",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
          },
        },
      );
      return response.data.data.key;
    } catch (error) {
      console.error("Error in getKey:", error);
      throw error; // Rethrow the error for further handling if necessary
    }
}
async function getSignature() {
    try {
        const response = await fetch(
          "https://web.skola24.se/api/encrypt/signature",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
            },
            body: JSON.stringify({ "signature": "NzNlNDg3ZDctNTFlNC1mNmEzLTliNTctM2NhODA4NGI3ZGZl" }),
          },
        );
    
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
    
        const data = await response.json();
        return data.data.signature;
      } catch (error) {
        console.error("Error in getSignature:", error);
    }
}

async function getTimetable(
    signature,
    key
    ) {
    try {
      const response = await fetch(
        "https://web.skola24.se/api/render/timetable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-Scope": "8a22163c-8662-4535-9050-bc5e1923df48",
          },
          body: JSON.stringify({
            renderKey: String(key),
            selection: String(signature),
            scheduleDay: Number(0),
            week: Number(35),
            year: Number(2024),
            host: String("gotland.skola24.se"),
            unitGuid: String("MDk0MDNhNzYtNDI2OS1mYWM1LTgzYmItNzMyMWI4OTlmYzVj"),
            schoolYear: String("e88b51a8-2362-42e0-89bf-27bc00b253a9"),
            startDate: null,
            endDate: null,
            blackAndWhite: false,
            width: 1223,
            height: 550,
            selectionType: 4,
            showHeader: false,
            periodText: "",
            privateFreeTextMode: false,
            privateSelectionMode: null,
            customerKey: "",
          }),
        },
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
}










let key;
getKey().then(result => {
  key = result
  console.log("key: ", key)
 // console.log(typeof key)
})
let sign;
getSignature().then(result => {
  
  sign = result
  console.log("signatur: ", sign)
//  console.log(typeof sign)
})


let results;

getTimetable(key, sign).then(result => {
  
    results = result
    console.log("result: ", results)
    console.log(typeof result)
})



function temp() {
    JSON.stringify({
        renderKey: key,
        selection: sign,
        scheduleDay: 0,
        week: 35,
        year: 2024,

        host: `gotland.skola24.se`,
        unitGuid: "",
        schoolYear: "e88b51a8-2362-42e0-89bf-27bc00b253a9",
        startDate: null,
        endDate: null,
        blackAndWhite: false,
        width: 125,
        height: 550,
        selectionType: 0,
        showHeader: false,
        periodText: "",
        privateFreeTextMode: null,
        privateSelectionMode: false,
        customerKey: "",
      })
}
