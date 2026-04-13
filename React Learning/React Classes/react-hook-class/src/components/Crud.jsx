import React, { useState } from "react";

const Crud = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    active: "",
  });
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSave = () => {
    console.log(form);
    setUsers([...users, form]);
    setForm({
      name: "",
      email: "",
      number: "",
      active: "",
    });
  };
  console.log(users);
  return (
    <div className="min-h-screen bg-gray-200 justify-center items-start pt-10">
      <div className="bg-white p-6 rounded shadow w-[600px]">
        <h2 className="text-2xl text-center font-bold mb-4">Crud App</h2>
        <div className="grid gap-4 grid-cols-2">
          <input
            name="name"
            className="border p-2"
            type="text"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            value={form.email}
            className="border p-2"
            onChange={handleChange}
            placeholder="Enter Email"
            type="email"
          />
          <input
            name="number"
            value={form.number}
            className="border p-2"
            onChange={handleChange}
            placeholder="Enter Number"
            type="number"
          />
          <input
            value={form.active}
            className="border p-2"
            onChange={handleChange}
            type="text"
            name="active"
            placeholder="Active/Inactive"
          />
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-600 rounded px-4 py-2"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      <div>
         <table class="table-fixed">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Number</th>
                <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>

              </tr>
            </thead>
                <tbody>
        {users.map((e) => (
         
        
              <tr>
                <td>{e.name}</td>
                <td>{e.email} </td>
                <td>{e.number}</td>
                <td>{e.active}</td>
                <td >Delete</td>

              </tr>
             
       
        
        ))}
             </tbody>
          </table>
      </div>
    </div>
  );
};

export default Crud;
