import { Link } from 'react-router-dom';

import './ResetPass.css';
import BoardFill from '../assets/board-fill.png';

const SignUp = () => {
    return (
        <div className='reset-page'>
            <div className='left-panel'>
                <img className='board-fill-image' src={BoardFill}/>
                <div className='board-motto' />
                <div className='board-motto-text'>The Only Board You Need</div>
            </div>
            <div className='right-panel'>
                <Link className='company-name' to='/'>Workboard</Link>
                <input className='email-address' placeholder='Email Address'/>
                <Link className='signup-reset' to='/signup'>Reset</Link>
                <Link className='signup-login' to='/login'>Login</Link>
            </div>
        </div>
    )
}

export default SignUp;