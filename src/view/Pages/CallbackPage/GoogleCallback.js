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
      const client_id =
        '792829001349-mhe10a1cvuqpruve9m1vajl11mipbvu5.apps.googleusercontent.com';
      const redirect_uri = 'http://127.0.0.1:3000/users/signin/googleCallback/';
      const CLIENT_SECRET = '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';

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
