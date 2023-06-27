import './App.css';
import { AuthProvider } from './components/auth/AuthContext';
import { Route, Routes } from 'react-router-dom';

import Login from './components/user/Login';
import Header from './components/Header';
import Home from './components/main/Home';

import EmployeeRating from './components/employeeRatings/EmployeeRating';
import EmployeeRatingCreate from './components/employeeRatings/EmployeeRatingCreate';
import EmployeeRatingEdit from './components/employeeRatings/EmployeeRatingEdit';

import AutoService from './components/autoServices/AutoService';
import AutoServiceCreate from './components/autoServices/AutoServiceCreate';
import AutoServiceEdit from './components/autoServices/AutoServiceEdit';
import AutoServiceList from './components/autoServices/AutoServiceList';
import EmployeeCreate from './components/autoServices/EmployeeCreate';
import EmployeeEdit from './components/autoServices/EmployeeEdit';
function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/employeeRatings/:id' element={<EmployeeRating/>}/>
          <Route path='/employeeRatings/create' element={<EmployeeRatingCreate/>}/>
          <Route path='/employeeRatings/:id/edit' element={<EmployeeRatingEdit/>}/>

          <Route path='/autoServices/:id' element={<AutoService/>}/>
          <Route path='/autoServices/create' element={<AutoServiceCreate/>}/>
          <Route path='/autoServices/:id/edit' element={<AutoServiceEdit/>}/>
          <Route path='/autoServices' element={<AutoServiceList/>}/>
          <Route path='/employees/create' element={<EmployeeCreate/>}/>
          <Route path='/employees/:id' element={<EmployeeEdit/>}/>

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
