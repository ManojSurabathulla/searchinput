import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [resultJson, setResultJson] = useState([]);
  React.useEffect(() => {
    axios.get(`https://randomuser.me/api/?results=20`).then((res) => {
      console.log(res.data.results);
      setResultJson(res.data.results);
    });
  }, []);
  const filterValue = (input) => {
    const value = resultJson.filter((x) => {
      if (
        x.name.first.toLowerCase() === input ||
        x.email.toLowerCase() === input ||
        x.name.last.toLowerCase() === input ||
        x.cell === input
      ) {
        return x;
      }
    });
    setResultJson(value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setSearchInput(e.target.value.toLowerCase());
          //console.log(searchInput);
        }}
      />
      <BsSearch onClick={() => filterValue(searchInput)} />
      <div className="table-style">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>First_Name</th>
              <th>Last_Name</th>
              <th>Email</th>
              <th>Cell</th>
            </tr>
          </thead>
          {resultJson.map((result) => {
            console.log(result);
            return (
              <tbody>
                <tr>
                  <td>
                    <span>{result.name.first}</span>
                  </td>
                  <td>
                    <span>{result.name.last}</span>
                  </td>
                  <td>
                    <span>{result.email}</span>
                  </td>
                  <td>
                    <span>{result.cell}</span>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default Header;
