import { Link } from 'react-router-dom';

import './Login.css';
import BoardFill from '../assets/board-fill.png';

const SignUp = () => {
    return (
        <div className='login-page'>
            <div className='left-panel'>
                <img className='board-fill-image' src={BoardFill}/>
                <div className='board-motto' />
                <div className='board-motto-text'>The Only Board You Need</div>
            </div>
            <div className='right-panel'>
                <Link className='company-name' to='/'>Workboard</Link>
                <input className='email-address' placeholder='Email Address'/>
                <input className='password' placeholder='Password'/>
                <Link className='login-signup' to='/signup'>SignUp</Link>
                <Link className='login-login' to='/login'>Login</Link>
                <Link className='forgot-pass' to='/reset-pass'>Forgot Password</Link>
                <p className='alternate-login'>Or signIn using</p>
                <Link className='login-gmail' to='/'></Link>
                <Link className='login-facebook' to='/'></Link>
            </div>
        </div>
    )
}

export default SignUp;