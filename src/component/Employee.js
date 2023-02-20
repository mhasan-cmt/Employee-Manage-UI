import React from 'react';
import { useNavigate } from 'react-router-dom';

const Employee = (props) => {
  const { id, firstName, lastName, email } = props.employee;
  const deleteEmployee = props.deleteEmployee;
  const navigate = useNavigate();
  const editEmployee = (e, id) => {
    e.preventDefault();
    navigate(`/edit/${id}`);
  };
  return (
    <tr key={id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-small text-gray-500">{firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-small text-gray-500">{lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-small text-gray-500">{email}</div>
      </td>
      <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-small">
        <a
          onClick={(e) => editEmployee(e, id)}
          className="text-indigo-600 hover:cursor-pointer px-4"
        >
          Edit
        </a>
        <a
          onClick={(e) => deleteEmployee(e, id)}
          className="text-indigo-600 hover:cursor-pointer"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default Employee;
