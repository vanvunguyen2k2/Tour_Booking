import "./bookings.css";
import React, { useContext, useEffect, useState } from 'react';
import { Input, Table, Tag, Modal, Form, Select, Pagination } from 'antd';
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { AiFillEdit, AiFillDelete, AiFillPlusCircle } from "react-icons/ai";

const { Search } = Input;

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


const Bookings = () => {
    const { token } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [searchUsername, setSearchUsername] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState({
        account: {id: 0},
        id: 0,
        guestSize: 0,
        note: "",
        price: 0,
        status:"",
        tour: {id:0}

    });
    const [totalBookings, setTotalBookings] = useState(0);
    const [formDataEdit, setFormDataEdit] = useState({
    
            accountId: 0,
            bookingId: 0,
            guestSize: 0,
            note: "",
            price:0,
            status: "",
            tourId: 0
        
    });

    const onSearch = (value) => setSearchUsername(value);

    const columns = [
        {
            title: 'Username',
            dataIndex: ['account', 'username']
        },
        {
            title: 'Tour Name',
            dataIndex: ['tour', 'title'],
        },
        {
            title: 'Guest Size',
            dataIndex: 'guestSize',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => {
                const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
                return formattedPrice;
            },
        },
        {
            title: 'Booking Date',
            dataIndex: 'bookingDate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                let tagColor;
                let statusName;
            
                switch (status) {
                    case "CONFIRM":
                        tagColor = "green";
                        statusName = "Confirmed";
                        break;
                    case "CANCEL":
                        tagColor = "red";
                        statusName = "Canceled";
                        break;
                }
                return <Tag color={tagColor}>{statusName}</Tag>;
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => {
                return (
                    <div>
                        <a onClick={() => toggleEditModal()}><AiFillEdit /></a>

                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        fetchBookings();
        setFormDataEdit({
            accountId: selectedRecord.account.id,
            bookingId: selectedRecord.id,
            guestSize: selectedRecord.guestSize,
            note: selectedRecord.note,
            price: selectedRecord.price,
            status: selectedRecord.status,
            tourId: selectedRecord.tour.id
        });
        // console.log(selectedRecord);
    }, [selectedRecord, searchUsername, current]);

    const onChangePage = (page) => {
        setCurrent(page);
    };

    const fetchBookings = async () => {
        setLoading(true);
        const requestData = {
            username: searchUsername
        }

        try {
            const response = await axios.post(`${BASE_URL}/bookings/filter?page=${current}&size=10&sort=id%2Casc`,
            requestData,
            {
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setBookings(response.data.content);
            setTotalBookings(response.data.totalElements);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };
    
    const handleEditSelectStatus = (value) => {
        setFormDataEdit((prevData) => ({ ...prevData, status: value }));
    }

    const handleEditBooking = async () => {
        const id = selectedRecord.id;

        try {
            const response = await axios.put(
                `${BASE_URL}/bookings/update/${id}`,
                formDataEdit,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditModalOpen(!editModalOpen);
            fetchBookings();

        } catch (error) {
            setError(error.message);
        }
    }

    return (

        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Manage Bookings
                </h3>
            </div>
            <div className="destination-search">
            <div data-aos="fade-right" className="destinationInput">
                <label data-aos="fade-right" htmlFor="city">
                    Search username
                </label>
                <div className="inputSearch flex">
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />
                </div>
            </div>
            </div>
            <div data-aos="fade-up" className="table">
                <Table columns={columns} dataSource={bookings} pagination={false} rowKey={(record) => record.id}
                    onRow={(record) => ({
                        onClick: () => { setSelectedRecord(record) }
                    })}
                    >
                </Table>
            </div>

            <Pagination current={current} total={totalBookings} onChange={onChangePage} />

            <Modal
                title="UPDATE BOOKING"
                centered
                open={editModalOpen}
                onOk={handleEditBooking}
                onCancel={() => setEditModalOpen(false)}
            >
        
                <Form name="trigger" layout="vertical" autoComplete="off">
    
                    <Form.Item label="Status">
                        <Select name="status" value={formDataEdit.status} onSelect={handleEditSelectStatus}>
                            <Select.Option value="CONFIRM">Confirm</Select.Option>
                            <Select.Option value="CANCEL">Cancel</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
                   
            </Modal> 
        </section>
    )
}
export default Bookings;