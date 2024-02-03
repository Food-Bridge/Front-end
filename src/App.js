import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import CouponList from './view/pages/CouponListPage/CouponList';
import LogoBar from './view/components/LogoBar/LogoBar';
import MainPage from './view/pages/MainPage/MainPage';
import MyList from './view/pages/MyListPage/MyList';
import Store from './view/pages/StorePage/Store';
import StoreOption from './view/pages/StoreOptionPage/StoreOption';
import SignIn from './view/pages/SignInPage/SignIn';
import SignUp from './view/pages/SignUpPage/SignUp';
import StoreList from './view/pages/StoreListPage/StoreList';
<<<<<<< HEAD
import Search from './view/pages/SearchPage/Search';
import Location from './view/pages/LocationPage/Location';
import LocationSearch from './view/pages/LocationSearchPage/LocationSearch';
=======
import Search from './view/pages/SearchPage/Search'
import CommuPost from './view/pages/CommuPostPage/CommuPost';
import Community from './view/pages/CommunityPage/Community';

>>>>>>> 1aa0b07f1af5a8f462979c5aa493e670b310b4bc

function App() {
  return (
    <div className='App'>
      <Router>
        <LogoBar />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='search/' element={<Search />} />

          <Route path='users/signin/' element={<SignIn />} />
          <Route path='users/signup/' element={<SignUp />} />

          <Route path='user/' element={<MyList />} />
          <Route path='user/coupon/' element={<CouponList />} />
          <Route path='location/' element={<Location />} />
          <Route path='location/search/' element={<LocationSearch />} />

          <Route path='store/:store_id/' element={<Store />} />
          <Route path='store/' element={<StoreOption popular/>} />
          <Route path='storeList/' element={<StoreList />} />
          
          <Route path='commu/' element={<Community />} />
          <Route path='commuPost/' element={<CommuPost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
