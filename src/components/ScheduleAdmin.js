import React, { useEffect, useState } from "react";
import she, { ReactComponent as She } from "../image/she.svg";
import { ReactComponent as Absence } from "../image/absence.svg";
import { ReactComponent as More } from "../image/more.svg";
import { ReactComponent as Done } from "../image/done.svg";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Link, Navigate } from "react-router-dom";
import { getCookie, removeCookie } from "../firebase/firebaseFuntions";
import { getAuth } from "firebase/auth";
import config from "../firebase/config";
import { LogoutAuth } from "../firebase/firebaseFuntions";
import Time from "./Time";
import { RRule } from "rrule";
import { rrulestr } from 'rrule';
import AdminTime from "./AdminTime";
import moment from 'moment';

export default function () {
  const locales = {
    "en-US": enUS,
  };

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const myEventsList = [
   
  ];

  var start = new Date("2,24,2023,7:00");

  useEffect(() => {
    fetch("http://localhost:3001/api/sessionAdmin?userId=" + getCookie("id"))
      .then((response) => response.json())
      .then((data) => {
        data.map((e) => {
          console.log(e);
          var obj = {
            title: e.session_title,
            allDay: false,
            start: new Date(e.startDate),
            end: new Date(e.endDate),
            rrule: new RRule({
                freq: RRule.WEEKLY,
                count: 30,
                interval: 1
              }).toString()
          };
          myEventsList.push(obj);
        });
      })
      .catch((error) => {
        // handle the error here
      });
  }, []);

  const [getlogin, setlogin] = useState(false);
  const handleLogin = () => {
    setlogin(getlogin == false ? true : false);
  };

  function logout() {
    var a = LogoutAuth();
    console.log(a);
    removeCookie("type");
    removeCookie("id");
    window.location.reload();
  }

  var typeAuth = getCookie("type");
  console.log("hello");

  return getAuth(config).currentUser != null && typeAuth == "teacher" ? (
    typeAuth == "teacher" ? (
      <div className="w-full h-screen truncate">
        <div className="head flex justify-end space-x-3 shadow-md w-full h-14 bg-gray-800 p-1 pr-10 items-center">
          <p
            style={{}}
            className="font-bold text-lg text-orange-500 flex-auto pl-4"
          >
            MD SYSTEM
          </p>

          <div
            style={{ border: "0.5px solid white" }}
            className="w-10 h-10 bg-black border-white rounded-full"
          ></div>
          <span
            onClick={handleLogin}
            className="flex items-center cursor-pointer space-x-2"
          >
            <span className="text-white font-seimbold">
              @
              {getAuth(config)
                .currentUser.uid.toString()
                .toLowerCase()
                .substring(0, 6)}
            </span>
            <More className="fill-white font-normal w-4" />
          </span>
        </div>
        {getlogin == true ? (
          <span
            onClick={logout}
            className="hover:bg-gray-200 text-black absolute top-15 border-2 border-gray-200 border-solid font-normal cursor-pointer right-10 shadow-xl pl-1 pr-1 bg-gray-100 rounded-lg"
          >
            Logout
          </span>
        ) : (
          ""
        )}
        <div>
          <div className="flex space-x-6">
            <div className="w-52 h-screen bg-gray-600 ">
              <p className="h-8 mt-0.5 cursor-pointer hover:bg-gray-700 shadow-lg bg-gray-500 border-white w-full">
                <Link to="/admin">
                  <p className="h-8 mt-0.5 cursor-pointer hover:bg-gray-700 shadow-lg bg-gray-500 border-white w-full">
                    <p className="pl-5 flex items-center font-normal space-x-2 justify-start text-gray-300 text-md h-8 text-center">
                      <Done className="w-6 fill-white" />
                      <span className="font-bold">Presence</span>
                      {/*<div className="w-2 h-2 bg-green-500 rounded-full"></div>*/}
                    </p>
                  </p>
                </Link>
              </p>
              <p className="h-8 cursor-pointer hover:bg-gray-700 shadow-lg bg-gray-500 border-white w-full">
                <Link to="/Scheduleadmin">
                  <p className="pl-5 flex items-center font-normal space-x-3 justify-start text-gray-300 text-md h-8 text-center">
                    <She className="w-4 fill-white" />
                    <span className="font-bold">Schedule</span>
                  </p>
                </Link>
              </p>
            </div>
            <div
              style={{ width: "80%", height: "75vh", overflow: "auto" }}
              className="mt-10 bg-gray-100"
            >
              <AdminTime />
              <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={{ day: true, week: true, agenda: true }}
                defaultView={Views.DAY}
                defaultDate={new Date(2023, 2, 1)}
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    )
  ) : typeAuth == "teacher" ? (
    <Navigate to="/admin" />
  ) : (
    <Navigate to="/login" />
  );
}
