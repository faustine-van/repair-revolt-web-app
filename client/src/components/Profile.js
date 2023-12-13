import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-bootstrap'

const ProfilePage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [show, setShow] = useState(false);
  const [serverRes, setServerRes] = useState('');

  // diplay image  in img tags from file input
  const [profileImage, setProfileImage] = useState({ file: [], filedisplay: null });
  const [invalidImage, setinvalidImage] = useState(null)
  const reader = new FileReader();

  function displayResizeImage(e) {
    console.log(e.target.files);
    const imgfile = e.target.files[0]
    const imgfilename = e.target.files[0].name

    if (!imgfile) {
      setinvalidImage('Please select image.');
      return false;
    }
    if (!imgfilename.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
      setinvalidImage('Please select valid image JPG,JPEG,PNG');
      return false;
    }
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MaxWidth = 1000
        var MaxHeight = 1000
        var width = img.width;
        var height = img.height;
        if (width > height) {
          if (width < MaxWidth) {
            MaxWidth = width
          }
          width = MaxWidth;
          height = (height / width) * MaxWidth;
        } else {
          if (height < MaxHeight) {
            MaxHeight = height
          }
          height = MaxHeight;
          width = (width / height) * MaxHeight;
        }
        canvas.width = width
        canvas.height = height
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], imgfilename, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          setProfileImage({
            ...profileImage,
            file: file,
            filedisplay: URL.createObjectURL(imgfile),

          })
        }, 'image/jpeg', 1);
        setinvalidImage(null)

      };
      img.onerror = () => {
        setinvalidImage('Invalid image content.');
        return false;
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(imgfile);
  }

  // submit
  const submitForm = (data) => {

    console.log(data)
    const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');

    const headers = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(token)}`
      }
    }

    fetch('/api/v1/users/me', headers)
      .then(res => res.json())
      .then(userData => {
        console.log(userData)

        const requestData = {
          ...data,
          'user_id': userData.id,
          'img': profileImage.file
        };

        const requests = {
          method: "POST",
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token)}`
          },
          body: JSON.stringify(requestData)
        }

        return fetch('/api/v1/create_profile', requests);
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setServerRes(data.msg)
        setShow(true)

      })
      .catch(err => console.log(err))

    reset()
  }
  return (
    <div className="edit-card">

      <div className="container emp-profile">
        <div className="row">
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
            <h1 className="h2 mb-3 fw-bold text-center">Profile</h1>
          }
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <div className="profile-img mt-5">
                <img className="img-edit" src={profileImage.filedisplay || "https://ncs.cd.gov.mn/wp-content/themes/icetheme/assets/images/no-image-small.png"} alt="" />
                <div className="file btn btn-lg btn-primary">
                  Select Image
                  <input type="file" onChange={displayResizeImage} />
                </div>
              </div>
              {invalidImage !== null ? <span style={{ color: "#ff5470", }}> <small> {invalidImage} </small></span> : null}
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Edit Your profile</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Full Name</label>
                  <input type="text" className="form-control" placeholder="full name" {...register('full_name', { required: true })} />
                </div>
                {errors.full_name && <span className="" style={{ color: "#ff5470", }}>
                  <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Full name is required</small></span>}
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Phone Number</label>
                  <input type="text" className="form-control" placeholder="enter phone number" {...register('phone_number', { required: true })} />
                </div>
                {errors.phone_number && <span className="" style={{ color: "#ff5470", }}>
                  <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Phone number is required</small></span>}
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input type="text" className="form-control" placeholder="country" {...register('country', { required: true })} />
                </div>
                <div className="col-md-6">
                  <label className="labels">City</label>
                  <input type="text" className="form-control" placeholder="city" {...register('city', { required: true })} />
                </div>
                {errors.country && <span className="" style={{ color: "#ff5470", }}>
                  <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Country is required</small></span>}
                {errors.city && <span className="" style={{ color: "#ff5470", }}>
                  <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> City is required</small></span>}
                <div className="col-md-6">
                  <label className="labels">Sector</label>
                  <input type="text" className="form-control" placeholder="sector" {...register('sector', { required: true })} />
                </div>
                <div className="col-md-6">
                  <label className="labels">Cell</label>
                  <input type="text" className="form-control" placeholder="cell" {...register('cell', { required: true })} />
                </div>
                {errors.sector && <span className="" style={{ color: "#ff5470", }}>
                  <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Sector is required</small></span>}
                {errors.cell && <span className="" style={{ color: "#ff5470", }}>
                  <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Cell is required</small></span>}
                <div className="col-md-12">
                  <label className="labels">Zip code</label>
                  <input type="text" className="form-control" placeholder="zip code" {...register('district', { required: true })} />
                </div>
                {errors.district && <span className="" style={{ color: "#ff5470", }}>
                  <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> District is required</small></span>}
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" onClick={handleSubmit(submitForm)} type="button">Save Profile</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Bio and Link</span><span className="border px-3 p-1 add-experience">Go back</span>
              </div><br />
              <div className="col-md-12">
                <label className="labels">Bio</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" {...register('bio_txt', { required: true })} />
              </div>
              {errors.bio_txt && <span className="" style={{ color: "#ff5470", }}>
                <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Bio is required</small></span>}
              <br />
              <div className="col-md-12">
                <label className="labels">Link</label>
                <input type="text" className="form-control" placeholder="additional details" {...register('social_link', { required: true })} />
              </div>
              {errors.social_link && <span className="" style={{ color: "#ff5470", }}>
                <FontAwesomeIcon icon={faCircleExclamation} beatFade /> <small> Social link  is required</small></span>}
            </div>
          </div>
        </div>
      </div>
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img className="img-edit image-rounded" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>
                  Kshiti Ghelani
                </h5>
                <h6>
                  Dent and Collision Repair
                </h6>
                <p className="proile-rating">
                  <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                  <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                  <span className="star checked"><FontAwesomeIcon icon={faStar} /></span>
                  <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                  <span className="star"><FontAwesomeIcon icon={faStar} /></span>
                </p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <Link className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2" title="edit profile">
              <img className="mb-1" src={process.env.PUBLIC_URL + '/img/edit/edit.svg'} alt="" width="20" height="20" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <h6 className="mt-5"><FontAwesomeIcon icon={faMapMarkerAlt} /> Karuruma, Kigali, Rwanda</h6>
                <p>LINK</p>
                <Link href="" className="link">Website Link</Link><br />
                <p>BIO</p>
                <Link className="link">Born in 1985, John Rodriguez turned his childhood passion for cars into a thriving career.
                  Specializing in auto repair, he founded "Rodriguez Auto Care" in 2012.</Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>Kshiti Ghelani</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>kshitighelani@gmail.com</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>123 456 7890</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Services</label>
                    </div>
                    <div className="col-md-6">
                      <p>Web Developer and Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>

  );
}
export default ProfilePage
