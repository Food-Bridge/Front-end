import { useEffect } from 'react';
import axiosInstance from '../../../api/instance';
import { useNavigate } from 'react-router-dom';
import { setTokens } from '../../../redux/reducers/authSlice';
import { useDispatch } from 'react-redux';

const KakaoCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate('');

  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get('code');
      const grantType = 'authorization_code';
      const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
      const REDIRECT_URI =  'http://foodbridge.vercel.app/users/signin/kakaoCallback/';
      const response = await axiosInstance.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`
      );
      const token = response.data.access_token;
      const res = await axiosInstance.post('/users/kakao/login/callback/', {
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

export default KakaoCallback;
