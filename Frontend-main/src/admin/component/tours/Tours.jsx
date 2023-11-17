import "./tours.css";
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Checkbox, Input, Pagination, Table, Tooltip, Modal, Select, Form, InputNumber, Upload, Button, message, Popover, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BASE_URL } from "./../../../utils/config";
import Compressor from "compressorjs";
import useFetch from "../../../hooks/useFetch";
import { AiFillEdit, AiFillPlusCircle } from "react-icons/ai";
import { AuthContext } from "../../../context/AuthContext";

const Tours = () => {
    const { Search } = Input;
    const { token } = useContext(AuthContext);
    const [tours, setTours] = useState([]);
    const [totalTours, setTotalTours] = useState(0);
    const [current, setCurrent] = useState(1);
    const [searchTitle, setSearchTitle] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const { TextArea } = Input;
    const [formDataAdd, setFormDataAdd] = useState({
        arrival: "",
        content: "",
        depart: "",
        duration: 0,
        image: "",
        maxGuestSize: 0,
        price: 0,
        status: "",
        title: "",
        transport: "",
        type: ""
    });

    const [formDataEdit, setFormDataEdit] = useState(
        {
            id: "",
            arrival: "",
            content: "",
            depart: "",
            duration: 0,
            image: "",
            maxGuestSize: 0,
            price: 0,
            status: "",
            title: "",
            transport: "",
            type: ""
        }
    );

    useEffect(() => {
        fetchTours();
        setFormDataEdit(selectedRecord);
    }, [current, searchTitle, selectedRecord]);

    const fetchTours = async () => {
        setLoading(true);

        const requestData = {
            page: current,
            page_size: 10,
            sortField: "content",
            sortType: "asc",
            status: ["AVAILABLE", "UNAVAILABLE"],
            title: searchTitle,
        };


        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/tour/view_list_tour`,
                requestData,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                    },
                }
            );

            setTotalTours(response.data.totalElements);
            setTours(response.data.content);
            setLoading(false);
        } catch (error) {
            alert("Không thể xóa tour");
            setError(error.message);
            setLoading(false);
        }
    };

    const handleAddTour = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/api/v1/tour/create_tour`,
                formDataAdd,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAddModalOpen(!addModalOpen);
            setFormDataAdd({
                arrival: "",
                content: "",
                depart: "",
                duration: 0,
                image: "",
                maxGuestSize: 0,
                price: 0,
                status: "",
                title: "",
                transport: "",
                type: ""
            })
            fetchTours();

        } catch (error) {
            setError(error.message);
        }
    }


    const handleEditTour = async () => {
        try {
            const response = await axios.put(
                `${BASE_URL}/api/v1/tour/update_tour`,
                formDataEdit,
                {
                    headers: {
                        accept: "*/*",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setEditModalOpen(!editModalOpen);
            fetchTours();

        } catch (error) {
            setError(error.message);
        }
    }
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            width: 120
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image) => <img src={image}/>,
            width: 80
        },
        {
            title: 'Arrival',
            dataIndex: 'arrival',
            width: 80
        },
        {
            title: 'Depart',
            dataIndex: 'depart',
            width: 80
        },
        {
            title: 'Content',
            dataIndex: 'content',
            ellipsis: {
                showTitle: false,
            },
            render: (content) => (
                <Tooltip placement="topLeft" title={content}>
                    {content}
                </Tooltip>
            ),
            width: 120
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            sorter: (a, b) => a.duration - b.duration,
            width: 80
        },
        {
            title: 'Transport',
            dataIndex: 'transport',
            render: (transport) => {
                let tagColor;
                let transportName;
            
                switch (transport) {
                    case "AIRPLANE":
                        tagColor = "red";
                        transportName = "Airplane";
                        break;
                    case "CAR":
                        tagColor = "orange";
                        transportName = "Car";
                        break;
                    case "TRAIN":
                        tagColor = "green";
                        transportName = "Train";
                        break;
                }
                return <Tag color={tagColor}>{transportName}</Tag>;
              },
            width: 80
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => {
                const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
                return formattedPrice;
            },
            width: 80
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                let tagColor;
                let statusName;
            
                switch (status) {
                    case "AVAILABLE":
                        tagColor = "green";
                        statusName = "Available";
                        break;
                    case "UNAVAILABLE":
                        tagColor = "red";
                        statusName = "Unavailable";
                        break;
                }
                return <Tag color={tagColor}>{statusName}</Tag>;
            },
            width: 80
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (type) => {
                let tagColor;
                let typeName;
            
                switch (type) {
                    case "HOLIDAY":
                        tagColor = "red";
                        typeName = "Holiday";
                        break;
                    case "HOT_TOUR":
                        tagColor = "orange";
                        typeName = "Hot Tour";
                        break;
                    case "SHORT_TOUR":
                        tagColor = "green";
                        typeName = "Short Tour";
                        break;
                    case "TEAM_BUILDING":
                        tagColor = "blue";
                        typeName = "Team Building";
                        break;
                }
            
                return <Tag color={tagColor}>{typeName}</Tag>;
              },
            width: 80,
        },
        {
            title: 'Max Guest Size',
            dataIndex: 'maxGuestSize',
            sorter: (a, b) => a.maxGuestSize - b.maxGuestSize,
            width: 60
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
            width: 60
        },
    ];

    const onChangePage = (page) => {
        setCurrent(page);
    };

    const onSearch = (value) => setSearchTitle(value);

    const toggleAddModal = () => {
        setAddModalOpen(!addModalOpen);
    };

    const toggleEditModal = () => {
        setEditModalOpen(!editModalOpen);
    };

    const handleSelectType = (value) => {
        setFormDataAdd((prevData) => ({ ...prevData, type: value }));
    }

    const handleSelectStatus = (value) => {
        setFormDataAdd((prevData) => ({ ...prevData, status: value }));
    }

    const handleSelectTransport = (value) => {
        setFormDataAdd((prevData) => ({ ...prevData, transport: value }));
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataAdd((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setFormDataEdit((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleEditSelectType = (value) => {
        setFormDataEdit((prevData) => ({ ...prevData, type: value }));
    }

    const handleEditSelectStatus = (value) => {
        setFormDataEdit((prevData) => ({ ...prevData, status: value }));
    }

    const handleEditSelectTransport = (value) => {
        setFormDataEdit((prevData) => ({ ...prevData, transport: value }));
    }




    return (
        <section className="main container section">
            <div className="secTitle">
                <h3 data-aos="fade-right" className="title">
                    Manage Tour
                </h3>
            </div>
            <div className="destination-search">
                <div data-aos="fade-right" className="destinationInput">
                    <label htmlFor="city">
                        Search TourName
                    </label>
                    <div className="inputSearch flex">
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </div>
                </div>
                <div data-aos="fade-right" className="add-tour"><button className="btn" onClick={toggleAddModal}>ADD TOUR<AiFillPlusCircle /></button></div>
            </div>
            <div data-aos="fade-up" className="table">
                <Table columns={columns} dataSource={tours} pagination={false} rowKey={(record) => record.id}
                    onRow={(record) => ({
                        onClick: () => setSelectedRecord(record)
                    })}>
                </Table>
            </div>
            <Pagination current={current} onChange={onChangePage} total={totalTours} />

            <Modal
                title="ADD TOUR"
                centered
                open={addModalOpen}
                onOk={handleAddTour}
                onCancel={() => setAddModalOpen(false)}
                width={800}
            >
                <Form name="trigger" style={{ maxWidth: 800 }} layout="vertical" autoComplete="off">

                    <Form.Item
                        label="Title"


                    >
                        <Input name="title"
                            value={formDataAdd.title} placeholder="Input title..." onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Depart"

                    >
                        <Input name="depart" value={formDataAdd.depart} placeholder="Input departure..." onChange={handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Arrival"
                    >
                        <Input value={formDataAdd.arrival} name="arrival"
                            placeholder="Input arrival..." onChange={handleChange} />
                    </Form.Item>

                    <Form.Item label="Type">
                        <Select onSelect={handleSelectType}>
                            <Select.Option name="type" value="HOLIDAY">Holiday</Select.Option>
                            <Select.Option name="type" value="HOT_TOUR">Hot Tour</Select.Option>
                            <Select.Option name="type" value="SHORT_TOUR">Short Tour</Select.Option>
                            <Select.Option name="type" value="TEAM_BUILDING">Team Building</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Duration" onChange={handleChange}>
                        <InputNumber min={0} name="duration" value={formDataAdd.duration} placeholder="Input days of tour..." />
                    </Form.Item>

                    <Form.Item label="Transport">
                        <Select onSelect={handleSelectTransport}>
                            <Select.Option name="transport" value="AIRPLANE">Airplane</Select.Option>
                            <Select.Option name="transport" value="CAR">Car</Select.Option>
                            <Select.Option name="transport" value="TRAIN">Train</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Content" onChange={handleChange}>
                        <TextArea rows={4} name="content" value={formDataAdd.content} placeholder="Input tour description..." />
                    </Form.Item>

                    <Form.Item label="Price" onChange={handleChange}>
                        <InputNumber min={0} name="price" value={formDataAdd.price} placeholder="Input price" />
                    </Form.Item>

                    <Form.Item label="Status">
                        <Select name="status" onSelect={handleSelectStatus}>
                            <Select.Option value="AVAILABLE">Available</Select.Option>
                            <Select.Option value="UNAVAILABLE">Unavailable</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Max Guest Size" onChange={handleChange}>
                        <InputNumber min={0} name="maxGuestSize" value={formDataAdd.maxGuestSize} placeholder="Input max number..." />
                    </Form.Item>

                    <Form.Item label="Image">
                        <Upload
                            beforeUpload={(file) => {
                                return new Promise((resolve, reject) => {
                                    if (file.size > 9000000) {
                                        reject('File size exceeded');
                                        message.error('File size exceed')
                                    } else {
                                        resolve('Success');
                                    }
                                })
                            }}
                            maxCount={1}
                            showUploadList={false}
                            customRequest={(info) => {
                                const fileImg = info.file;
                                    new Compressor(fileImg, {
                                        quality: 0.6, // Chất lượng sau khi nén (tùy chỉnh)
                                        success(result) {
                                          const reader = new FileReader();
                              
                                
                                          reader.onload = (event) => {
                                            const imageDataUrl = event.target.result;
                                            console.log(imageDataUrl);
                                
                                            setFormDataAdd((prevData) => ({
                                              ...prevData,
                                              image: imageDataUrl,
                                            }));
                                          };
                                
                                          reader.readAsDataURL(result);
                                        },
                                        error(err) {
                                          console.error(err.message);
                                        },
                                      });
                            }}
                        >
                            <Button>Upload</Button>
                            {fileList.name}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="EDIT TOUR"
                centered
                open={editModalOpen}
                onOk={handleEditTour}
                onCancel={() => setEditModalOpen(false)}
                width={800}
            >
                {formDataEdit && (
                    <Form name="editTour" style={{ maxWidth: 800 }} layout="vertical" autoComplete="off">

                        <Form.Item
                            label="Title"
                        >
                            <Input name="title" value={formDataEdit.title}
                                placeholder="Input title..." onChange={handleChangeEdit} />
                        </Form.Item>

                        <Form.Item
                            label="Depart"

                        >
                            <Input name="depart" value={formDataEdit.depart} placeholder="Input departure..." onChange={handleChangeEdit} />
                        </Form.Item>

                        <Form.Item
                            label="Arrival"
                        >
                            <Input value={formDataEdit.arrival} name="arrival"
                                placeholder="Input arrival..." onChange={handleChangeEdit} />
                        </Form.Item>

                        <Form.Item label="Type">
                            <Select value={formDataEdit.type} onSelect={handleEditSelectType}>
                                <Select.Option name="type" value="HOLIDAY">Holiday</Select.Option>
                                <Select.Option name="type" value="HOT_TOUR">Hot Tour</Select.Option>
                                <Select.Option name="type" value="SHORT_TOUR">Short Tour</Select.Option>
                                <Select.Option name="type" value="TEAM_BUILDING">Team Building</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Duration" onChange={handleChangeEdit}>
                            <InputNumber min={0} name="duration" value={formDataEdit.duration} placeholder="Input days of tour..." />
                        </Form.Item>

                        <Form.Item label="Transport">
                            <Select value={formDataEdit.transport} onSelect={handleEditSelectTransport}>
                                <Select.Option name="transport" value="AIRPLANE">Airplane</Select.Option>
                                <Select.Option name="transport" value="CAR">Car</Select.Option>
                                <Select.Option name="transport" value="TRAIN">Train</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Content" onChange={handleChangeEdit}>
                            <TextArea rows={4} name="content" value={formDataEdit.content} placeholder="Input tour description..." />
                        </Form.Item>

                        <Form.Item label="Price" onChange={handleChangeEdit}>
                            <InputNumber min={0} name="price" value={formDataEdit.price} placeholder="Input price" />
                        </Form.Item>

                        <Form.Item label="Status">
                            <Select name="status" value={formDataEdit.status} onSelect={handleEditSelectStatus}>
                                <Select.Option value="AVAILABLE">Available</Select.Option>
                                <Select.Option value="UNAVAILABLE">Unavailable</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Max Guest Size" onChange={handleChangeEdit}>
                            <InputNumber min={0} name="maxGuestSize" value={formDataEdit.maxGuestSize} placeholder="Input max number..." />
                        </Form.Item>

                        <Form.Item label="Image">
                            <Upload
                                beforeUpload={(file) => {
                                    return new Promise((resolve, reject) => {
                                        if (file.size > 9000000) {
                                            reject('File size exceeded');
                                            message.error('File size exceed')
                                        } else {
                                            resolve('Success');
                                        }
                                    })
                                }}
                                maxCount={1}
                                showUploadList={false}
                                customRequest={(info) => {
                                    const fileImg = info.file;
                                    new Compressor(fileImg, {
                                        quality: 0.6, // Chất lượng sau khi nén (tùy chỉnh)
                                        success(result) {
                                          const reader = new FileReader();
                              
                                
                                          reader.onload = (event) => {
                                            const imageDataUrl = event.target.result;
                                            console.log(imageDataUrl);
                                
                                            setFormDataEdit((prevData) => ({
                                              ...prevData,
                                              image: imageDataUrl,
                                            }));
                                          };
                                
                                          reader.readAsDataURL(result);
                                        },
                                        error(err) {
                                          console.error(err.message);
                                        },
                                      });
                                    // setFileList(info.file);
                                    // setFormDataEdit((prevData) => ({ ...prevData, image: URL.createObjectURL(info.file) }))
                                }}
                            >
                                <Button>Upload</Button>
                                {formDataEdit.image}
                            </Upload>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </section>


    )
}
export default Tours;