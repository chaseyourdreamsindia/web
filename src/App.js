import React, { useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./App.css";
import Aos from "aos";
import "aos/dist/aos.css";
import About from "./pages/About";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { useNavigate } from "react-router-dom";
import Terms from "./pages/Terms";
import ContactUs from "./pages/Contact";
import Status from "./pages/Status";



const App = () => {
  useLayoutEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="p-2 bg-black text-white text-xs flex flex-row justify-center gap-3">
        <h1 className="capitalize">Download our app now !</h1>
        <div className="flex flex-row items-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.company.chaseyourdreamsindia"
            target="_blank"
          >
            <img
              src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2090.76%20103.851%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%20x2%3D%221%22%20y1%3D%22.5%22%20y2%3D%22.5%22%20gradientUnits%3D%22objectBoundingBox%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2363be6b%22%2F%3E%3Cstop%20offset%3D%22.506%22%20stop-color%3D%22%235bbc6a%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234ab96a%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22b%22%20x2%3D%22.999%22%20y1%3D%22.5%22%20y2%3D%22.5%22%20gradientUnits%3D%22objectBoundingBox%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%233ec6f2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2345afe3%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22c%22%20x2%3D%221%22%20y1%3D%22.5%22%20y2%3D%22.5%22%20gradientUnits%3D%22objectBoundingBox%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23faa51a%22%2F%3E%3Cstop%20offset%3D%22.387%22%20stop-color%3D%22%23fab716%22%2F%3E%3Cstop%20offset%3D%22.741%22%20stop-color%3D%22%23fac412%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fac80f%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22d%22%20x2%3D%221%22%20y1%3D%22.5%22%20y2%3D%22.5%22%20gradientUnits%3D%22objectBoundingBox%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23ec3b50%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e7515b%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cg%20data-name%3D%22google%20play%20store%22%3E%3Cpath%20fill%3D%22url(%23a)%22%20d%3D%22M58.215%2031.654%203.337.288a2.21%202.21%200%200%200-2.225.023A2.2%202.2%200%200%200%200%202.224s.022%202.892.044%207.652L40.019%2049.85Z%22%20data-name%3D%22Path%20138%22%20transform%3D%22translate(0%20.001)%22%2F%3E%3Cpath%20fill%3D%22url(%23b)%22%20d%3D%22M.2%2044.4c.067%2017.173.267%2058.86.356%2079.615L40.2%2084.374Z%22%20data-name%3D%22Path%20139%22%20transform%3D%22translate(-.156%20-34.523)%22%2F%3E%3Cpath%20fill%3D%22url(%23c)%22%20d%3D%22m229.429%20160.252-31.41-17.952-18.219%2018.2%2020.554%2020.554%2029.1-16.951a2.224%202.224%200%200%200%201.112-1.913%202.253%202.253%200%200%200-1.137-1.938Z%22%20data-name%3D%22Path%20140%22%20transform%3D%22translate(-139.804%20-110.645)%22%2F%3E%3Cpath%20fill%3D%22url(%23d)%22%20d%3D%22M1.7%20263.818c.044%207.408.067%2012.146.067%2012.146a2.17%202.17%200%200%200%201.112%201.913%202.21%202.21%200%200%200%202.224%200l56.791-33.123L41.341%20224.2Z%22%20data-name%3D%22Path%20141%22%20transform%3D%22translate(-1.322%20-174.327)%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
              className="w-5 h-5 cursor-pointer"
              alt=""
            />
          </a>
          <img
            src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20data-name%3D%22Layer%201%22%20viewBox%3D%220%200%20120%20120%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%20x1%3D%22-1315.782%22%20x2%3D%22-1195.782%22%20y1%3D%22529.793%22%20y2%3D%22529.793%22%20gradientTransform%3D%22rotate(-90%20-832.788%20-362.994)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%231d6ff2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231ac8fc%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M120%2C26V94a25.94821%2C25.94821%2C0%2C0%2C1-26%2C26H26A25.94821%2C25.94821%2C0%2C0%2C1%2C0%2C94V26A25.94821%2C25.94821%2C0%2C0%2C1%2C26%2C0H94A25.94821%2C25.94821%2C0%2C0%2C1%2C120%2C26Z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%20d%3D%22M82.6%2C69H97.5a5.5%2C5.5%2C0%2C0%2C1%2C0%2C11H82.6Z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%20d%3D%22M64.3%2069a7.85317%207.85317%200%200%201%207.9%207.9%208.14893%208.14893%200%200%201-.6%203.1H22.5a5.5%205.5%200%200%201%200-11zM62.9%2032.8v9.6H56.5L48.7%2029a5.19712%205.19712%200%201%201%209-5.2zM68.4%2042.1L95.7%2089.4a5.48862%205.48862%200%200%201-9.5%205.5L69.7%2066.2c-1.5-2.8-2.6-5-3.3-6.2A15.03868%2015.03868%200%200%201%2068.4%2042.1z%22%20data-name%3D%22Combined-Shape%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%20d%3D%22M46%2074H33.3L62%2024.3a5.48862%205.48862%200%200%201%209.5%205.5zM39.3%2085.5L34%2094.8a5.48862%205.48862%200%201%201-9.5-5.5l3.9-6.8a8.59835%208.59835%200%200%201%203.9-.9A7.77814%207.77814%200%200%201%2039.3%2085.5z%22%20data-name%3D%22Combined-Shape%22%2F%3E%3C%2Fsvg%3E"
            className="w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/status/:tid/:success/:type" element={<Status />} />
      </Routes>
      <a href="/services"><span
        className="p-2 text-xs bg-violet-700 rounded-3xl text-white flex flex-row items-center gap-2 justify-center w-36 fixed bottom-5 right-5 cursor-pointer">
        <i class="fa-solid fa-gift"></i>
        <p>Membership Plans</p>
      </span></a>
      <div className="w-full h-20 bg-black flex md:flex-row flex-col justify-evenly items-center">
        <h1 className="text-base text-white">Download our app now !</h1>
        <div className="flex flex-row gap-4">
          <a href="https://play.google.com/store/apps/details?id=com.company.chaseyourdreamsindia&hl=en">
            <div className="flex flex-row items-center gap-3 bg-white p-1 rounded">
              <h1 className="text-black text-xs">Google play</h1>
              <img
                src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2090.76%20103.851%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%20x2%3D%221%22%20y1%3D%22.5%22%20y2%3D%22.5%22%20gradientUnits%3D%22objectBoundingBox%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2363be6b%22%2F%3E%3Cstop%20offset%3D%22.506%22%20stop-color%3D%22%235bbc6a%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234ab96a%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22b%22%20x2%3D%22.999%22%20y1%3D%22.5%22%20y2%3D%22.5%22%20gradientUnits%3D%22objectBoundingBox%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%233ec6f2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2345afe3%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22c%22%20x2%3D%221%22%20y1%3D%22.5%22%20y2%3D%22.5%22%20gradientUnits%3D%22objectBoundingBox%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23faa51a%22%2F%3E%3Cstop%20offset%3D%22.387%22%20stop-color%3D%22%23fab716%22%2F%3E%3Cstop%20offset%3D%22.741%22%20stop-color%3D%22%23fac412%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fac80f%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22d%22%20x2%3D%221%22%20y1%3D%22.5%22%20y2%3D%22.5%22%20gradientUnits%3D%22objectBoundingBox%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23ec3b50%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e7515b%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cg%20data-name%3D%22google%20play%20store%22%3E%3Cpath%20fill%3D%22url(%23a)%22%20d%3D%22M58.215%2031.654%203.337.288a2.21%202.21%200%200%200-2.225.023A2.2%202.2%200%200%200%200%202.224s.022%202.892.044%207.652L40.019%2049.85Z%22%20data-name%3D%22Path%20138%22%20transform%3D%22translate(0%20.001)%22%2F%3E%3Cpath%20fill%3D%22url(%23b)%22%20d%3D%22M.2%2044.4c.067%2017.173.267%2058.86.356%2079.615L40.2%2084.374Z%22%20data-name%3D%22Path%20139%22%20transform%3D%22translate(-.156%20-34.523)%22%2F%3E%3Cpath%20fill%3D%22url(%23c)%22%20d%3D%22m229.429%20160.252-31.41-17.952-18.219%2018.2%2020.554%2020.554%2029.1-16.951a2.224%202.224%200%200%200%201.112-1.913%202.253%202.253%200%200%200-1.137-1.938Z%22%20data-name%3D%22Path%20140%22%20transform%3D%22translate(-139.804%20-110.645)%22%2F%3E%3Cpath%20fill%3D%22url(%23d)%22%20d%3D%22M1.7%20263.818c.044%207.408.067%2012.146.067%2012.146a2.17%202.17%200%200%200%201.112%201.913%202.21%202.21%200%200%200%202.224%200l56.791-33.123L41.341%20224.2Z%22%20data-name%3D%22Path%20141%22%20transform%3D%22translate(-1.322%20-174.327)%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                className="w-5 h-5 cursor-pointer"
                alt=""
              />
            </div>
          </a>
          <div className="flex flex-row items-center gap-3 bg-white rounded p-1">
            <h1 className="text-black text-xs">App store</h1>
            <img
              src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20data-name%3D%22Layer%201%22%20viewBox%3D%220%200%20120%20120%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22a%22%20x1%3D%22-1315.782%22%20x2%3D%22-1195.782%22%20y1%3D%22529.793%22%20y2%3D%22529.793%22%20gradientTransform%3D%22rotate(-90%20-832.788%20-362.994)%22%20gradientUnits%3D%22userSpaceOnUse%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%231d6ff2%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231ac8fc%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23a)%22%20fill-rule%3D%22evenodd%22%20d%3D%22M120%2C26V94a25.94821%2C25.94821%2C0%2C0%2C1-26%2C26H26A25.94821%2C25.94821%2C0%2C0%2C1%2C0%2C94V26A25.94821%2C25.94821%2C0%2C0%2C1%2C26%2C0H94A25.94821%2C25.94821%2C0%2C0%2C1%2C120%2C26Z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%20d%3D%22M82.6%2C69H97.5a5.5%2C5.5%2C0%2C0%2C1%2C0%2C11H82.6Z%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%20d%3D%22M64.3%2069a7.85317%207.85317%200%200%201%207.9%207.9%208.14893%208.14893%200%200%201-.6%203.1H22.5a5.5%205.5%200%200%201%200-11zM62.9%2032.8v9.6H56.5L48.7%2029a5.19712%205.19712%200%201%201%209-5.2zM68.4%2042.1L95.7%2089.4a5.48862%205.48862%200%200%201-9.5%205.5L69.7%2066.2c-1.5-2.8-2.6-5-3.3-6.2A15.03868%2015.03868%200%200%201%2068.4%2042.1z%22%20data-name%3D%22Combined-Shape%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%20d%3D%22M46%2074H33.3L62%2024.3a5.48862%205.48862%200%200%201%209.5%205.5zM39.3%2085.5L34%2094.8a5.48862%205.48862%200%201%201-9.5-5.5l3.9-6.8a8.59835%208.59835%200%200%201%203.9-.9A7.77814%207.77814%200%200%201%2039.3%2085.5z%22%20data-name%3D%22Combined-Shape%22%2F%3E%3C%2Fsvg%3E"
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
