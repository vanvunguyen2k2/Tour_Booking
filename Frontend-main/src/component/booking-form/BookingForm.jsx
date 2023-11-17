import "./bookingForm.css";
import useFetch from "../../hooks/useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { Form, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const BookingForm = () => {
  const { id } = useParams();
  const { id: accountId, token } = useContext(AuthContext);
  const {
    data: tour,
    loading,
    error,
  } = useFetch(`${BASE_URL}/api/v1/tour/viewdetail/${id}`);
  const [priceTour, setPriceTour] = useState(0);
  const [maxGuestSize, setMaxGuestSize] = useState(1);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  const [form, setForm] = useState(
    {
        accountId: accountId,
        guestSize: maxGuestSize,
        note: note,
        tourId: id
    }
  );


  let formattedPrice = new Intl.NumberFormat("vi-VN").format(parseInt(priceTour));

  const handleChangeGuestSize = (val) => {
    setPriceTour(val * tour.price);
    setForm((prevData) => ({ ...prevData, guestSize: val }))
  };

  const handleChangeNote = (val) => {
    setForm((prevData) => ({ ...prevData, note: val.target.value }))
  };
  const handleSubmit = async () => {
    try {
        const response = await axios.post(
            `${BASE_URL}/bookings/create-booking`,
            form
            , {
                headers: {
                    accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
              }
            }
              );

        alert("Đặt tour thành công");
        navigate("/history");
    } catch (error) {

    }
  };


  return (
    <section className="booking-form container">
      <div className="total-price">
        <div className="info">
          <h4 className="title">ĐƠN ĐẶT TOUR</h4>
          <div className="img">
            <img src={tour.image} alt={tour.title} />
          </div>
          <div className="tour-title">{tour.title}</div>
          <hr />
          <div>Tổng Cộng</div>
          <div className="price">{formattedPrice} </div>
        </div>
      </div>
      <div className="form">
        <div className="info">
          <h3 className="title">THÔNG TIN ĐẶT TOUR</h3>
          <hr />
          <Form name="trigger" layout="vertical">
            <Form.Item label="Số lượng khách" >
              <InputNumber min={1} max={tour.maxGuestSize} onChange={(val) => handleChangeGuestSize(val)}/>
            </Form.Item>
            <Form.Item label="Note">
              <TextArea rows={4} onChange={(val) => handleChangeNote(val)}/>
            </Form.Item>
          </Form>
          <button className="btn" onClick={handleSubmit}>
            Xác nhận đặt tour
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
