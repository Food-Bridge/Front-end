import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {

  const navigate = useNavigate()
  
  useEffect(() => {
    const params   = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    // const grantType = 'authorization_code';
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_SECRET_ID;
    const GOOGLE_CALLBACK_URI = "http://127.0.0.1:3000/users/signin/googleCallback";
    // const scope = "http://www.googleapis.com/auth/userinfo.email";
    const state = "rstring";

    axios
      .post(
            `http://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code&redirect_uri=${GOOGLE_CALLBACK_URI}&state=${state}`,
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
            `http://www.googleapis.com/userinfo/v2/me`,
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
            console.log('Google user data:', res.data);
            navigate('/')
          })
          .catch((error) => {
            console.error('Error fetching Google user data:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching Google access token:', error);
      });
  }, []);

  return null;
};

export default GoogleCallback;