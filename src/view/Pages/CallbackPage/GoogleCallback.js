import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login, selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const GoogleCallback = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate('');

  useEffect(() => {
    // const code = new URLSearchParams(window.location.search).get('code');
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grantType = 'authorization_code';
    const client_id = "792829001349-mhe10a1cvuqpruve9m1vajl11mipbvu5.apps.googleusercontent.com";
    const redirect_uri = "http://127.0.0.1:3000/users/signin/googleCallback/";
    const scope = "https://www.googleapis.com/auth/userinfo.email";
    const CLIENT_SECRET = "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";

    axios
      .post(
        `https://oauth2.googleapis.com/token?client_id=${client_id}&scope=${scope}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirect_uri}&code=${code}&grant_type=authorization_code&response_type=code`,
        {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      )
      .then((res) => {
        console.log(res);
        const token = res.data.access_token;
        console.log(token)
        axios
          .post(
            'http://localhost:8000/users/google/login/callback/',
            {"access_token": token},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  }
            },
          )
          .then((res) => {
            console.log('google user data:', res.data);
            localStorage.setItem('access', res.data.token.access);
            localStorage.setItem('refresh', res.data.token.refresh);
            dispatch(login());
            console.log(isLoggedIn);
            navigate('/');
          })
          .catch((error) => {
            console.error('Error fetching google user data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching google access token:', error);
      });
  }, []);

  return null;
};

export default GoogleCallback;