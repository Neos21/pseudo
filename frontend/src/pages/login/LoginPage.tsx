import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Alert, Box, Button, Container, TextField, Typography } from '@mui/material';

import { userConstants } from '../../shared/constants/user-constants';
import { setUser } from '../../shared/stores/user-slice';
import { apiLogin } from './services/api-login';

/** Login Page */
export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [errorMessage, setErrorMessage] = useState<string>(null);
  
  // 本画面に遷移してきた時はログイン済の情報があったら削除する
  useEffect(() => {
    dispatch(setUser({ id: null }));
    localStorage.removeItem(userConstants.localStorageKey);
  }, [dispatch]);
  
  /** On Submit */
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    setErrorMessage(null);
    
    const data     = new FormData(event.currentTarget);
    const id       = data.get('id')!.toString();
    const password = data.get('password')!.toString();
    
    try {
      const loginResult = await apiLogin(id, password);  // ログイン認証してユーザ情報を返してもらう
      if(loginResult.error) return setErrorMessage(loginResult.error);
      
      const user = loginResult.result;
      dispatch(setUser(user));  // Store に保存する
      localStorage.setItem(userConstants.localStorageKey, JSON.stringify(user));  // 初期起動時に参照する LocalStorage
      navigate('/');
    }
    catch(error) {
      setErrorMessage('ログイン処理に失敗しました。もう一度やり直してください');
      console.warn('ログイン処理に失敗しました', error);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h4" marginY={2}>Log In</Typography>
      
      {errorMessage != null && <Alert severity="error" sx={{ my: 3 }}>{errorMessage}</Alert>}
      
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          type="text" name="id" label="User ID"
          required autoFocus
          fullWidth margin="normal"
        />
        <TextField
          type="password" name="password" label="Password"
          required autoComplete="current-password"
          fullWidth margin="normal"
        />
        <Button
          type="submit" variant="contained"
          fullWidth sx={{ my: 3 }}
        >
          Log In
        </Button>
      </Box>
      
      <Box sx={{ mt: 5, textAlign: 'right' }}>
        <Button component={Link} to="/signup" variant="contained">Sign Up</Button>
      </Box>
    </Container>
  );
};