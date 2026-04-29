import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { signup } from "../services/authService";
import { Navigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    number: "",
    company: "",
  });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must have at least 6 characters");
      return;
    }
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        company: formData.company,
        number: formData.number,
      };
      const user = await signup(userData);
      if(user){
        console.log(user)
        toast.success("🦄 Wow so easy!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      Navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-2 min-h-screen flex  justify-center items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="  flex flex-col justify-center items-center px-16 py-4 bg-gray-100">
        <div className="mb-4">
          <h2 className="text-2xl">Create Your Account</h2>
        </div>
        <div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label>Role</label>
            <input
              onChange={handleChange}
              name="role"
              className="border p-2 border-gray-300 mb-2 w-full"
              placeholder="Enter Your Role"
              type="text"
            />
            <label>Full Name</label>
            <input
              onChange={handleChange}
              name="name"
              className="border p-2 border-gray-300 mb-2 w-full"
              placeholder="Enter Your Name"
              type="text"
            />
            <label>Email</label>
            <input
              onChange={handleChange}
              name="email"
              className="border p-2 border-gray-300 mb-2 w-full"
              placeholder="Enter Your Email"
              type="text"
            />
            <label>Password</label>
            <input
              onChange={handleChange}
              name="password"
              className="border p-2 border-gray-300 mb-2 w-full"
              placeholder="Password"
              type="text"
            />
            <label>Confirm Password</label>
            <input
              onChange={handleChange}
              name="confirmPassword"
              className="border p-2 border-gray-300 mb-2 w-full"
              placeholder="Confirm Password"
              type="text"
            />
            <lable>Phone Number</lable>
            <input
              onChange={handleChange}
              name="number"
              className="border p-2 border-gray-300 mb-2 w-full"
              placeholder="Phonme Number"
              type="text"
            />
            <label>Comapny</label>
            <input
              onChange={handleChange}
              name="company"
              className="border p-2 border-gray-300 mb-2 w-full"
              placeholder="Enter Your Company"
              type="text"
            />
            <input name="" type="submit" className="bg-blue-600 text-white" />
          </form>
        </div>
      </div>
      <ToastContainer
      
      />
    </div>
  );
};

export default SignupPage;
