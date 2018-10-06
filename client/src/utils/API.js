import axios from "axios";

export default {
  // Saves a book to the database
  saveUser: function(userData) {
    return axios.post("/api/signup", userData);
  },
  getUser: function(userData) {
    return axios.post("/api/login", userData)
  }
};
