import express from express;
import axios from 'axios';
import cors from 'cors';

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors()); // CORS 설정 - 실제로는 보안 상의 이유로 정확한 도메인을 지정해야 합니다.

app.post('/google/callback', async (req, res) => {
  const authorizationCode = req.body.code;

  try {
    // 클라이언트에서 받은 인증 코드로부터 엑세스 토큰 요청
    const accessTokenResponse = await requestAccessToken(authorizationCode);

    // 클라이언트에게 엑세스 토큰 응답
    res.status(200).json({ accessToken: accessTokenResponse.accessToken });
  } catch (error) {
    console.error('Error during access token request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const requestAccessToken = async (authorizationCode) => {
  const response = await axios.post(
    'https://oauth2.googleapis.com/token',
    {
      code: authorizationCode,
      client_id: 'your-client-id',
      client_secret: 'your-client-secret',
      redirect_uri: 'your-redirect-uri',
      grant_type: 'authorization_code',
    }
  );

  return {
    accessToken: response.data.access_token,
  };
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});