import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import React from 'react';

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
import CommuPost from './view/pages/CommuPostPage/CommuPost';
import Community from './view/pages/CommunityPage/Community';
import KakaoCallback from './view/pages/CallbackPage/KakaoCallback';
import PostDetail from './view/pages/PostDetailPage/PostDetail';
import PostUpload from './view/pages/PostUploadPage/PostUpload';
import Poster from './view/pages/PosterPage/Poster';
import CartList from './view/pages/CartListPage/CartList';
import StoreReview from './view/pages/StoreReviewPage/StoreReview';
import MyReview from './view/pages/MyReviewPage/MyReview';
import OrderList from './view/pages/OrderListPage/OrderList';
import GoogleCallback from './view/pages/CallbackPage/GoogleCallback';
import Modal from './view/components/Modal/Modal';
import ReviewUpload from './view/pages/ReviewUploadPage/ReviewUpload';
import StoreLikes from './view/pages/StoreLikesPage/StoreLikes';

function App() {
  
  return (
    <div className='App'>
      <Router>
        <LogoBar />
        <Routes>

          // 메인
          <Route path='/' element={<MainPage />} />
          <Route path='search/' element={<Search />} />

          // 유저 로그인
          <Route path='users/signin/' element={<SignIn />} />
          <Route path='users/signup/' element={<SignUp />} />
          <Route path='users/signin/callback/' element={<KakaoCallback />} />
          <Route
            path='users/signin/googleCallback'
            element={<GoogleCallback />}
          />

          // 유저 정보
          <Route path='users/' element={<MyList />} />
          <Route path='users/review' element={<MyReview />} />
          <Route path='users/coupon/' element={<CouponList />} />
          <Route path='users/address/' element={<Location />} />
          <Route path='users/likes/' element={<StoreLikes />} />

          // 식당 정보
          <Route path='restaurant/:resId/' element={<Store />} />
          <Route path='restaurant/:resId/:menuId' element={<StoreOption />} />
          <Route path='restaurant/:resId/review/' element={<StoreReview />} />
          <Route path='restaurant/' element={<StoreList />} />
          <Route path='restaurant/reviewUpload/' element={<ReviewUpload />} />

          // 주문 정보
          <Route path='cart/' element={<CartList />} />
          <Route path='orderlist/' element={<OrderList />} />
          
          // 커뮤니티
          <Route path='commu/' element={<Community />} />
          <Route path='commuPostWeek/' element={<CommuPost title={"주간 인기"}/>} />
          <Route path='commuPostDay/' element={<CommuPost title={"일간 인기"}/>} />
          <Route path='commuPostNew/' element={<CommuPost title={"최신"}/>} />
          <Route path='postCard/:id' element={<PostDetail />} />
          <Route path='postUpload/' element={<PostUpload/>}/>

          <Route path='poster/' element={<Poster />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
