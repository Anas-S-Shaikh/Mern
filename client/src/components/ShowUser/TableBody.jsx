import React from "react";
import {Link} from 'react-router-dom'

const TableBody = (props) => {
  return (
    <tr>
      <td>{props.fname}</td>
      <td>{props.lname}</td>
      <td>{props.email}</td>
      <td>{props.dob}</td>
      <td>{props.bio}</td>
      <td>
        <button
          onClick={() => {
            props.deleteFun(props.fp);
          }}
        >
          Delete
        </button>
        <Link to={props.link}>
          <button>Edit</button>
        </Link>
      </td>
    </tr>
  );
};

export default TableBody;
