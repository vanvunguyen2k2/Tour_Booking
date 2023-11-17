import React, { useEffect } from "react";
import "./footer.css";
import video2 from "../../assets/images/video (2).mp4";
import {FiSend} from "react-icons/fi";
import { MdOutlineTravelExplore } from 'react-icons/md';
import { AiOutlineTwitter, AiFillYoutube, AiFillInstagram } from 'react-icons/ai';
import { FiChevronRight } from "react-icons/fi";
import Aos from "aos";
import "aos/dist/aos.css";

const Footer = () => {
     // Create a react hook to add a scroll animation
     useEffect(() => {
        Aos.init({duration: 2000})
    }, [])

    return (
        <section className="footer">
            <div className="videoDiv">
                <video src={video2} loop autoPlay muted typeof="video/mp4"></video>
            </div>

            <div className="secContent container">
                <div className="contactDiv flex">
                    <div data-aos="fade-up" className="text">
                        <small>KEEP IN TOUCH</small>
                        <h2>Travel with us</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input data-aos="fade-up" className="text" placeholder="Enter Email Address" />
                        <button data-aos="fade-up" className="btn flex" type="submit">
                            SEND <FiSend className="icon" />
                        </button>
                    </div>
                </div>
                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="#" className="logo flex">
                                <MdOutlineTravelExplore className="icon"/> Travel.
                            </a>
                        </div>

                        <div data-aos="fade-up"className="footerParagraph">
                        Chúng tôi luôn nỗ lực tìm kiếm, lực chọn các nhà cung cấp chất lượng, uy tín để đảm bảo dịch vụ cuối cùng tới quý khách là tốt nhất.Với quy mô văn phòng cả nước, số lượng đoàn khách đông, đối tác lớn và mỗi đoàn luôn được tối ưu để giảm giá thành với mức chất lượng không đổi.
                        </div>
                        <div data-aos="fade-up" className="footerSocials flex">
                            <AiOutlineTwitter className="icon" />
                            <AiFillYoutube className="icon" />
                            <AiFillInstagram className="icon" />
                        </div>
                    </div>

                    <div className="footerLinks grid">
                        <div data-aos="fade-up" data-aos-duration="3000" className="linkGroup">
                            <span className="groupTitle">
                                OUR AGENCY
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Services
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Insurance
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Agency
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Tourism
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Payment
                            </li>
                        </div>

                        <div data-aos="fade-up" data-aos-duration="4000" className="linkGroup">
                            <span className="groupTitle">
                                PARTNERS
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Bookings
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Rentcars
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Airline 
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Hotel
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Stayhome
                            </li>
                        </div>

                        <div data-aos="fade-up" data-aos-duration="5000" className="linkGroup">
                            <span className="groupTitle">
                                LAST MINUTE
                            </span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                HaNoi
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                TP.HCM
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Da Nang
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Hai Phong
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Can Tho
                            </li>
                        </div>
                    </div>

                    <div className="footerDiv flex">
                        <small>BEST TRAVEL WEBSITE</small>
                        <small>COPYRIGHTS RESERVED - MOCK2308 2023</small>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;