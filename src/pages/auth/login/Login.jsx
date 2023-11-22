import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import Input from '../../../components/input/Input';
import Button from '../../../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutWrapper } from '../../../layout/Layout';
import LoginAPI from '../../../api/auth/LoginAPI';
import {
  accessTokenAtom,
  csrfTokenAtom,
  isLoginAtom,
  userNameAtom,
} from '../../../atom/Atom';

function Login() {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isIdValid, setIsIdValid] = useState(null);
  const [isPwValid, setIsPwValid] = useState(true);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [csrfToken, setCsrfToken] = useRecoilState(csrfTokenAtom);
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const [userName, setUserName] = useRecoilState(userNameAtom);

  const navigate = useNavigate();

  function idValidCheck(event) {
    setUserId(event.target.value);
  }
  function setPassword(event) {
    setUserPassword(event.target.value);
  }

  function pwValidCheck() {
    const testPassword = /^[A-Za-z0-9]{6,20}$/;
    if (userPassword === userPassword.match(testPassword)) {
      setIsPwValid(true);
    } else {
      setIsPwValid(false);
    }
  }

  const onHandleSubmit = async () => {
    const data = {
      username: userId,
      password: userPassword,
    };
    try {
      const res = await LoginAPI(data);
      alert('어서오세요!');
      setAccessToken(res.access_token);
      setCsrfToken(res.csrf_token);
      setUserName(res.username);
      setIsLogin(true);
      navigate('/');
    } catch (err) {
      console.log('아이디 비밀번호를 확인하세요.');
    }
  };

  useEffect(() => {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onHandleSubmit();
    pwValidCheck();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper>
        <Title>로그인</Title>
        <Input
          label='아이디'
          type='text'
          id='userId'
          name='userId'
          placeholder=''
          value={userId}
          onChange={idValidCheck}
        />
        <Input
          label='비밀번호'
          type='password'
          id='userPw'
          name='userPw'
          placeholder=''
          value={userPassword}
          onChange={setPassword}
          isvalid={isPwValid}
          errmsg='* 6자리 이상 입력하세요'
        />
        <Button type='submit' content='로그인' style={{ marginTop: '50px' }} />
        <Link
          to={'/signup'}
          style={{
            width: '100px',
            height: '30px',
            textDecoration: 'none',
            textAlign: 'center',
            marginTop: '30px',
            color: 'inherit',
          }}
        >
          회원가입
        </Link>
      </Wrapper>
    </form>
  );
}

export const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 30px;
  color: var(--main-color);
  font-family: 'yg-jalnan';
`;

const Wrapper = styled(LayoutWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Login;
