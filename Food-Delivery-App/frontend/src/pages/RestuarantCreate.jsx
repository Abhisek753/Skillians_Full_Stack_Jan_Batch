import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { createRestuarant } from "../services/restuarantapi";

const emptyForm = {
  name: "",
  address: "",
  image: "",
  description: "",
};
const RestuarantCreate = () => {
    const navigate=useNavigate()
  const { token, user } = useContext(AuthContext);
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token || user?.role !== "restuarant") {
      toast.error("Only Restuarant owner can create restuarant");
      return;
    }
    //   console.log("my form data",form);
   try{
    const data= await createRestuarant(form,token);
    console.log(data)
      toast.success("Restuarant Created");
      navigate("/restuarant/dashboard");
   }catch(err){
    console.log(err);
    toast.error("Failed to create restuarant");
   }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  return (
    <section className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
      <h1 className="text-2xl font-bold">Create Restuarant</h1>
      <p className="mt-1 text-stone-600">
        Add your restuarant details to start managing the menu.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className=" mt-1 w-full rounded border border-stone-300 px-3 py-2"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            className=" mt-1 w-full rounded border border-stone-300 px-3 py-2"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            className=" mt-1 w-full rounded border border-stone-300 px-3 py-2"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            className=" mt-1 w-full rounded border border-stone-300 px-3 py-2"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-3">
          <button className="rounded bg-orange-600 py-2 px-4 text-white hover:bg-orange-700 ">
            Create Restuarant
          </button>
          <Link to="/restuarant/dashboard" className="rounded bg-stone-300 py-2 px-4 text-stone-700 hover:bg-stone-50 ">
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RestuarantCreate;
