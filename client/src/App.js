import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import CreateWishList from './pages/CreateWishlist/CreateWishList';
import UserWishlist from './pages/userWishlist/UserWishlist';
import NotFound from './pages/Not_found/NotFound';

function App() {
  return (
     <BrowserRouter>
        <div>
           <Routes>
             <Route path='/' element={<Home/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/createwishlist' element={<CreateWishList/>}/>
             <Route path='/userwishlist/:id' element={<UserWishlist/>}/>
             <Route path='*' element={<NotFound/>}/>
           </Routes>
        </div>
     </BrowserRouter>
  );
}

export default App;
