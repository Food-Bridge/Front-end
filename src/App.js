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
import Search from './view/pages/SearchPage/Search';
import Location from './view/pages/LocationPage/Location';
import LocationSearch from './view/pages/LocationSearchPage/LocationSearch';
import CommuPost from './view/pages/CommuPostPage/CommuPost';
import Community from './view/pages/CommunityPage/Community';
import KakaoCallback from './view/pages/CallbackPage/KakaoCallback';
import PostDetail from './view/pages/PostDetailPage/PostDetail';
import PostUpload from './view/pages/PostUploadPage/PostUpload';
import Poster from './view/pages/PosterPage/Poster';
import GoogleCallback from './view/pages/CallbackPage/GoogleCallback';
import StoreUpload from './view/pages/StoreUploadPage/StoreUpload';

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
          <Route path='users/signin/callback/' element={<KakaoCallback />} />
          <Route path="users/signin/googleCallback" element={<GoogleCallback />} />

          <Route path='user/' element={<MyList />} />
          <Route path='user/coupon/' element={<CouponList />} />
          <Route path='address/' element={<Location />} />
          <Route path='searchLocation/' element={<LocationSearch />} />

          <Route path='store/:store_id/' element={<Store />} />
          <Route path='store/' element={<StoreOption popular/>} />
          <Route path='storeList/' element={<StoreList />} />
          
          <Route path='commu/' element={<Community />} />
          <Route path='commuPostWeek/' element={<CommuPost title={"주간 인기"}/>} />
          <Route path='commuPostDay/' element={<CommuPost title={"일간 인기"}/>} />
          <Route path='commuPostNew/' element={<CommuPost title={"최신"}/>} />
          <Route path='postCard/:id' element={<PostDetail />} />
          <Route path='postUpload/' element={<PostUpload/>}/>

          <Route path='poster/' element={<Poster />}/>

          <Route path='storeUpload/' element={<StoreUpload />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;