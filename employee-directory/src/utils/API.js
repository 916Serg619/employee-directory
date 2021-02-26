import axios from "axios";

function employeeList() {
    return axios.get("https://randomuser.me/api/?results=10");
}

export default {
    employeeList
};