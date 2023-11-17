import React, { useContext, useEffect, useState } from 'react';
import './profile.css';
import { Avatar } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import axios from 'axios';

const Profile = () => {
  const { token, username, id } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    fetchAccount();
    console.log(account)
  }, []);

  const fetchAccount = async () => {
    setLoading(true);

    try {
        const response = await axios.get(
            `${BASE_URL}/api/accounts/${id}`,
            {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setAccount(response.data);
        setLoading(false);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
};

  return (
    <section className='profile'>
      <div className='avatar'>
      <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
    size={{ xs: 48, sm: 64, md: 80, lg: 128, xl: 160, xxl: 200 }}>N</Avatar>
    </div>
    <h3 className='fullName'>{account?.fullName}</h3>
    <div className='username'>{account?.username}</div>
    <div className='personalInfo'>
      <div>Phone: </div><label>{account?.phone}</label>
      <div>Email: </div><label>{account?.email}</label>
      <div>Address: </div><label>{account?.address}</label>
    </div>
    </section>
  )
}
export default Profile;