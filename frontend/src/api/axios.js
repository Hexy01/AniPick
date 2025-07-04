import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000", // your backend
  withCredentials: true, //for cookies

});

