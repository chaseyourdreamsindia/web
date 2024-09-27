import axios from "axios";
import React, { act, useEffect, useState } from "react";
import BASE from "../api/api";
import { useNavigate } from "react-router-dom";
import userimg from "../Assets/user.png";
import BRONZE from "../Assets/MemberShipCards/6.png";
import SILVER from "../Assets/MemberShipCards/2.png";
import GOLD from "../Assets/MemberShipCards/1.png";
import PLATINUM from "../Assets/MemberShipCards/3.png";
import DIAMOND from "../Assets/MemberShipCards/4.png";
import STUEMP from "../Assets/MemberShipCards/5.png";

const Profile = () => {
  const [membershipType, setMembershipType] = useState({
    BRONZE,
    SILVER,
    GOLD,
    PLATINUM,
    DIAMOND,
    STUEMP,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [bookings, setbookings] = useState([]);

  const [active, setActive] = useState(0);

  const getBookings = (id) => {
    axios
      .get(`${BASE}/book/bookings/${id}`)
      .then((resp) => {
        // console.log(resp);
        if (resp.data.success) {
          setbookings(resp.data.bookings);
          // console.log(resp)
        } else {
          alert(resp.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Logout = () => {
    localStorage.removeItem("CYDI_TK");
    navigate("/login");
  };

  const getUser = async () => {
    setLoading(true);
    const token = await JSON.parse(localStorage.getItem("CYDI_TK"));
    axios
      .get(`${BASE}/user/${token}`)
      .then((resp) => {
        setLoading(false);
        if (resp.data.message === "jwt expired") {
          navigate("/login");
        } else if (resp.data.user) {
          getBookings(resp.data.user._id);
          setUser(resp.data.user);
          console.log(resp.data.user);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="mt-20 md:w-[80vw] mx-auto p-10">
      <div className="md:grid grid-cols-2">
        <div className="flex flex-row justify-center">
          <img
            src={user ? (user.Profile ? user.Profile : userimg) : userimg}
            alt="profile"
            className="rounded-full w-1/3"
          />
        </div>
        <div className="flex flex-col items-center pt-5">
          <h1 className="font-bold">Personal information</h1>
          <div className="mt-3">
            <h1>
              {" "}
              <span className="font-semibold">Name</span> : {user && user.Name}
            </h1>
            <h1>
              {" "}
              <span className="font-semibold">Email</span> :{" "}
              {user && user.Email}
            </h1>
            <h1>
              {" "}
              <span className="font-semibold">Mobile</span> :{" "}
              {user && user.Mobile}
            </h1>
            <h1>
              {" "}
              <span className="font-semibold">Credits</span> :{" "}
              {user && user.Credits}
            </h1>
            <div onClick={Logout}>
              <i
                class="fa-solid fa-right-from-bracket text-red-500 cursor-pointer"
                title="Logout"
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="border mt-10 flex flex-row justify-evenly items-center rounded-md p-2 text-xs md:text-base">
        <h1
          className="hover:font-bold cursor-pointer"
          onClick={() => setActive(1)}
        >
          Membership Card
        </h1>
        <h1
          className="hover:font-bold cursor-pointer"
          onClick={() => setActive(0)}
        >
          My Bookings
        </h1>
      </div>
      {active === 0 ? (
        <div>
          <h1 className="font-bold mt-3">My Bookings</h1>
          <div className="grid md:grid-cols-2 gap-5 mt-4 text-xs">
            {bookings
              ? bookings.map((itm) => {
                  return (
                    <div className="grid md:grid-cols-2 gap-5 border p-3">
                      <img
                        src={itm.serviceId.background}
                        alt=""
                        className="w-72"
                      />
                      <div>
                        <h1 className="font-semibold text-base">
                          {itm.serviceId.name}
                        </h1>
                        {/* <h1>Motivation | Coaching | Counselling</h1> */}
                        <h1>{itm.serviceId.price} /-</h1>
                        <h1>
                          <span className="font-bold">Date : </span>
                          {itm.date}
                        </h1>
                        <h1>
                          <span className="font-bold">Time : </span>
                          {itm.time}
                        </h1>
                        <h1>
                          <span className="font-bold">Meeting Link : </span>
                          <a href={itm.meetLink}>{itm.meetLink}</a>
                        </h1>
                      </div>
                    </div>
                  );
                })
              : "no Bookings"}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-bold mt-3">Membership Details</h1>
          <div>
            {user && user.Membership.Status ? (
              <div className="mt-2 text-xs">
                <span className="font-semibold">Type of Membership : </span>
                <span>{user.Membership.Name}</span>
                <h1 className="mt-2">
                  <span className="font-semibold">Validity : </span>
                  {user.Membership.Validity}
                </h1>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <h1 className="text-center mt-10">
                  You don't have an active Membership plan 🙁
                </h1>
                <button className="mx-auto p-2 rounded-md bg-gray-500 text-white font-semibold">
                  View Plans
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
