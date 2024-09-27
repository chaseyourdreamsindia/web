import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import BASE from "../api/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import whatsapp from "../Assets/whatsapp.png";

const Services = () => {
  const [coupon, setCoupon] = useState("");
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();

  const [loading3, setLoading3] = useState(false);

  const [currentHours, setCurrentHours] = useState(new Date().getHours());
  const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes());

  const [accepted, setAccepted] = useState(false);
  const [accepted2, setAccepted2] = useState(false);

  const [value, setValue] = React.useState(new Date());
  const [Membership, setMemberships] = useState([]);
  const [sha, setSha] = useState();
  const [selectedTime, setSelectedTime] = useState();

  const [checkbox, setCheckbox] = useState(false);
  const [user, setUser] = useState();

  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  const [week, setWeek] = useState(0);
  const [slots, setSlots] = useState([]);

  const [selected, setSelected] = useState();
  const [selMember, setSelMember] = useState();

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const FetchServices = () => {
    setLoading(true);
    axios
      .get(`${BASE}/services/all`)
      .then((resp) => {
        setLoading(false);
        if (resp.data.success) {
          setServices(resp.data.services);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const FetchMemberships = () => {
    setLoading(true);
    axios
      .get(`${BASE}/membership`)
      .then((resp) => {
        setLoading(false);
        if (resp.data.success) {
          setMemberships(resp.data.memberships);
        } else {
          alert(resp.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const ApplyCredits = () => {
    if (accepted) {
      setLoading2(true);
      if (user.Credits > 0) {
        axios.post(`${BASE}/book/check`, {
          time: selectedTime,
          date: value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate(),
        }).then(resp => {
          if (resp.data.success) {
            axios.get(`${BASE}/book/withcredit/${user._id}/${selected._id}`).then(resp => {
              if (resp.data.success) {
                axios.post(`${BASE}/book`, {
                  time: selectedTime,
                  Email: user.Email,
                  serviceID: selected._id,
                  date: value.getFullYear() + "-" + (value.getMonth() + 1) + "-" + value.getDate(),
                }).then(resp => {
                  alert(resp.data.message);
                  setLoading2(false);
                }).catch(err => console.log(err));
              } else {
                setLoading2(false);
                alert(resp.data.message);
              }
            }).catch(err => {
              alert(err.message);
              setLoading2(false);

            })
          } else {
            alert(resp.data.message);
            setLoading2(false);
          }
        }).catch(err => console.log(err));
      }
    } else {
      alert("please check the checkbox.");
    }
  }


  const weeks = React.useMemo(() => {
    const start = moment().add(week, "weeks").startOf("week");
    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, "week").add(index, "day");
        return {
          day: date.format("ddd"),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const getTimeSlots = () => {
    fetch(`${BASE}/timeslot/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) =>
        resp
          .json()
          .then((dta) => {
            setSlots(dta.timeslots);
          })
          .catch((err) => console.log(err)),
      )
      .catch((err) => console.log(err));
  };

  const getUser = async () => {
    const token = await JSON.parse(localStorage.getItem("CYDI_TK"));
    axios
      .get(`${BASE}/user/${token}`)
      .then((resp) => {
        setLoading(false);
        if (resp.data.message === "jwt expired") {
        } else if (resp.data.user) {
          setUser(resp.data.user);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    FetchServices();
    getTimeSlots();
    FetchMemberships();
    getUser();
  }, []);

  const SubmitHandler = (srv) => {
    if (user) {
      if (selectedTime && accepted) {
        setLoading2(true);
        axios
          .post(`${BASE}/book/check`, {
            time: selectedTime,
            date:
              value.getFullYear() +
              "-" +
              (value.getMonth() + 1) +
              "-" +
              value.getDate(),
          })
          .then((resp) => {
            if (resp.data.success) {
              axios
                .post(`${BASE}/payment/pay`, {
                  FirstName: user.Name,
                  TotalAmount: srv.price,
                  MobileNumber: user.Mobile,
                  time: selectedTime,
                  Email: user.Email,
                  srvid: srv._id,
                  date:
                    value.getFullYear() +
                    "-" +
                    (value.getMonth() + 1) +
                    "-" +
                    value.getDate(),
                })
                .then((resp) => {
                  setLoading2(false);
                  if (resp.status === 200) {
                    window.location.href = resp.data;
                  }
                })
                .catch((err) => {
                  setLoading2(false);
                  console.log(err);
                });
            } else {
              alert(resp.data.message);
            }
          })
          .catch((err) => {
            setLoading2(false);
          });
      } else {
        alert("please select checkbox and time");
      }
    } else {
      navigate("/login");
    }
  };

  const PurchaseMembership = async (membership) => {
    if (accepted2) {
      setLoading3(true);
      if (user) {
        axios
          .post(`${BASE}/payment/membership/pay`, {
            FirstName: user.Name,
            TotalAmount: membership.Price,
            MobileNumber: user.Mobile,
            Email: user.Email,
            mid: selMember._id,
          })
          .then((resp) => {
            setLoading3(false);
            if (resp.status === 200) {
              window.location.href = resp.data;
            }
          })
          .catch((err) => {
            setLoading3(false);
            console.log(err);
          });
      } else {
        navigate("/login");
      }
    }
  };

  return (
    <div className="pt-10 overflow-hidden">
      <Dialog open={open} onClose={() => setOpen(false)}>
        {selected && (
          <div className=" p-5 md:w-auto">
            <h1 className="text-3xl playfair-italic">
              {selected && selected.name ? selected.name : ""}
            </h1>
            <h1 className="mt-2">
              INR {selected && selected.price ? selected.price : ""} /- (
              including GST )
            </h1>
            <h1 className="font-bold mt-3">Your Schedule</h1>
            <div className="flex flex-row mt-4 overflow-scroll">
              {weeks.map((dates, index) => {
                return (
                  <div className="flex flex-row justify-evenly gap-2 mr-3">
                    {dates.map((date, index) => {
                      const isActive =
                        value.toDateString() === date.date.toDateString();
                      const dt = new Date();
                      const not_blocked =
                        date.date.getTime() >= dt.getTime() ||
                        date.date.getDate() === dt.getDate();
                      if (
                        date.date.getDate() >= dt.getDate() &&
                        date.date.getMonth() + 1 >= dt.getMonth() + 1
                      ) {
                        return (
                          <div
                            onClick={() => {
                              if (not_blocked) {
                                setSlots([]);
                                setValue(date.date);
                                getTimeSlots();
                              }
                            }}
                          >
                            <div
                              style={{ backgroundColor: isActive && "gray" }}
                              className="border p-2 border-gray-100 rounded w-13 cursor-pointer"
                            >
                              <h1
                                style={
                                  isActive
                                    ? { color: "white" }
                                    : { color: !not_blocked ? "gray" : "black" }
                                }
                                className="text-black text-center"
                              >
                                {date.day}
                              </h1>
                              <h1
                                style={
                                  isActive
                                    ? { color: "white" }
                                    : {
                                      color: !not_blocked ? "gray" : "black",
                                      fontWeight: !not_blocked ? 300 : "bold",
                                    }
                                }
                                className="text-black text-center font-bold"
                              >
                                {date.date.getDate()}
                              </h1>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })}
            </div>
            <h1 className="mt-3 ">{value.toDateString()}</h1>
            <h1 className="text-center text-xs font-semibold">Morning</h1>
            <div>
              <div className="flex flex-row gap-2 p-2">
                {slots.map((slot) => {
                  if (slot.Active) {
                    if (slot.time >= "08:00" && slot.time <= "11:45") {
                      const date = new Date();
                      const selDate = new Date(value).getDate();
                      const currDate = new Date().getDate();
                      const hours = date.getHours();
                      const minutes = date.getMinutes();
                      const time = `${hours}:${minutes}`;
                      if (slot.time > time || selDate > currDate) {
                        return (
                          <h1
                            className={`p-2 ${selectedTime === slot.time ? "text-white bg-black rounded border border-black" : "text-black rounded border font-bold border-gray-300"}`}
                            onClick={() => setSelectedTime(slot.time)}
                          >
                            {slot.time}
                          </h1>
                        );
                      } else {
                        return (
                          <h1
                            className={`p-2 ${selectedTime === slot.time ? "text-white bg-black rounded border border-black" : "text-gray-500 rounded border border-gray-300"}`}
                          >
                            {slot.time}
                          </h1>
                        );
                      }
                    }
                  }
                })}
              </div>
            </div>
            <h1 className="text-center text-xs font-semibold mt-3">
              Afternoon
            </h1>
            <div>
              <div className="flex flex-row gap-2 p-2">
                {slots.map((slot) => {
                  if (slot.Active) {
                    if (slot.time > "11:45" && slot.time <= "15:00") {
                      const date = new Date();
                      const selDate = new Date(value).getDate();
                      const currDate = new Date().getDate();
                      const hours = date.getHours();
                      const minutes = date.getMinutes();
                      const time = `${hours}:${minutes}`;
                      if (slot.time > time || selDate > currDate) {
                        return (
                          <h1
                            className={`p-2 ${selectedTime === slot.time ? "text-white bg-black rounded border border-black" : "text-black rounded border font-bold border-gray-300"}`}
                            onClick={() => setSelectedTime(slot.time)}
                          >
                            {slot.time}
                          </h1>
                        );
                      } else {
                        return (
                          <h1
                            className={`p-2 ${selectedTime === slot.time ? "text-white bg-black rounded border border-black" : "text-gray-500 rounded border border-gray-300"}`}
                          >
                            {slot.time}
                          </h1>
                        );
                      }
                    }
                  }
                })}
              </div>
            </div>
            <h1 className="text-center text-xs font-semibold mt-3">Evening</h1>
            <div>
              <div className="flex flex-row gap-2 p-2">
                {slots.map((slot) => {
                  if (slot.Active) {
                    if (slot.time > "15:00" && slot.time <= "18:00") {
                      const date = new Date();
                      const selDate = new Date(value).getDate();
                      const currDate = new Date().getDate();
                      const hours = date.getHours();
                      const minutes = date.getMinutes();
                      const time = `${hours}:${minutes}`;
                      if (slot.time > time || selDate > currDate) {
                        return (
                          <h1
                            className={`p-2 ${selectedTime === slot.time ? "text-white bg-black rounded border border-black" : "text-black rounded border font-bold border-gray-300"}`}
                            onClick={() => setSelectedTime(slot.time)}
                          >
                            {slot.time}
                          </h1>
                        );
                      } else {
                        return (
                          <h1
                            className={`p-2 ${selectedTime === slot.time ? "text-white bg-black rounded border border-black" : "text-gray-500 rounded border border-gray-300"}`}
                          >
                            {slot.time}
                          </h1>
                        );
                      }
                    }
                  }
                })}
              </div>
            </div>
            <h1 className="text-center text-xs font-semibold mt-3">Night</h1>
            <div>
              <div className="flex flex-row gap-2 p-2">
                {slots.map((slot) => {
                  if (slot.Active) {
                    if (slot.time > "18:00" && slot.time <= "24:00") {
                      const date = new Date();
                      const selDate = new Date(value).getDate();
                      const currDate = new Date().getDate();
                      const hours = date.getHours();
                      const minutes = date.getMinutes();
                      const time = `${hours}:${minutes}`;
                      if (slot.time > time || selDate > currDate) {
                        return (
                          <h1
                            className={`p-2 ${selectedTime === slot.time ? "text-white bg-black rounded border border-black" : "text-black rounded border font-bold border-gray-300"}`}
                            onClick={() => setSelectedTime(slot.time)}
                          >
                            {slot.time}
                          </h1>
                        );
                      } else {
                        return (
                          <h1
                            className={`p-2 ${selectedTime === slot.time ? "text-white bg-black rounded border border-black" : "text-gray-500 rounded border border-gray-300"}`}
                          >
                            {slot.time}
                          </h1>
                        );
                      }
                    }
                  }
                })}
              </div>
            </div>
            <div className="p-5 flex flex-row justify-between gap-3">
              <input
                type="text"
                name="Coupon code"
                id=""
                placeholder="Coupon code "
                className="border-gray-300 w-full"
              />
              <button className="p-2 bg-violet-700 text-white">Apply</button>
            </div>
            <div className="p-5 flex flex-row gap-3 items-center">
              <input
                type="checkbox"
                name="terms"
                id=""
                onChange={(e) => setAccepted(e.target.checked)}
              />{" "}
              <h1>
                I have read and agree to your{" "}
                <span className="text-blue-700">terms and conditions</span>,{" "}
                <span className="text-blue-700">Disclaimer</span>
              </h1>
            </div>
            <div>
              <input
                type="text"
                name="gst"
                id=""
                placeholder="Enter GST number (optional) "
                className="border-gray-300 w-full"
              />
            </div>
            <div className={`bg-white`}>
              {(selected.name === "Management" ||
                selected.name ===
                "Educational & Professional Institutions") && (
                  <h1 className={`p-3 font-bold underline text-black`}>
                    NOTE :{" "}
                  </h1>
                )}
              {(selected.name === "Management" ||
                selected.name ===
                "Educational & Professional Institutions") && (
                  <h1 className={`text-xs px-3 text-black`}>{selected.note}</h1>
                )}
            </div>
            <div>
              {(selected.name === "Child and Adolescent" || "Parent Counselling | Coaching") && (
                <div className={`p-2 bg-white`}>
                  <h1 className={`font-bold text-black`}>NOTE :</h1>
                  <h1 className={`mt-2 text-black`}>
                    Child counseling sessions will have additional requirements,
                    which will be shared separately before the session.
                  </h1>
                  <h1 className="text-xs mt-3"><span className="font-bold">NOTE : </span>       Child counseling sessions will have additional requirements,
                    which will be shared separately before the session.</h1>
                    <h1 className="text-xs mt-2"><i class="fa fa-star" aria-hidden="true"></i>&nbsp;&nbsp;Parent Consent Mandatory</h1>
                </div>
              )}
            </div>
            <div>
              {user && <div className="p-3 flex flex-row justify-evenly items-center">
                  <h1 className="text-center">Available Credits : {user.Credits}</h1>
                  <button className="p-2 rounded-md bg-violet-600 text-white hover:bg-violet-500" onClick={ApplyCredits}>Apply</button>
                </div>}
            </div>
            {
              <div className="flex flex-row justify-center items-center bg-violet-800 text-white rounded-md mt-3 hover:bg-violet-400 cursor-pointer">
                {!loading2 ? (
                  <button
                    className="p-2"
                    onClick={() => SubmitHandler(selected)}
                  >
                    Book Appointment
                  </button>
                ) : (
                  <h1 className="text-center">Please wait...</h1>
                )}
              </div>
            }
          </div>
        )}
      </Dialog>
      <Dialog open={open2} className="" onClose={() => setOpen2(false)}>
        {selMember && (
          <div className="p-5">
            <img
              src={selMember ? selMember.CardImg : ""}
              alt=""
              className="mx-auto"
            />
            <h1 className="playfair-italic text-2xl mt-2 capitalize">
              {selMember ? selMember.Name : ""}
            </h1>
            <h1 className="mt-2">INR {selMember ? selMember.Price : ""} /-</h1>
            <h1 className="mt-2">
              Credits : {selMember ? selMember.Credits : ""}
            </h1>
            <h1>
              Validity : {selMember ? selMember.Validity : ""}{" "}
              {Number(selMember.Validity) > 1 ? (
                "Months"
              ) : selMember.Validity === "" ? (
                <span>∞</span>
              ) : (
                "Months"
              )}
            </h1>
            <p className="text-xs mt-2">
              <span className="font-bold">NOTE : </span> 1 session : 60 minutes
            </p>
            <p className="mt-2">{selMember ? selMember.Description : ""}</p>
            <div className="mt-2 border rounded p-2">
              <h1 className="text-center">
                <span className="font-bold">NOTE : </span>With one credit, you
                can avail a session worth INR 1999 /-
              </h1>
            </div>
            <div className="p-5 flex flex-row justify-between gap-3">
              <input
                type="text"
                name="Coupon code"
                id=""
                placeholder="Coupon code "
                className="border-gray-300 w-full"
              />
              <button className="p-2 bg-violet-700 text-white">Apply</button>
            </div>
            <div className="p-5 flex flex-row gap-3 items-center">
              <input
                type="checkbox"
                name="terms"
                id=""
                onChange={(e) => setAccepted2(e.target.checked)}
              />{" "}
              <h1>
                I have read and agree to your{" "}
                <span className="text-blue-700">terms and conditions</span>,{" "}
                <span className="text-blue-700">Disclaimer</span>
              </h1>
            </div>
            <div>
              <input
                type="text"
                name="gst"
                id=""
                placeholder="Enter GST number (optional) "
                className="border-gray-300 w-full"
              />
            </div>
            {!loading3 ? (
              <button
                className="p-2 mx-auto text-center w-full rounded bg-violet-700 text-white mt-2 hover:bg-violet-400"
                onClick={() => {
                  PurchaseMembership(selMember);
                }}
              >
                Buy now
              </button>
            ) : (
              <h1 className="p-2 text-center bg-violet-500 text-white">
                Please wait....
              </h1>
            )}
          </div>
        )}
      </Dialog>
      <div
        className="w-full md:h-[50vh] h-[30vh] flex flex-row items-center justify-center services-text"
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/iccreators-347d7.appspot.com/o/service-banner.jpg?alt=media&token=2ceeca14-31f7-4426-9fb8-3e93349e9cf2')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundColor: "rgba(255,255,255,0.6)",
          backgroundBlendMode: "revert",
          boxShadow: "15px 15px 1000px inset",
        }}
      >
        <h1 className="playfair-italic text-4xl md:text-5xl xl:text-7xl text-center text-white drop-shadow-2xl font-bold services-text">
          Services
        </h1>
      </div>
      <img
        src="https://firebasestorage.googleapis.com/v0/b/iccreators-347d7.appspot.com/o/page-top-curve.png?alt=media&token=4e88ffa3-9a18-4a47-8940-0ba388b8bce8"
        alt=""
        className="xl:-mt-12 -mt-2"
      />
      <div className="p-10 flex justify-center gap-3 cursor-pointer md:flex-row flex-col">
        <div
          className={`p-3 font-bold ${active === 0 ? "bg-[#C5F5E7]" : "bg-[rgb(42,42,42)] text-white"} rounded-md`}
          onClick={() => setActive(0)}
        >
          <h1>Individuals</h1>
        </div>
        <div
          className={`p-3 font-bold ${active === 1 ? "bg-[#C5F5E7]" : "bg-[rgb(42,42,42)] text-white"} rounded-md`}
          onClick={() => setActive(1)}
        >
          <h1>Couples</h1>
        </div>
        <div
          className={`p-3 font-bold ${active === 2 ? "bg-[#C5F5E7]" : "bg-[rgb(42,42,42)] text-white"} rounded-md`}
          onClick={() => setActive(2)}
        >
          <h1>Students</h1>
        </div>
        <div
          className={`p-3 font-bold ${active === 3 ? "bg-[#C5F5E7]" : "bg-[rgb(42,42,42)] text-white"} rounded-md`}
          onClick={() => setActive(3)}
        >
          <h1>Family</h1>
        </div>
        <div
          className={`p-3 font-bold ${active === 4 ? "bg-[#C5F5E7]" : "bg-[rgb(42,42,42)] text-white"} rounded-md`}
          onClick={() => setActive(4)}
        >
          <h1>Educational & Professional Institutions</h1>
        </div>
        <div
          className={`p-3 font-bold ${active === 5 ? "bg-[#C5F5E7]" : "bg-[rgb(42,42,42)] text-white"} rounded-md`}
          onClick={() => setActive(5)}
        >
          <h1>Corporate</h1>
        </div>
        <div
          className={`p-3 font-bold ${active === 6 ? "bg-[#C5F5E7]" : "bg-[rgb(42,42,42)] text-white"} rounded-md`}
          onClick={() => setActive(6)}
        >
          <h1>Parent</h1>
        </div>
        <div
          className={`p-3 font-bold ${active === 7 ? "bg-[#C5F5E7]" : "bg-[rgb(42,42,42)] text-white"} rounded-md`}
          onClick={() => setActive(7)}
        >
          <h1>Memberships</h1>
        </div>
      </div>
      {active === 0 && (
        <div className="w-[90vw] mx-auto p-10 bg-[#C5F6E7]">
          <h1 className="playfair-italic text-5xl">Individuals</h1>
          <p className="playfair-italic mt-4">
            Motivation | Coaching | Counselling
          </p>
        </div>
      )}
      {active === 5 && (
        <div className="w-[90vw] mx-auto p-10 bg-[#C5F6E7]">
          <h1 className="playfair-italic text-5xl">Corporate</h1>
          <p className="playfair-italic mt-4">Coaching | Counselling</p>
        </div>
      )}
      <div className="md:p-10 flex flex-col justify-evenly gap-2">
        {services.length > 0 &&
          services.map((srv) => {
            if (srv.category === "individuals" && active === 0) {
              return (
                <div
                  className="p-2 bg-[#F1F1F1] rounded-md hover:shadow-2xl grid md:grid-cols-2"
                  data-aos="slide-up"
                >
                  <img src={srv.background} alt="" className="w-full h-[1/3]" />
                  <div className="p-10 flex flex-col gap-2">
                    <h1 className="playfair-italic text-3xl font-semibold text-gray-700">
                      {srv.name}
                    </h1>
                    <h1 className="font-semibold">
                      (INR {srv.price}/- Per Session Per Module)
                    </h1>
                    {srv.keyPoints.map((point) => {
                      return <h1 className="font-bold point">{point}</h1>;
                    })}
                    <button
                      className="bg-[rgb(106,69,183)] w-44 p-2 text-white rounded-lg shadow-md shadow-violet-400 mt-5"
                      onClick={() => {
                        setSelected(srv);
                        setOpen(true);
                      }}
                    >
                      Book Appointment
                    </button>
                    <h1 className="text-[rgb(106,69,183)] mt-2">
                      <span className="font-bold">Note</span> : One session: 60
                      minutes
                    </h1>
                  </div>
                </div>
              );
            } else if (srv.category === "couples" && active === 1) {
              return (
                <div
                  className="p-2 bg-[#F1F1F1] rounded-md hover:shadow-2xl grid md:grid-cols-2"
                  data-aos="slide-up"
                >
                  <img src={srv.background} alt="" className="w-full h-[1/3]" />
                  <div className="p-10 flex flex-col gap-2">
                    <h1 className="playfair-italic text-3xl font-semibold text-gray-700">
                      {srv.name}
                    </h1>
                    <h1 className="font-semibold">
                      (INR {srv.price}/- Per Session Per Module)
                    </h1>
                    {srv.keyPoints.map((point) => {
                      return <h1 className="font-bold point">{point}</h1>;
                    })}
                    <button
                      className="bg-[rgb(106,69,183)] w-44 p-2 text-white rounded-lg shadow-md shadow-violet-400 mt-5"
                      onClick={() => {
                        setSelected(srv);
                        setOpen(true);
                      }}
                    >
                      Book Appointment
                    </button>
                    <h1 className="text-[rgb(106,69,183)] mt-2">
                      <span className="font-bold">Note</span> : One session: 60
                      minutes
                    </h1>
                  </div>
                </div>
              );
            } else if (srv.category === "students" && active === 2) {
              return (
                <div
                  className="p-2 bg-[#F1F1F1] rounded-md grid md:grid-cols-2 hover:shadow-2xl"
                  data-aos="slide-up"
                >
                  <img src={srv.background} alt="" className="w-full h-[1/3]" />
                  <div className="p-10 flex flex-col gap-2">
                    <h1 className="playfair-italic text-3xl font-semibold text-gray-700">
                      {srv.name}
                    </h1>
                    <h1 className="font-semibold">
                      (INR {srv.price}/- Per Session Per Module)
                    </h1>
                    {srv.keyPoints.map((point) => {
                      return <h1 className="font-bold point">{point}</h1>;
                    })}
                    <button
                      className="bg-[rgb(106,69,183)] w-44 p-2 text-white rounded-lg shadow-md shadow-violet-400 mt-5"
                      onClick={() => {
                        setSelected(srv);
                        setOpen(true);
                      }}
                    >
                      Book Appointment
                    </button>
                    <h1 className="text-[rgb(106,69,183)] mt-2">
                      <span className="font-bold">Note</span> : One session: 30
                      minutes
                    </h1>
                  </div>
                </div>
              );
            } else if (srv.category === "family" && active === 3) {
              return (
                <div
                  className="p-2 bg-[#F1F1F1] rounded-md hover:shadow-2xl grid md:grid-cols-2"
                  data-aos="slide-up"
                >
                  <img src={srv.background} alt="" className="w-full h-[1/3]" />
                  <div className="p-10 flex flex-col gap-2">
                    <h1 className="playfair-italic text-3xl font-semibold text-gray-700">
                      {srv.name}
                    </h1>
                    <h1 className="font-semibold">
                      (INR {srv.price}/- Per Session Per Module)
                    </h1>
                    {srv.keyPoints.map((point) => {
                      return <h1 className="font-bold point">{point}</h1>;
                    })}
                    <button
                      className="bg-[rgb(106,69,183)] w-44 p-2 text-white rounded-lg shadow-md shadow-violet-400 mt-5"
                      onClick={() => {
                        setSelected(srv);
                        setOpen(true);
                      }}
                    >
                      Book Appointment
                    </button>
                    <h1 className="text-[rgb(106,69,183)] mt-2">
                      <span className="font-bold">Note</span> : One session: 60
                      minutes
                    </h1>
                  </div>
                </div>
              );
            } else if (
              srv.category === "educational_institutions" &&
              active === 4
            ) {
              return (
                <div
                  className="p-2 bg-[#F1F1F1] rounded-md hover:shadow-2xl grid md:grid-cols-2"
                  data-aos="slide-up"
                >
                  <img src={srv.background} alt="" className="w-full h-[1/3]" />
                  <div className="p-10 flex flex-col gap-2">
                    <h1 className="playfair-italic text-3xl font-semibold text-gray-700">
                      {srv.name}
                    </h1>
                    <h1 className="font-semibold">
                      (INR {srv.price}/- Per Session Per Module)
                    </h1>
                    {srv.keyPoints.map((point) => {
                      return <h1 className="font-bold point">{point}</h1>;
                    })}
                    {/* <button
                      className="bg-[rgb(106,69,183)] w-44 p-2 text-white rounded-lg shadow-md shadow-violet-400 mt-5"
                      onClick={() => {
                        setSelected(srv);
                        setOpen(true);
                      }}
                    >
                      Book Appointment
                    </button> */}
                    <a
                      href="whatsapp://send?text=&phone=9177997 77013"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="flex flex-row items-center gap-3 border mt-3 p-2 rounded-md w-40 justify-center">
                        <img src={whatsapp} className="w-7 h-7" alt="" />
                        <h1 className="">Contact us </h1>
                      </div>
                    </a>
                    <h1 className="text-[rgb(106,69,183)] mt-2">
                      <span className="font-bold">Note</span> : One session: 60
                      minutes
                    </h1>
                  </div>
                </div>
              );
            } else if (srv.category === "corporate" && active === 5) {
              return (
                <div
                  className="p-2 bg-[#F1F1F1] rounded-md grid md:grid-cols-2 hover:shadow-2xl"
                  data-aos="slide-up"
                >
                  <img src={srv.background} alt="" className="w-full h-[1/3]" />
                  <div className="p-10 flex flex-col gap-2">
                    <h1 className="playfair-italic text-3xl font-semibold text-gray-700">
                      {srv.name}
                    </h1>
                    <h1 className="font-semibold">
                      (INR {srv.price}/- Per Session Per Module)
                    </h1>
                    {srv.keyPoints.map((point) => {
                      return <h1 className="font-bold point">{point}</h1>;
                    })}
                    {srv.name !== "Management" ? (
                      <button
                        className="bg-[rgb(106,69,183)] w-44 p-2 text-white rounded-lg shadow-md shadow-violet-400 mt-5"
                        onClick={() => {
                          setSelected(srv);
                          setOpen(true);
                        }}
                      >
                        Book Appointment
                      </button>
                    ) : (
                      <a
                        href="https://api.whatsapp.com/send?phone=+917799777014"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="flex flex-row items-center gap-3 border mt-3 p-2 rounded-md w-40 justify-center">
                          <img src={whatsapp} className="w-7 h-7" alt="" />
                          <h1 className="">Contact us </h1>
                        </div>
                      </a>
                    )}
                    <h1 className="text-[rgb(106,69,183)] mt-2">
                      <span className="font-bold">Note</span> : One session: 60
                      minutes
                    </h1>
                  </div>
                </div>
              );
            } else if (srv.category === "parent" && active === 6) {
              return (
                <div
                  className="p-2 bg-[#F1F1F1] rounded-md grid md:grid-cols-2 hover:shadow-2xl"
                  data-aos="slide-up"
                >
                  <img src={srv.background} alt="" className="w-full h-[1/3]" />
                  <div className="p-10 flex flex-col gap-2">
                    <h1 className="playfair-italic text-3xl font-semibold text-gray-700">
                      {srv.name}
                    </h1>
                    <h1 className="font-semibold">
                      (INR {srv.price}/- Per Session Per Module)
                    </h1>
                    {srv.keyPoints.map((point) => {
                      return <h1 className="font-bold point">{point}</h1>;
                    })}
                    <button
                      className="bg-[rgb(106,69,183)] w-44 p-2 text-white rounded-lg shadow-md shadow-violet-400 mt-5"
                      onClick={() => {
                        setSelected(srv);
                        setOpen(true);
                      }}
                    >
                      Book Appointment
                    </button>
                    <h1 className="text-[rgb(106,69,183)] mt-2">
                      <span className="font-bold">Note</span> : One session: 60
                      minutes
                    </h1>
                    <h1 className="text-xs"><span className="font-bold">NOTE : </span>       Child counseling sessions will have additional requirements,
                    which will be shared separately before the session.</h1>
                    <h1 className="text-xs"><i class="fa fa-star" aria-hidden="true"></i>&nbsp;&nbsp;Parent Consent Mandatory</h1>
                  </div>
                </div>
              );
            }
          })}
        {active === 7 && (
          <div>
            <div className="w-[90vw] mx-auto p-10 bg-[#C5F6E7] rounded-xl">
              <h1 className="playfair-italic text-4xl">
                Explore the benefits of Memberships
              </h1>
            </div>
            <div className="mt-5">
              <div
                className={`md:flex md:flex-row grid grid-cols-2 gap-2 p-3 md:justify-evenly`}
              >
                {Membership.length > 0 &&
                  Membership.map((membership) => {
                    if (membership.Type !== "STUDENTEMP")
                      return (
                        <div
                          onClick={() => {
                            setSelMember(membership);
                            setOpen2(true);
                          }}
                          data-aos="flip-up"
                          className="hover:cursor-pointer hover:-mt-10 transition-all hover:transition-all"
                        >
                          <div style={{ borderRadius: 15 }}>
                            <img
                              src={membership.Bg}
                              className={`w-40 h-72 rounded-xl border border-gray-400`}
                            />
                          </div>
                        </div>
                      );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-[90vw] mx-auto p-5 mt-10 bg-[#FBF8E3]">
        <h1 className="playfair-italic text-center">
          In case customized programs are required, we can work with you to
          provide tailored quotes. We are open to Institute tie ups as per
          specific requirements.
        </h1>
      </div>
      <hr className="border-2 border-pink-300 mt-10" />
      <div>
        <h2 className="font-bold m-16 mb-4 text-xl">Disclaimer</h2>
        <p className="ml-16 mb-16">
          Chase Your Dreams India Pvt Ltd . All rights reserved © 2023-24
        </p>
      </div>
    </div>
  );
};

export default Services;
