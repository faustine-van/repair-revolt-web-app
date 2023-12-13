import * as React from 'react';
import { useState } from 'react'
// import Button from '@mui/material/Button';
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form'


const SignupPage = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [show, setShow] = useState(false);
  const [serverRes, setServerRes] = useState('');

  const submitForm = (data) => {
    console.log(data.full_name)
    console.log(data.email)

    const body = {
      full_name: data.full_name,
      email: data.email,
      password: data.password
    }

    const requests = {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch('/api/v1/users/register', requests)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setServerRes(data.msg)
        setShow(true)
      })
      .catch(error => console.log(error))


    reset()
  }


  return (
    <div className="container mt-3">
      <div className="row mb-3 signup">
        <div className="col-md-6 signup1" style={{ maxHeight: '93vh' }}>
        </div>
        <div className="col-md-6 signup2" style={{ maxHeight: '93vh' }}>
          <main class="form-signin w-100 m-auto">
            <form class="h-custom">
              <div class="d-flex justify-content-center">
                <img class="mb-1" src={process.env.PUBLIC_URL + '/img/designer-two-color.png'} alt="" width="80" height="70" />
              </div>
              {show ?
                <>
                  <Alert variant="success" onClose={() => {
                    setShow(false)
                  }} dismissible>
                    <p className="mb-0">
                      <FontAwesomeIcon icon={faCircleCheck} beatFade style={{ color: "#02c077", }} /> {serverRes}
                    </p>
                  </Alert>
                </>
                :
                <h1 class="h2 mb-3 fw-bold text-center">Sign up</h1>
              }

              <div class="form-floating">
                <input type="name" class="form-control" placeholder="Full name"
                  {...register("full_name", { required: true, maxLength: 25 })} />
                <label htmlFor="floatingInput">Full name</label>
              </div>
              {errors.full_name && <span style={{ color: "#ff5470", }}> <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Full name is required</small></span>}
              {errors.email?.type === "maxLength" && <span style={{ color: "#ff5470" }}> <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small>Max characters should be 80</small></span>}
              <div class="form-floating">
                <input type="email" class="form-control" placeholder="name@example.com"
                  {...register("email", { required: true, maxLength: 60 })} />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              {errors.email && <span style={{ color: "#ff5470", }}> <FontAwesomeIcon icon={faCircleExclamation} beatFade />  <small> Email is required</small></span>}
              {errors.email?.type === "maxLength" && <span style={{ color: "#ff5470" }}> <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small>Max characters should be 60</small></span>}
              <div class="form-floating" >
                <input type="password" class="form-control" placeholder="Password"
                  {...register("password", { required: true, minLength: 8 })} />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {errors.password && <span class="" style={{ color: "#ff5470", }}> <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Password is required</small></span>}
              {errors.password?.type === "minLength" && <span style={{ color: "#ff5470" }}> <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small>Max characters should be 8</small></span>}

              <div class="text-end my-3">
                <small class="mt-1 mb-3 text-body-secondary text-center">Already have an Account <Link class="a" to="/login">Log in</Link></small>
              </div>
              <div class="d-flex justify-content-center">
                <button class="btn btn-sign w-50 py-2" type="submit" onClick={handleSubmit(submitForm)}>Join <FontAwesomeIcon icon={faArrowRightLong} /> </button>
              </div>
              <p class="mt-1 text-body-secondary text-center">By joining you agree to the <Link class="a">Terms</Link> and  <Link class="a">Privacy policy</Link></p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
export default SignupPage
