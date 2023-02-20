import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import EmployeeService from '../service/EmployeeService';
import Employee from './Employee';

const EmployeeList = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EmployeeService.getEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    const deleteEmployee = (e, id) =>{
        e.preventDefault();
        EmployeeService.deleteEmployee(id).then((response)=>{
            if(employees){
                setEmployees((prevElement)=>{
                    return prevElement.filter((employee)=>employee.id!=id);
                })
            }
        });
    }

    return (
        <div className="container mx-auto my-8">
            <div className="h-12">
                <button
                    onClick={() => navigate('/add')}
                    className="rounded bg-slate-600 text-white px-2 py-2 font-semibold"
                >
                    Add New
                </button>
            </div>
            <div className="shadow border-b">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            First Name
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            Last Name
                        </th>
                        <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            email
                        </th>
                        <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    {!loading && employees && (
                        <tbody className="bg-white">
                        {employees.map((em) => (
                            <Employee key={em.id} deleteEmployee={deleteEmployee} employee={em}></Employee>
                        ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
