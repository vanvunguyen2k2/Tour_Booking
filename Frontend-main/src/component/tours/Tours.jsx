import React, { useEffect, useState } from "react";
import "./tour.css";
import tours from "../../assets/data/tours";
import {
    HiOutlineLocationMarker,
    HiOutlineClipboardCheck,
} from "react-icons/hi";
import Aos from "aos";
import axios from "axios";
import "aos/dist/aos.css";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import video from "./../../Video/video.mp4";
import "./hero.css";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { SlSocialFacebook } from "react-icons/sl";
import { AiOutlineInstagram } from "react-icons/ai";
import { SiTripadvisor } from "react-icons/si";
import { BsListTask } from "react-icons/bs";
import { TbApps } from "react-icons/tb";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";
import { Pagination, Empty } from "antd";


const Tours = () => {
    const [tours, setTours] = useState([]);
    const [totalTours, setTotalTours] = useState(0);
    const [current, setCurrent] = useState(1);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sliderValue, setSliderValue] = useState(20000000);
    const [arrival, setArrival] = useState("");
    const [depart, setDepart] = useState("");

    // const test = useFetch(`${BASE_URL}/tour/getAll`);

    // Create a react hook to add a scroll animation
    useEffect(() => {
        Aos.init({ duration: 2000 });
        fetchTours();
    }, [current]);

    const fetchTours = async () => {
        setLoading(true);

        const requestData = {
            arrival: arrival,
            depart: depart,
            maxPrice: sliderValue,
            minPrice: 1,
            page: current,
            page_size: 10,
            sortField: "content",
            sortType: "asc",
            status: ["AVAILABLE"],
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
            setError(error.message);
            setLoading(false);
        }
    };

    const handleArrivalChange = (event) => {
        setArrival(event.target.value);
    };

    const handleDepartChange = (event) => {
        setDepart(event.target.value);
    };

    const handleSliderChange = (event) => {
        setSliderValue(parseInt(event.target.value));
    };
    const formattedPrice = new Intl.NumberFormat("vi-VN").format(sliderValue);
    const handleSubmit = (event) => {
        event.preventDefault();
        fetchTours();
    };

    const onChangePage = (page) => {
        setCurrent(page);
    };

    return (
        <>
            <section className="home">
                <div className="overlay"></div>
                <video src={video} loop muted autoPlay typeof="video/mp4"></video>

                <div className="homeContent container">
                    <div className="textDiv">
                        <span data-aos="fade-up" className="smallText">
                            Our Packages
                        </span>
                        <h1 data-aos="fade-up" className="homeTitle">
                            Search Your Holiday
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div data-aos="fade-up" className="cardDiv grid">
                            <div className="destinationInput">
                                <label htmlFor="city">Search your arrival</label>
                                <div className="input flex">
                                    <input
                                        type="text"
                                        placeholder="Enter arrival here..."
                                        id="arrival"
                                        value={arrival}
                                        onChange={handleArrivalChange}
                                    />
                                    <GrLocation className="icon" />
                                </div>
                            </div>

                            <div className="destinationInput">
                                <label htmlFor="city">Search your departure</label>
                                <div className="input flex">
                                    <input
                                        type="text"
                                        placeholder="Enter departure here..."
                                        id="departure"
                                        value={depart}
                                        onChange={handleDepartChange}
                                    />
                                    <GrLocation className="icon" />
                                </div>
                            </div>

                            <div className="priceInput">
                                <div className="label_total flex">
                                    <label htmlFor="" className="price">
                                        Max Price
                                    </label>
                                    <h3 className="total">{formattedPrice}</h3>
                                </div>
                                <div className="input flex">
                                    <input
                                        type="range"
                                        max="20000000"
                                        min="0"
                                        step="1000000"
                                        value={sliderValue}
                                        onChange={handleSliderChange}
                                        id="maxPrice"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="searchOptions flex">
                                <HiFilter className="icon" />
                                <span>FILTER</span>
                            </button>
                        </div>
                    </form>

                    <div data-aos="fade-up" className="homeFooterIcons flex">
                        <div className="rightIcons">
                            <SlSocialFacebook className="icon" />
                            <AiOutlineInstagram className="icon" />
                            <SiTripadvisor className="icon" />
                        </div>
                        <div className="leftIcons">
                            <BsListTask className="icon" />
                            <TbApps className="icon" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="main container section" id="tourList">
                {tours.length ? (
                    <>
                        <div className="secTitle">
                            <h3 data-aos="fade-right" className="title">
                                Most visited destinations
                            </h3>
                        </div>

                        <div className="secContent grid">
                            {tours.map(
                                ({ id, arrival, depart, type, price, title, image }) => {
                                    const formattedPrice = new Intl.NumberFormat("vi-VN").format(
                                        price
                                    );
                                    return (
                                        <div
                                            key={id}
                                            data-aos="fade-up"
                                            className="singleDestination"
                                        >
                                            <div className="imageDiv">
                                                <img src={image} alt={title} />
                                            </div>

                                            <div className="cardInfo">
                                                <h4 className="destTitle">{title}</h4>
                                                <span className="continent flex">
                                                    <HiOutlineLocationMarker className="icon" />
                                                    <span className="name">
                                                        {depart} - {arrival}
                                                    </span>
                                                </span>

                                                <div className="fees flex">
                                                    <div className="grade">
                                                        <span>{type}</span>
                                                    </div>
                                                    <div className="price">
                                                        <h5>{formattedPrice}</h5>
                                                    </div>
                                                </div>
                                                
                                                <Link to={`/tour/${id}`}>
                                                <button className="btn flex">
                                                    DETAILS <HiOutlineClipboardCheck className="icon" />
                                                </button>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                        <Pagination current={current} onChange={onChangePage} total={totalTours}/>
                    </>
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </section>
        </>
    );
};

export default Tours;
