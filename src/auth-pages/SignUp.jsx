import { Link } from 'react-router-dom';

import './SignUp.css';
import BoardFill from '../assets/board-fill.png';

const SignUp = () => {
    return (
        <div className='signup-page'>
            <div className='left-panel'>
                <img className='board-fill-image' src={BoardFill}/>
                <div className='board-motto' />
                <div className='board-motto-text'>The Only Board You Need</div>
            </div>
            <div className='right-panel'>
                <Link className='company-name' to='/'>Workboard</Link>
                <input className='email-address' placeholder='Email Address'/>
                <input className='password' placeholder='Password'/>
                <input className='conf-password' placeholder='Confirm Password'/>
                <Link className='signup-signup' to='/signup'>SignUp</Link>
                <Link className='signup-login' to='/login'>Login</Link>
                <p className='alternate-signup'>Or signIn using</p>
                <Link className='signup-gmail' to='/'></Link>
                <Link className='signup-facebook' to='/'></Link>
            </div>
        </div>
    )
}

export default SignUp;