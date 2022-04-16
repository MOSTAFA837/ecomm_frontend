import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import MetaData from "../../Layout/MetaData";
import Loader from "../../Layout/Loader/Loader";

import "./profile.scss";

const Profile = () => {
  const history = useHistory();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div className="img-side side">
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>

            <div className="info-side side">
              <div className="info-detail">
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div className="info-detail">
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div className="info-detail">
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div className="profile_Btns">
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
