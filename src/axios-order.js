import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-b01e3-default-rtdb.firebaseio.com/",
});

export default instance;
