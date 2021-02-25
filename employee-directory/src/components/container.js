import React, { useReducer } from "react";
import API from "../utils/API";

class Container extends React.Component {

    //set state
    state = {
        employees: [],
        search: "",
        direction: "",
        col: ""
    };

    //send a get request to retrieve employees
    //Map over response to create an Array for the employee objects
    //SAdd Array with setState
    componentDidMount() {
        API.employeeList()
            .then(res => {
                const employeeArray = res.data.result.map(employee => {
                    return {
                        first: employee.name.first,
                        last: employee.name.last,
                        email: employee.email,
                        dob: employee.dob.date,
                        image: employee.picture.medium
                    };
                });
                this.setState({ employees: employeeArray });
            })
            .catch(err => console.log(err));
    }

    //update search state when the user types a character
    updateSearch = i => {
        this.setState({ search: i.target.value });
    };

    //filter list to display fisr or last letter that matches the character input
    filterEmployees() {
        const search = this.state.search.toLowerCase();
        return this.state.employees.filter(employee => {
            return (
                employee.first.toLowerCase().includes(search) ||
                employee.last.toLowerCase().includes(search)
            );
        });
    }

    //function to render a table of users
  renderEmployees = () => {
    return this.filterEmployees()
      .sort(this.sortEmployees)
      .map((employee, index) => {
        return (
          <tr key={index}>
            <td>
              <img src={user.image} alt="user"></img>
            </td>
            <td>{employee.first}</td>
            <td>{employee.last}</td>
            <td>{employee.email}</td>
            <td>{new Date(employee.dob).toDateString()}</td>
          </tr>
        );
      });
  };

  //depending on which column was clicked, add or remove the arrow
  //icon specifying the sort direction
  getClassName = col => {
    return this.state.col === col
      ? `clickable ${this.state.direction}`
      : `clickable`;
  };

  //depending on which column was clicked, set the sort direction to
  //the opposite of what it was.
  updateDirection = col => {
    this.state.col === col && this.state.direction === "ascending"
      ? this.setState({ direction: "descending", col: col })
      : this.setState({ direction: "ascending", col: col });
  };

  //function to return 1 or -1 to sort function depending on sort direction
  sortEmployees = (a, b) => {
    if (a[this.state.col] < b[this.state.col]) {
      return this.state.direction === "ascending" ? -1 : 1;
    } else if (a[this.state.col] > b[this.state.col]) {
      return this.state.direction === "ascending" ? 1 : -1;
    }
    return 0;
  };

  //render the user container including search field
  render() {
    return (
      <>
        <div className="input-group justify-content-center">
          <div className="input-group-prepend"></div>
          <input
            onChange={this.updateSearch}
            type="search"
            className="form-control m-3"
            placeholder="Search"
            aria-label="SearchBox"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="table m-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">
                  <span
                    className={this.getClassName("first")}
                    onClick={() => {
                      this.updateDirection("first");
                    }}
                  >
                    First
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.getClassName("last")}
                    onClick={() => this.updateDirection("last")}
                  >
                    Last
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.getClassName("email")}
                    onClick={() => this.updateDirection("email")}
                  >
                    Email
                  </span>
                </th>
                <th scope="col">
                  <span
                    className={this.getClassName("dob")}
                    onClick={() => this.updateDirection("dob")}
                  >
                    DOB
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderEmployees()}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Container;