import "./details.css";
import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { TbCategory, TbLocation } from "react-icons/tb";
import { GrLocation } from "react-icons/gr";
import { BiTimeFive, BiBus } from "react-icons/bi";
import { FaCheckToSlot } from "react-icons/fa6";
import { BsFillCartCheckFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import Aos from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../../context/AuthContext";

const Details = () => {

    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);
    const { id } = useParams();
    const {
        data: tour,
        loading,
        error,
    } = useFetch(`${BASE_URL}/api/v1/tour/viewdetail/${id}`);
    const loginRequired = () => {
        alert("Bạn phải đăng nhập để đặt tour");
        navigate("/login");
    }
    const { arrival, content, depart, duration, image, maxGuestSize, price, title, transport, type } = tour;
    const formattedPrice = new Intl.NumberFormat("vi-VN").format(price);
    return (
        <>
            <section className="details container">
                <div data-aos="fade-right" className="title">
                    {title}
                </div>
                <div className="info" data-aos="fade-up">
                    <div className="card">
                        <table className="table-detail">
                            <tbody>
                                <tr>
                                    <td>
                                        <TbCategory className="icon" />
                                        <span className="name-detail">DANH MỤC:</span>
                                    </td>
                                    <td>{type}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <GrLocation className="icon" />
                                        <span className="name-detail">KHỞI HÀNH:</span>
                                    </td>
                                    <td>Từ {depart}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <TbLocation className="icon" />
                                        <span className="name-detail">ĐIỂM ĐẾN:</span>
                                    </td>
                                    <td>{arrival}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <BiTimeFive className="icon" />
                                        <span className="name-detail">THỜI GIAN:</span>
                                    </td>
                                    <td>{duration} ngày</td>
                                </tr>
                                <tr>
                                    <td>
                                        <FaCheckToSlot className="icon" />
                                        <span className="name-detail">CHỖ TRỐNG:</span>
                                    </td>
                                    <td>{maxGuestSize} chỗ trống</td>
                                </tr>
                                <tr>
                                    <td>
                                        <BiBus className="icon" />
                                        <span className="name-detail">PHƯƠNG TIỆN:</span>
                                    </td>
                                    <td>{transport}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card-price">
                        <h3 className="price-title">Giá đặt tour/khách:</h3>
                        <div className="price-tag">{formattedPrice}</div>
                        {token ? (<Link to={`/tour/booking-form/${id}`}>
                            <button className="booking-btn btn">
                                <a href="#"><BsFillCartCheckFill className="icon" /><span>ĐẶT TOUR</span></a>
                            </button>
                        </Link>) : (<button className="booking-btn btn" onClick={loginRequired}>
                            <a href="#"><BsFillCartCheckFill className="icon" /><span>ĐẶT TOUR</span></a>
                        </button>)}

                    </div>
                </div>

                <div className="descript">
                    <div className="img" data-aos="fade-up">
                        <img src={image} alt={title} />
                    </div>
                    <div className="descript-title" data-aos="fade-up">
                        GIỚI THIỆU TỔNG QUAN
                    </div>
                    <hr data-aos="fade-up" />
                    <div data-aos="fade-up">{content}</div>
                </div>

                <div></div>
            </section>
        </>
    )
}

export default Details;

