import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss'

import CouponList from './view/pages/CouponListPage/CouponList'
import LogoBar from './view/components/LogoBar/LogoBar';
import MainPage from './view/pages/MainPage/MainPage';
import MyList from './view/pages/MyListPage/MyList';
import Store from './view/pages/StorePage/Store'
// import StoreList from './view/pages/StoreListPage/StoreList'
import SignIn from './view/pages/SignInPage/SignIn';
import SignUp from './view/pages/SignUpPage/SignUp';


function App() {
  return (
    <div className='App'>
      <Router>
        <LogoBar />
        <Routes>
          <Route path='/' element={<MainPage />} />

          <Route path='users/signin/' element={<SignIn />} />
          <Route path='users/signup/' element={<SignUp />} />

          <Route path='user/' element={<MyList />} />
          <Route path='user/coupon/' element={<CouponList />} />

          <Route path='store/:store_id/' element={<Store />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;