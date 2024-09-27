import React from "react";
import sign from "../Assets/signature.png";
import aim from "../Assets/aim.png";
import shravan from "../Assets/shravan.png";
import certificate from "../Assets/certificate2.jpeg";
import iso from "../Assets/iso.png";
import iaf from "../Assets/iaf.png";

const About = () => {
  const New_Certificates = [
    {
      icon: require("../Assets/Certifications/certified.png"),
      title: "Certified Life Coach",
    },
    {
      title: "Certified NLP Master Practitioner",
      icon: require("../Assets/Certifications/laptop.png"),
    },
    {
      icon: require("../Assets/Certifications/self-control.png"),
      title: "Emotional Intelligence Coach",
    },
    {
      title: "Certified Master of Hypnosis ",
      icon: require("../Assets/Certifications/hypnotism.png"),
    },
    {
      icon: require("../Assets/Certifications/flag.png"),
      title: "Executive And Leadership Coach",
    },
    {
      icon: require("../Assets/Certifications/presentation.png"),
      title: "Organizational Development Coach",
    },
    {
      title: "Cognitive Behavioural Therapy for LGBTQ+ Community ",
      icon: require("../Assets/Certifications/consumer-behaviour.png"),
    },
    {
      title: "Eye Movement Desensitization and Reprocessing (EDMR) Therapy",
      icon: require("../Assets/Certifications/blindness.png"),
    },
    {
      title: "Fully Accredited Professional Child Psychology Diploma",
      icon: require("../Assets/Certifications/natural-language-processing.png"),
    },
    {
      title: `Professional Counselling Grief & Bereavement Diploma Course`,
      icon: require("../Assets/Certifications/wreath.png"),
    },
    {
      title: "CBT Coach Practitioner Certification (ACCREDITED)",
      icon: require("../Assets/Certifications/partners.png"),
    },
    {
      title: "Professional Counselling for Suicidal Clients Diploma Course",
      icon: require("../Assets/Certifications/self-control.png"),
    },
    {
      title: "Counselling Children & Adolescents - ACCREDITED CERTIFICATE",
      icon: require("../Assets/Certifications/lover.png"),
    },
    {
      title: "EFT / TFT Master Practitioner Certification (ACCREDITED)",
      icon: require("../Assets/Certifications/conversation.png"),
    },
    {
      title: "Depression Counselling Diploma: Advanced Level – ACCREDITED",
      icon: require("../Assets/Certifications/headache.png"),
    },
    {
      title: "Emotional Intelligence Life Coach Certification (Accredited)",
      icon: require("../Assets/Certifications/emotions.png"),
    },
  ];

  return (
    <>
      <div className="bg-style pt-10">
        <div data-aos="slide-up" className="p-0 m-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/iccreators-347d7.appspot.com/o/page-top-curve.png?alt=media&token=4e88ffa3-9a18-4a47-8940-0ba388b8bce8"
            className="mb-0"
          />
          <div className="bg-white m-0 text-center p-10 z-40">
            <h1 className="text-2xl text-center playfair-italic font-bold pb-4">
              Journey Of Chase Your Dreams India PVT Limited
            </h1>
            <p className="text-lg font2">
              <b className="font-bold">CHASE YOUR DREAMS INDIA</b> has had
              humble beginning as a firm aimed at adding value to people’s
              lives. In the eventful 10 years so far, we have evolved from being
              a firm into a Private Limited Company influencing more than 1 lakh
              persons (ranging from individuals to corporate and students from
              Educational Institutes), thanks to the never-ending support and
              love of our clientele. We aim to grow further by ensuring highest
              levels of commitment and maintaining trust with our customers.
            </p>
          </div>
          <div className="p-3 mx-auto w-full">
            <img src={certificate} alt="" className="md:w-[50vw] mx-auto" />
            <div className="flex flex-row w-full justify-center gap-2">
              <img src={iso} alt="" className="w-28" />
              <img src={iaf} alt="" className="w-28" />
            </div>
          </div>
        </div>
        <div className="md:grid grid-cols-2 skyblue">
          <img src={shravan} alt="" data-aos="slide-right" />
          <div
            className="p-10 flex flex-col gap-2 text-center"
            data-aos="slide-left"
          >
            <h1 className="playfair-italic text-violet-900 text-2xl">
              About The Founder
            </h1>
            <p className="text-xl leading-7 text-gray-600">
              Master’s in Business Administration in Human Resources from a
              renowned B-School. After working for a short while at a
              manufacturing unit in HR area, he left the comforts of the
              corporate sector to pursue his dream of being a coach and a
              counsellor to people needing help.
            </p>
            <p className="text-gray-600 text-xl leading-7">
              In his 10 years’ experience he has handled psychological,
              behavioral, and emotional problems of the individuals, advised on
              Business Development to the Institutes and Companies, including
              start-ups and has been a Career coach and campus recruitment
              support for the Students and for the Educational institutions.
            </p>
            <img src={aim} className="skyblue" alt="" />
            <img src={sign} alt="" className="w-60 mx-auto" />
            <div className="flex justify-center gap-4">
              <div className="w-12 h-12 border rounded-md bg-[#297DCE] flex flex-row justify-center items-center">
                <i class="fa-brands fa-facebook-f text-white"></i>
              </div>
              <div className="w-12 h-12 border rounded-md bg-[#D51384] flex flex-row justify-center items-center">
                <i class="fa-brands fa-instagram text-white"></i>
              </div>
              <div className="w-12 h-12 border rounded-m bg-[#2774C2] flex flex-row justify-center items-center">
                <i class="fa-brands fa-linkedin text-white"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="p-10">
          <h1 className="text-center text-4xl playfair-italic ">
            Qualifications and Credentials
          </h1>
          <hr className="w-1/2 mx-auto border-2 border-[#8D6DC4] mt-5" />
        </div>
        <div className="md:grid grid-cols-5 bg-gray1" data-aos="slide-up">
          {New_Certificates.map((cert) => {
            return (
              <div className="bg-[#EFEFEF] p-16 flex flex-col items-center justify-center">
                <img src={cert.icon} alt="" className="w-14" />
                <p className="playfair-italic text-md text-center">
                  {cert.title}
                </p>
              </div>
            );
          })}
        </div>
        <div className="border-[#8D6DC4] border-4 p-10 md:flex items-center gap-16 mx-auto m-10 w-[70vw]">
          <p className="playfair-italic text-2xl md:text-4xl p-2 text-[#8D6DC4] font-bold">
            Get in touch for Coaching and <br /> Counselling
          </p>
          <button className="bg-[#4CADC9] rounded p-2 text-white mx-auto">
            Book Appointment &gt;&gt;{" "}
          </button>
        </div>
        <hr className="border-2 border-pink-300" />
        <div>
          <h2 className="font-bold m-16 mb-4 text-xl">Disclaimer</h2>
          <p className="ml-16 mb-16">
            Chase Your Dreams India Pvt Ltd . All rights reserved © 2023-24
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
