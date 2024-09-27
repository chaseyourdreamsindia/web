import React, { useState, useEffect } from 'react'
import { State, City } from 'country-state-city';
import BASE from '../api/api';
import axios from 'axios';
import { Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState("");

    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [checke2, setChecke2] = useState(false);

    const [open, setOpen] = useState(false);


    const [user, setUser] = useState({
        Name: "",
        Email: "",
        Profile: "",
        Password: "",
        Mobile: "",
        State: "",
        City: "",
        ConfirmPassword: ""
    });

    const getStates = () => {
        const states = State.getStatesOfCountry("IN");
        setStates(states);
    }

    useEffect(() => {
        getStates();
    }, []);

    const getCities = (code) => {
        const cities = City.getCitiesOfState("IN", code);
        setCities(cities.map(city => ({ label: city.name, value: city.name })));
    }

    const changeHandler = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }


    const submitHandler = () => {
        if (user.Name === "" && user.Password === "" && user.Email === "" && user.Mobile === "") {
            alert('please fill all the details');
        } else if (user.Password.length < 8) {
            alert('password must be 8 digit including number, special character');
        } else if (user.Mobile.length < 10) {
            alert('please enter a valid mobile number');
        } else if (user.Name === "" || user.Name.length < 2) {
            alert('please enter a valid name');
        } else if (user.Password !== user.ConfirmPassword) {
            alert('passwords doesnot match');
        } else {
            setLoading(true);
            axios.post(`${BASE}/user`, user).then(resp => {
                if (resp.data.success) {
                    setLoading(false);
                    SendOTP();
                    setOpen(true);
                } else {
                    setLoading(false);
                    if (resp.data.message === "exist") {
                        alert('Email already Exist !');
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const [otp, setOTP] = useState();
    const [validOTP, setValidOTP] = useState();
    const [helper, setHelper] = useState("");

    const SendOTP = () => {
        setLoading(true);
        fetch(`${BASE}/user/otp/${user.Email}`).then(resp => {
            resp.json().then(res => {
                setValidOTP(res.otp);
            }).catch(err => {
                console.log(err.message);
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const navigate = useNavigate();
    const [loading2, setLoading2] = useState(false);

    const VerifyOTP = () => {
        setLoading2(true);
        if (validOTP == otp) {
            axios.get(`${BASE}/user/verify/${user.Email}`).then(resp => {
                if (resp.data.success) {
                    alert("Registration Successfully !");
                    navigate("/login");
                }
            }).catch(err => {
                setLoading2(false);
                console.log(err);
            })
        } else {
            setLoading2(false);

            alert('Enter a valid otp');
        }
    }

    return (
        <div className='login p-10'>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <div className='h-[80vh] bg-white p-10'>
                    <h1 className='font-extrabold text-2xl'>Verify Email</h1>
                    <h1 className='mt-2'>Please enter the otp that we have sent to your registered email {user.Email ? user.Email : ""} </h1>
                    <input type="text" className='border rounded-lg mt-3 w-[80%]' placeholder='OTP' />
                    <br />
                    {!loading2 ? <button className='mx-auto p-2 bg-violet-500 text-white rounded-lg mt-2' onClick={VerifyOTP}>Verify OTP</button> : <h1>Please Wait...</h1>}
                    <h1 className='text-center'>Having trouble ? <span className='font-bold cursor-pointer' onClick={SendOTP}>Resend</span></h1>
                </div>
            </Dialog>
            <section class="">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <input type="text" name="Name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={changeHandler} />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" name="Email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={changeHandler} />
                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="Password" id="password" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={changeHandler} />
                                </div>
                                <div>
                                    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="confirm-password" name="ConfirmPassword" id="confirm-password" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={changeHandler} />
                                </div>
                                <div>
                                    <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
                                    <input type="number" name="Mobile" id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" onChange={changeHandler} />
                                </div>
                                <div>
                                    <label for="state" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select State</label>
                                    <select name="State" id="" onChange={e => {
                                        changeHandler(e);
                                        const state = State.getStatesOfCountry("IN");
                                        state.map(state => {
                                            if (state.name === e.target.value) {
                                                getCities(state.isoCode);
                                            }
                                        })
                                    }}>
                                        {
                                            states.length > 0 && states.map(state => {
                                                return (
                                                    <option value={state.name}>{state.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label for="city" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select City</label>
                                    <select name="City" id="" onChange={changeHandler}>
                                        {
                                            cities.length > 0 && cities.map(city => {
                                                return (
                                                    <option value={city.value}>{city.value}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div class="flex items-start">
                                    <div class="flex items-center h-5">
                                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" onChange={e => setChecked(e.target.checked)} />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions , Privacy Policy, Disclaimer</a></label>
                                    </div>
                                </div>
                                <div className='flex items-start'>
                                    <div class="flex items-center h-5">
                                        <input id="age" aria-describedby="age" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" onChange={e => setChecke2(e.target.checked)} />
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="age" class="font-light text-gray-500 dark:text-gray-300">By signin up, you affirm that you are 18 years old or above.</label>
                                    </div>
                                </div>
                                <button class="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={()=>{
                                    if(checked && checke2){
                                        submitHandler();
                                    }else{
                                        alert('please check all the checkboxes !')
                                    }
                                }}>Create an account</button>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Register;