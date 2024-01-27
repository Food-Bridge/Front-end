import Category from './view/components/Category/Category.js';
import Coupon from './view/components/Coupon/Coupon.js';
import GoogleBtn from './view/components/GoogleBtn/GoogleBtn.js';
import InputBox from './view/components/InputBox/InputBox.js';
import KakaoLogin from './view/components/KakaoLogin/KakaoLogin.js';
import LogInBtn from './view/components/LogInBtn/LogInBtn.js';
import LogoBar from './view/components/LogoBar/LogoBar.js';
import MenuBar from './view/components/MenuBar/MenuBar.js';
import MenuBlock from './view/components/MenuBlock/MenuBlock.js';
import MyListBlock from './view/components/MyListBlock/MyListBlock.js';
import MyListDeliver from './view/components/MyListDeliver/MyListDeliver.js';
import MyListMain from './view/components/MyListMain/MyListMain.js';
import PaymentMenu from './view/components/PaymentMenu/PaymentMenu.js';
import PlusInfo from './view/components/PlusInfo/PlusInfo.js';
import SearchBar from './view/components/SearchBar/SearchBar.js';
import SearchRank from './view/components/SearchRank/SearchRank.js';
import SearchRecord from './view/components/SearchRecord/SearchRecord.js';
import StoreDeliverTogo from './view/components/StoreDeliverTogo/StoreDeliverTogo.js';

// pages
import MyList from './view/pages/MyListPage/MyList.js';
import SignIn from './view/pages/SignInPage/SignIn.js';
import SignUp from './view/pages/SignUpPage/SignUp.js';
import Store from './view/pages/StorePage/Store.js';

function App() {
  return (
    <div className='App'>
      {/*components*/}
      {/* <Category />
      <Coupon />
      <CouponDownloaded />
      <GoogleBtn />
      <InputBox />
      <KakaoLogin />
      <LogInBtn />
      <LogoBar />
      <MenuBar />
      <MenuBlock />
      <MyListBlock />
      <MyListDeliver />
      <MyListMain />
      <PlusInfo />
      <SearchBar />
      <StoreDeliverTogo /> */}
      <PaymentMenu />
      <SearchRank rank='1' text='그릭요거트' type='up' />
      <SearchRecord text='치킨' />
      <Coupon />

      {/*pages*/}
      {/* <MyList />
      <SignIn />
      <SignUp /> 
      <Store count={1}/>*/}
    </div>
  );
}

export default App;
