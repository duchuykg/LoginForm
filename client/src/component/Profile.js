import React, { useEffect } from "react";

const Profile = () => {
  const user_data = JSON.parse(localStorage.getItem("user_data"))
  const handleLogout = () => {
    localStorage.clear();
  };


  useEffect(() => {
    if (!user_data) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [user_data]);


  if (!user_data) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="login-form">
      <div className="content"></div>
        {user_data.avatar && (
        <img className="avatar" src={user_data.avatar} alt="Avatar" />
        )}
                <h2> {user_data.name ? user_data.name : "Welcome, " + user_data.login + " !"} </h2>

        <form onSubmit={handleLogout}>
            <button className={"test"}
              type="submit" 
            > Logout</button>

        </form>
    </div>
  );
};

export default Profile;