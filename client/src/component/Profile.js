import React, { useEffect } from "react";
import { loginGithub } from "../api/loginGithub";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="login-form">
        <h2>Hello {user_data.login} </h2>

        <form onSubmit={handleLogout}>
            <button className={"test"}
              type="submit" 
            > Logout</button>

        </form>
    </div>
  );
};

export default Profile;