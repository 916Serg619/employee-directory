import axios from "axios";

function employeesList() {
  return axios.get("https://randomuser.me/api/?results=200&nat=US");
}

export default {
  employeesList
};