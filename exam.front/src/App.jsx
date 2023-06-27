import './App.css';
import { AuthProvider } from './components/auth/AuthContext';
import { Route, Routes } from 'react-router-dom';

import Login from './components/user/Login';
import Header from './components/Header';
import Home from './components/main/Home';

import PostItem from './components/postItems/PostItem';
import PostItemCreate from './components/postItems/PostItemCreate';
import PostItemEdit from './components/postItems/PostItemEdit';
import PostItemList from './components/postItems/PostItemList';
import PostSubItemCreate from './components/postItems/PostSubItemCreate';
import PostSubItemEdit from './components/postItems/PostSubItemEdit';

import ViewItem from './components/viewItems/ViewItem';
import ViewItemCreate from './components/viewItems/ViewItemCreate';
import ViewItemEdit from './components/viewItems/ViewItemEdit';
import ViewItemList from './components/viewItems/ViewItemList';
import ViewSubItemCreate from './components/viewItems/ViewSubItemCreate';
import ViewSubItemEdit from './components/viewItems/ViewSubItemEdit';
function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/postItems/:id' element={<PostItem/>}/>
          <Route path='/postItems/create' element={<PostItemCreate/>}/>
          <Route path='/postItems/:id/edit' element={<PostItemEdit/>}/>
          <Route path='/postItems' element={<PostItemList/>}/>
          <Route path='/postItems/:postItemId/postSubItems/create' element={<PostSubItemCreate/>}/>
          <Route path='/postItems/:postItemId/postSubItems/:id' element={<PostSubItemEdit/>}/>

          <Route path='/viewItems/:id' element={<ViewItem/>}/>
          <Route path='/viewItems/create' element={<ViewItemCreate/>}/>
          <Route path='/viewItems/:id/edit' element={<ViewItemEdit/>}/>
          <Route path='/viewItems' element={<ViewItemList/>}/>
          <Route path='/viewItems/:viewItemId/viewSubItems/create' element={<ViewSubItemCreate/>}/>
          <Route path='/viewItems/:viewItemId/viewSubItems/:id' element={<ViewSubItemEdit/>}/>

        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
