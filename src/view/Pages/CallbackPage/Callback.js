import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login, selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import { useSelector, useDispatch } from 'react-redux';

const Callback = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate('');
  
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const grantType = 'authorization_code';
    const REST_API_KEY = 'e1ea08564695a809c2ea4becbb1f5e1d';
    const REDIRECT_URI = 'http://127.0.0.1:3000/users/signin/callback/';

    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      )
      .then((res) => {
        console.log(res);
        const { access_token } = res.data;
        axios
          .post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-type':
                  'application/x-www-form-urlencoded;charset=utf-8',
              },
            }
          )
          .then((res) => {
            console.log('Kakao user data:', res.data);
            dispatch(login());
            console.log(isLoggedIn);
            navigate('/');
          })
          .catch((error) => {
            console.error('Error fetching Kakao user data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching Kakao access token:', error);
      });
  }, []);

  return null;
};

export default Callback;
