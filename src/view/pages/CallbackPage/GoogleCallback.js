import { useEffect } from 'react';
import axiosInstance from '../../../api/instance';
import { useNavigate } from 'react-router-dom';
import { setTokens } from '../../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate('');

  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get('code');
      const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      const redirect_uri = 'https://foodbridge.vercel.app/users/signin/googleCallback/';
      const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_SECRET_ID;

      const response = await axiosInstance.post(
        `https://oauth2.googleapis.com/token?client_id=${client_id}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirect_uri}&code=${code}&grant_type=authorization_code`,
        {}
      );
      const token = response.data.access_token;
      const res = await axiosInstance.post('/users/google/login/callback/', {
        access_token: token,
      });
      const { access, refresh } = res.data.token;
      dispatch(setTokens({ access, refresh }));
      navigate('/');
    };

    fetchData();
  }, [dispatch, navigate]);

  return null;
};

export default GoogleCallback;
