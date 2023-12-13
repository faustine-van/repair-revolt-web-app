import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { login } from '../auth';
import { Alert } from 'react-bootstrap'

const LoginPage = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [serverRes, setServerRes] = useState('');
  const [show, setShow] = useState(false);
  const history = useNavigate()

  const loginUser = (data) => {
    console.log(data)

    const requests = {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/api/v1/users/login', requests)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.access_token);
        login(data.access_token);
        history('/');
      })
      .catch((error) => {
        console.error(error);
        // Handle the error (e.g., display an error message to the user)
        setServerRes("Invalid email or password");
        setShow(true);
      });

    reset();
  };

  return (
    <div className="container signup mt-3">
      <div className="row mb-3" height="700">
        <div className="col-md-6 signup1" style={{ maxHeight: '93vh' }}>
        </div>
        <div className="col-md-6 signup2" style={{ maxHeight: '93vh' }}>
          <main className="form-signin w-100 m-auto">
            <form className="h-custom">
              <div className="d-flex justify-content-center">
                <img className="mb-1" src={process.env.PUBLIC_URL + '/img/designer-two-color.png'} alt="" width="80" height="70" />
              </div>

              {show ?
                <>
                  <Alert variant="success" onClose={() => {
                    setShow(false)
                  }} dismissible>
                    <p className="mb-0">
                      {serverRes}
                    </p>
                  </Alert>
                </>
                :
                <h1 className="h2 mb-3 fw-bold text-center">Log in</h1>
              }

              <div className="form-floating">
                <input type="email" className="form-control" placeholder="email" {...register("email", { required: true })} />
                <label htmlFor="floatingInput">Email</label>
              </div>
              {errors.email && <span style={{ color: "#ff5470", }}> <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Email is required</small></span>}
              <div className="form-floating">
                <input type="password" className="form-control" placeholder="Password" {...register("password", { required: true })} />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {errors.password && <span className="" style={{ color: "#ff5470", }}> <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Password is required</small></span>}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" for="flexCheckDefault">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="text-body-secondary my-3"><Link className="a">Forget Password</Link></p>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-sign w-50 py-2" type="submit" onClick={handleSubmit(loginUser)}>Login <FontAwesomeIcon icon={faArrowRightLong} /></button>
              </div>
              <small className="mt-1 mb-3 text-body-secondary text-center">Not have an Account <Link className="a" to="/signup">Sign Up</Link></small>

            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
export default LoginPage
