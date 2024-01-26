import './App.css';
import Category from './view/component/Category/Category';
import GoogleBtn from './view/component/GoogleBtn/GoogleBtn';
import LogInBtn from './view/component/LogInBtn/LogInBtn';
import LogoBar from './view/component/LogoBar/LogoBar';
import MenuBar from './view/component/MenuBar/MenuBar';
import SearchBar from './view/component/SearchBar/SearchBar';

function App() {
  return (
    <div className="App">
      {/* <LogoBar /> */}
      {/* <MenuBar name={"menuBar-pageLine1"}/> */}
      {/* <SearchBar location={"강남구"} count={"1"}/> */}
      {/* <GoogleBtn/> */}
      {/* <LogInBtn /> */}
      <Category />
    </div>
  );
}

export default App;
