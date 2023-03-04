import React, { useEffect } from "react";
import { useState } from "react";
import { getCookie } from "../firebase/firebaseFuntions";

export default function () {
  const [time, setime] = useState(0);
  const [timeD, settimeD] = useState(0);
  const [title, settitle] = useState();

  function startClock(milliseconds) {
    let intervalId = setInterval(() => {
      let seconds = Math.floor(milliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
  
      seconds %= 60;
      minutes %= 60;
      hours %= 24;
  
      let formattedHours = hours < 10 ? "0" + hours : hours;
      let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
  
      let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      setime(formattedTime) // Output the time to the console
      milliseconds -= 1000; // Decrement the milliseconds every second
      if (milliseconds < 0) {
        clearInterval(intervalId); // Stop the interval if we've reached 0 milliseconds
        setime()
      }
    }, 1000); // Run the callback function every 1000ms (1 second)
  }
  

  function startCalcul(time) {
    var times = time / 1000;
    times = Math.floor(times);
    setInterval(() => {
      times--;
      setime(Math.floor(times / 60));
      if (times > 1) return;
    }, 1000);
  }

  useEffect(() => {
    var settingTime = 24 * 60 * 60 * 10000;
    fetch("http://65.20.97.122/api/sessionAdmin?userId="+getCookie('id'))
      .then((response) => response.json())
      .then((data) => {
        data.map((e) => {
          var givenDate = new Date(e.startDate);
          var currentDateTime = new Date();
          if (
            givenDate.getFullYear() === currentDateTime.getFullYear() &&
            givenDate.getMonth() === currentDateTime.getMonth() &&
            givenDate.getDay() === currentDateTime.getDay()
          ) {
            console.log(givenDate + " " + currentDateTime);
            console.log(givenDate - currentDateTime);
            if (givenDate - currentDateTime > 0) {
              settingTime = Math.min(settingTime, givenDate - currentDateTime);
              //startCalcul(settingTime);
              startClock(settingTime)
              return;
            }
          } else {
          }
        });
      })
      .catch((error) => {
        // handle the error here
      });
  }, []);

  return (
    <div className="flex items-center text-green-800 space-x-3 w-full bg-white pb-4">
      {time != 0 ? (
        <>
          <p className="font-medium text-normal">Next session :</p>
          <spa className="ml-2 animate-pulse text-green-500 font-bold">
            {time}
          </spa>
          <div className="text-sm font-normal">{title}</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
