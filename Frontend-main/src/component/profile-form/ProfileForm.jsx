import { Input, Form } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import "./profileForm.css";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';


const ProfileForm = () => {

    const { token, id, username } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState(null);
    const [formDataEdit, setFormDataEdit] = useState({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        status: "ACTIVE"
    });

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setFormDataEdit((prevData) => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        fetchAccount();
        // setFormDataEdit(account);
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
            setFormDataEdit(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    

const handleEditAccount = async () => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/accounts/update/${id}`,
                formDataEdit,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Cập nhật thành công");
            window.location.reload();
        } catch (error) {
            setError(error.message);
        }
    }



    return (
        <section className="history container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Update Personal Information
                </h3>
                <div className="card">
                    <Form name="trigger" style={{ minWidth: 500 }} layout="vertical" autoComplete="off">

                        <Form.Item
                            label="Username" onChange={handleChangeEdit}
                        >
                            <Input name="username" value={username} disabled placeholder="Input username..." />
                        </Form.Item>
                        <Form.Item
                            label="Full Name" onChange={handleChangeEdit}
                        >
                            <Input name="fullName" value={formDataEdit.fullName} placeholder="Input full name..." />
                        </Form.Item>
                        <Form.Item
                            label="Email" onChange={handleChangeEdit}
                        >
                            <Input name="email" value={formDataEdit.email} placeholder="Input email..." />
                        </Form.Item>
                        <Form.Item
                            label="Phone" onChange={handleChangeEdit}
                        >
                            <Input name="phone" value={formDataEdit.phone} placeholder="Input phone..." />
                        </Form.Item>
                        <Form.Item
                            label="Address" onChange={handleChangeEdit}
                        >
                            <Input name="address" value={formDataEdit.address} placeholder="Input address..." />
                        </Form.Item>
                    </Form>
                    <button type='submit' onClick={handleEditAccount} className='btn'>UPDATE</button>
                </div>

            </div>
        </section>
    )
}

export default ProfileForm;