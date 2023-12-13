import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useLocation, Link } from 'react-router-dom';

const ViewProfilePage = () => {
    //let params = useParams();

    const location = useLocation();
    const { fromHome } = location.state;
    let data = fromHome.technician;

    if (!data) {
        //Handle the case where technician is null or undefined
        return <div>Error: Technician not found</div>;
    }

    return (
        <>
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
                                    {data.full_name}
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
                                <h6 className="mt-5"><FontAwesomeIcon icon={faMapMarkerAlt} /> {data.locations[0].country}, {data.locations[0].city},  {data.locations[0].cell} </h6>
                                <p>LINK</p>
                                <a href={data.social_link} className="link"> <FontAwesomeIcon icon={faLink} />website.com</a><br />
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
                                            <p>{data.full_name}</p>
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
                                            <p>{data.phone_number}</p>
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
        </>
    )
}

export default ViewProfilePage;
