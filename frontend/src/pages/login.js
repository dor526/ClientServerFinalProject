import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import BGImage from "../assets/images/bg.jpg";
import logoImage from "../assets/images/logo.svg";

const Login = () => {
  const form = useForm();
  const navigate = useNavigate();

  const { register, control, handleSubmit } = form;

  const onSubmit = async (data) => {
    console.log("data got: ", data);
    let requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const submittedUser = await fetch(
      "http://localhost:4000/user/login",
      requestOptions
    );

    if (!submittedUser) {
      console.log("Error Logging in occured");
    } else {
      console.log("navigating to dashboard...");
      navigate("/dashboard");
    }
  };

  return (
    <div
      id="login-container"
      className="flex flex-row justify-center w-full h-full md:justify-between"
    >
      <div
        id="login-content-container"
        className="h-full flex flex-col items-center gap-48 md:justify-self-center md:w-7/12"
      >
        {/* Logo and header */}
        <div className="h-5/6 w-full flex flex-col justify-between items-center">
          <div
            id="login-header"
            className="flex flex-row w-full justify-center items-center mt-4"
          >
            <img src={logoImage} className="h-10 w-10"></img>
            <h1 className="font-bold text-xl">Stock Watcher</h1>
          </div>

          {/* Form */}
          <div className="border-0 md:border-4 rounded-xl border-gray-300 flex flex-col items-center justify-center h-3/4">
            <h1 className="font-bold mb-16 text-4xl">Login</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              className="w-11/12"
            >
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="shadow w-full rounded-md p-3 my-2 text-lg focus:shadow-outline"
                  autoComplete="off"
                  {...register("email")}
                ></input>
              </div>

              <div>
                <input
                  className="shadow w-full rounded-md p-3 my-2 text-lg focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="**********"
                  autoComplete="off"
                  {...register("password")}
                ></input>

                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 my-2 rounded focus:shadow-outline"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
            <span className="my-4">
              Don't have an account ?
              <span className="text-blue-600 underline font-bold ml-2">
                Sign Up
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div id="login-bg" className="hidden md:inline-block w-5/12 h-full">
        <div className="h-full">
          <img src={BGImage} alt="Image" className="w-full h-full"></img>
        </div>
      </div>
    </div>
  );
};

export default Login;
