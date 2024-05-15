import { Cell, Input, Button, Checkbox, Toast } from 'zarm';
import CustomIcon from '../../components/CustomIcon';
import style from './style.module.less';
import { useState } from 'react';
import { post } from '../../utils/index';

const Login = () => {
  const [type, setType] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const clickAgreement = (e) => {
    console.log('click checkbox: ', e.target.checked);
    setAgreement(e.target.checked);
  }

  const onSubmit = async () => {
    try {
      if (type == 'login') {
        const { data } = await post('/user/login', {
          username,
          password
        });
        localStorage.setItem('token', data.token);
        window.location.href = '/';
      } else {
        const { data } = await post('/user/register', {
          username,
          password
        });
        console.log('register success data: ', data);
        Toast.show('注册成功');
        setType('login');
      }
    } catch (err) {
      setErrorMsg(err.msg);
    }
  };

  return (
    <div className={style.auth}>
      <div className={style.head}></div>
      <div className={style.tab}>
        <span className={type === 'login' ? `${style.active}` : ''} onClick={() => setType('login')}>登录</span>
        <span className={type === 'register' ? `${style.active}` : ''} onClick={() => setType('register')}>注册</span>
      </div>
      <div className={style.form}>
        <Cell icon={<CustomIcon type="zhanghao" />}>
          <Input
            clearable
            type='text'
            placeholder='请输入账号'
            onChange={(value) => setUsername(value)}
          />
        </Cell>
        {!username && <div className={style.notice}>请输入账号</div>}
        <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type='password'
            placeholder='请输入密码'
            onChange={(value) => setPassword(value)}
          />
        </Cell>
        {!password && <div className={style.notice}>请输入密码</div>}
      </div>
      <div className={style.operation}>
        {type === 'register' && <div className={style.agree}>
          <Checkbox id="agreement" checked={agreement} onChange={clickAgreement} />
          <label htmlFor="agreement">阅读并同意<a>《Joey Juejue 条款》</a></label>
        </div>}
        <Button onClick={onSubmit} block theme="primary" disabled={!username || !password || (type == 'register' && !agreement)}>{type == 'login' ? '登录' : '注册'}</Button>
        {!errorMsg && <div className={style.notice}>{errorMsg}</div>}
      </div>
    </div>
  );
}

export default Login;