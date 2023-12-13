import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/navbar.css'
import './styles/signup.css'
import './styles/footer.css'
import './styles/home.css'
import './styles/profile.css'
import './styles/about.css'
import './styles/technician.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react'
import ReactDOM from 'react-dom'
import Layout from './components/Layout';
//import NavBar from './components/navbar';
import HomePage from './components/Home';
import ProfilePage from './components/Profile';
import TechniciansPage from './components/Technicians';
import LoginPage from './components/Login';
import AboutPage from './components/About';
import SignupPage from './components/SignUp';
import ViewProfilePage from './components/ViewProfile';
//import FooterPage from './components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


const App = () => {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path='about' element={<AboutPage />} />
          </Route>
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
          <Route path='technicians' element={<TechniciansPage />} />
          <Route path='technicians/:id' element={<ViewProfilePage />} />
        </Routes>
      </div>
    </Router>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
