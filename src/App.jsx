import { Link } from 'react-router-dom';

import './App.css';

import landing from './assets/land-img.png';
import tile1 from './assets/tile1.png';
import tile2 from './assets/tile2.png';

const App = () => {
  return (
    <div className='landing-page'>
      <div className="navbar">
        {/* <p className='web-link'>Workboard</p> */}
        <Link className='web-link' to="/">Workboard</Link>
        <Link className='web-signup' to="/signup">SignUp</Link>
        <Link className='web-login' to="/login">Login</Link>
      </div>
      <div className='land-banner'>
        <img className='land-img' src={landing} alt="Organized Progress" />
        <p className='banner1-title'>For people who love organized progress</p>
        <p className='banner1-text'>Project management simplified</p>
        <Link className='tour' to='/'>Get Started</Link>
      </div>
      <div className='land-tile1'>
        <img className='tile1-img' src={tile1} alt="tile 1" />
        <p className='tile1-title'>Collaboration within Team made easier</p>
        <p className='tile1-text'>Deligate tasks easily among the team for fast and organized development</p>
      </div>
      <div className='land-tile2'>
        <img className='tile2-img' src={tile2} alt="tile 2" />
        <p className='tile2-title'>Break big task in smaller parts</p>
        <p className='tile2-text'>Divide development work in small managable stories with priority and multiple development stages to avoid procrastination and track story progress.</p>
      </div>
      <div className='land-footer'>
        <div className='contact-us'>
          <p className='contact'>Contact</p>
          <p className='gmail'>Gmail</p>
          <p className='facebook'>Facebook</p>
          <p className='instagram'>Instagram</p>
          <p className='twitter'>Twitter</p>
        </div>
        <div className='about-us'>
          <p className='about'>About US</p>
          <p className='team'>Meet the Team</p>
          <p className='testimonials'>Testimonials</p>
          <p className='newsletter'>Newsletter</p>
        </div>
        <div className='review-form'>
          <p className='review'>Provide Review</p>
          <input className='email' placeholder='Email ID'/>
          <input className='feedback' placeholder='Provide Feedback'/>
        </div>
      </div>
    </div>
  )
}

export default App;
