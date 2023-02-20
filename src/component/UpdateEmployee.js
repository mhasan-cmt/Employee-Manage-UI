import React, { useState , useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: id,
    firstName: '',
    lastName: '',
    email: '',
  });
  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(employee.id,employee)
    .then((response)=>{
      navigate("/list");
    })
    .catch((error)=>{
      console.log(error);
    })
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex mx-auto max-w-2xl shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update Employee</h1>
        </div>
        <div className="items-center justify-end h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            First Name
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="firstName"
            value={employee.firstName}
            type="text"
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-end h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Last Name
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="lastName"
            value={employee.lastName}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-end h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Email
          </label>
          <input
            onChange={(e) => handleChange(e)}
            name="email"
            value={employee.email}
            type="email"
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-end h-14 w-full my-4 space-x-4">
          <button
            onClick={updateEmployee}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-4"
          >
            Update
          </button>
          <button 
          onClick={()=> navigate("/list")}
          className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-4">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
