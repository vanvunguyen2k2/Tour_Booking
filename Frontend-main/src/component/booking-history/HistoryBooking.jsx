import "./historyBooking.css";
import React, { useContext, useEffect, useState } from 'react';
import { Tag, Table, Popover } from 'antd';
import { AuthContext } from "../../context/AuthContext";
import { GiCancel } from "react-icons/gi";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { BASE_URL } from "../../utils/config";


const HistoryBooking = () => {
    const { token, id } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState({
        account: {id: 0},
        id: 0,
        guestSize: 0,
        note: "",
        price: 0,
        status:"",
        tour: {id:0}

    });

    const [open, setOpen] = useState(false);
    const hide = () => {
      setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };

    const [formDataEdit, setFormDataEdit] = useState({
    
        accountId: 0,
        bookingId: 0,
        guestSize: 0,
        note: "",
        price:0,
        status: "",
        tourId: 0
    
})


    const columns = [
        {
            title: 'Tour Image',
            dataIndex: ['tour', 'image'],
            render: (image) => <img src={image}/>,
        },
        {
            title: 'Tour Name',
            dataIndex: ['tour', 'title'],
        },
        {
            title: 'Depart',
            dataIndex: ['tour', 'depart'],
        },
        {
            title: 'Arrival',
            dataIndex: ['tour', 'arrival'],
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
                        {(selectedRecord?.id == record?.id && record.status == "CONFIRM") ? (
                        <a>
                            <Popover
                                content={<div><p>Do you want to cancel? </p><a onClick={() => handleEditBooking()}>OK</a></div>}
                                title="Confirm"
                                trigger="click"
                                open={open}
                                onOpenChange={handleOpenChange}
                            ><GiCancel /></Popover></a>
                        ) : (<></>)}
                        {/* {(selectedRecord?.id == record?.id) ? (
                            <Popover
                                content={<div><p>Do you want to delete? </p><a onClick={() => handleDelete(record.id)}>Delete</a></div>}
                                title="Confirm"
                                trigger="click"
                                open={openDelete}
                                onOpenChange={handleOpenChange}
                            >
                                <a><AiFillDelete /></a>
                            </Popover>
                        ) : (<><a><AiFillDelete /></a></>)} */}

                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        fetchHistory();
        setFormDataEdit({
            accountId: selectedRecord.account.id,
            bookingId: selectedRecord.id,
            guestSize: selectedRecord.guestSize,
            note: selectedRecord.note,
            price: selectedRecord.price,
            status: "CANCEL",
            tourId: selectedRecord.tour.id
        });
        // console.log(selectedRecord);
    }, [selectedRecord]);
    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/bookings/history/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setHistory(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    

    const handleEditBooking = async () => {
        const bookingId = selectedRecord.id;

        try {
            const response = await axios.put(
                `${BASE_URL}/bookings/update/${bookingId}`,
                formDataEdit,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOpen(false);
            fetchHistory();

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section className="history container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    My Booking History
                </h3>
            </div>
            <div data-aos="fade-up" className="table">
                <Table columns={columns} dataSource={history} rowKey={(record) => record.id}
                    onRow={(record) => ({
                        onClick: () => { setSelectedRecord(record) }
                    })}
                    >
                </Table>
            </div>
        </section>
    )
    
}

export default HistoryBooking;