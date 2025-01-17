import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {

  useEffect(()=>{
    const token = localStorage.getItem("CYDI_TK");
    if(token){
      navigate("/profile");
    }
  },[]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const SubmitHandler = () => {
    if (data.email === "" || data.password === "") {
      alert("Please fill all the details");
    } else {
      setLoading(true);
      axios
        .post(`${BASE}/user/signin`, {
          Email: data.email,
          Password: data.password,
        })
        .then((resp) => {
          setLoading(false);
          if (resp.data.success) {
            localStorage.setItem("CYDI_TK", JSON.stringify(resp.data.token));
            navigate("/profile");
          } else {
            alert(resp.data.message);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="p-10 login">
      <div>
        <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label
                    for="password"
                    class="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div class="text-sm">
                    <a
                      href="/"
                      class="font-semibold text-gray-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div class="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div>
                {!loading ? (
                  <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={SubmitHandler}
                  >
                    Sign in
                  </button>
                ) : (
                  <p className="text-center">Please wait....</p>
                )}
              </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <a
                href="/register"
                class="font-semibold leading-6 text-gray-600 hover:text-indigo-500"
              >
                &nbsp; Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
