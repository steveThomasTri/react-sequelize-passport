import axios from "axios";

export default {
  saveUser: function(userData) {
    return axios.post("/api/signup", userData);
  },
  getUser: function(userData) {
    return axios.post("/api/login", userData)
  },
  getQuestions: function(){
    return axios.get("https://opentdb.com/api.php?amount=30&category=15&type=boolean")
  }
};
