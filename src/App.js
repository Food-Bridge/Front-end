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
import Location from './view/pages/LocationPage/Location';
import LocationSearch from './view/pages/LocationSearchPage/LocationSearch';
import Search from './view/pages/SearchPage/Search'
import CommuPost from './view/pages/CommuPostPage/CommuPost';
import Community from './view/pages/CommunityPage/Community';
import PostUpload from './view/pages/PostUploadPage/PostUpload';

=======
import Search from './view/pages/SearchPage/Search';
import Location from './view/pages/LocationPage/Location';
import LocationSearch from './view/pages/LocationSearchPage/LocationSearch';
import CommuPost from './view/pages/CommuPostPage/CommuPost';
import Community from './view/pages/CommunityPage/Community';
import Callback from './view/pages/CallbackPage/Callback';
>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44

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
<<<<<<< HEAD
=======
          <Route path='users/signin/callback/' element={<Callback />} />
>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44

          <Route path='user/' element={<MyList />} />
          <Route path='user/coupon/' element={<CouponList />} />
          <Route path='address/' element={<Location />} />
          <Route path='searchLocation/' element={<LocationSearch />} />

<<<<<<< HEAD
          <Route path='store/' element={<Store />} />
          <Route path='option/' element={<StoreOption popular/>} />
=======
          <Route path='store/:store_id/' element={<Store />} />
          <Route path='store/' element={<StoreOption popular/>} />
>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44
          <Route path='storeList/' element={<StoreList />} />
          
          <Route path='commu/' element={<Community />} />
          <Route path='commuPost/' element={<CommuPost />} />
<<<<<<< HEAD
          <Route path='upload/' element={<PostUpload />}/>

=======
>>>>>>> 774ec86cd3ef3f1d7a8d2d10386811af4aac6b44
        </Routes>
      </Router>
    </div>
  );
}

export default App;
