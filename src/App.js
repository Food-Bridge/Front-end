import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import MainPage from './view/pages/MainPage/MainPage';
import SignIn from './view/Pages/SignInPage/SignIn'
import SignUp from './view/Pages/SignUpPage/SignUp'

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/logIn/' element={<SignIn />} />
          <Route path='/signup/' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;