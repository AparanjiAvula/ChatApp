import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePicture: '',
    // Add other user fields as needed
  });

  useEffect(() => {
    // Fetch user data from an API or local storage
    const fetchUserData = async () => {
      // Replace this with your actual data fetching logic
      const userData = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        profilePicture: 'path/to/profile-picture.jpg',
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    // Implement edit profile logic here
    alert('Edit profile functionality goes here.');
  };

  const handleChangePassword = () => {
    // Implement change password logic here
    alert('Change password functionality goes here.');
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        <img src='https://c8.alamy.com/comp/2WNTCPR/avatar-photo-default-user-icon-picture-face-social-person-image-avatar-vector-illustration-eps-10-stock-image-2WNTCPR.jpg' alt="Profile" />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        {/* Add more user details here */}
      </div>
      <button onClick={handleEditProfile}>Edit Profile</button>
      <button onClick={handleChangePassword}>Change Password</button>
      {/* Add more profile management options here */}
    </div>
  );
};

export default Profile;
