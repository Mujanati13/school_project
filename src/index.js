import React from 'react';
import ReactDOM from 'react-dom/client';
import Absence from './components/Absence';
import Login from './components/Login';
import Shedules from './components/Shedules';
import './tailwind/output.css'
import { Route , Routes , BrowserRouter } from 'react-router-dom';
import Presence from './components/Presence';
import Adminpresence from './components/Adminpresence';
import ScheduleAdmin from './components/ScheduleAdmin';
import UploadFile from './components/UploadFile';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = ()=>{
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' index element={<Login />}></Route>
        <Route path='/absence'  element={<Absence />}></Route>
        <Route path='/schedule' element={<Shedules />}></Route>
        <Route path='/presence' element={<Presence />}></Route>
        <Route path='/admin' element={<Adminpresence />}></Route>
        <Route path='/upload' element={<UploadFile />}></Route>
        <Route path='/Scheduleadmin' element={<ScheduleAdmin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

root.render(
  <>
    <App />
  </>
);
