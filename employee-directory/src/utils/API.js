import axios from "axios";

function employeeList() {
    return axios.get("https://randomuser.me/api/?results=200&nat=US");
}

export default {
    employeeList
};