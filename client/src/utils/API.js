import axios from "axios";

export default {
  saveUser: function(userData) {
    return axios.post("/api/signup", userData);
  },
  getUser: function(userData) {
    return axios.post("/api/login", userData)
  },
  getQuestions: function(category){
    console.log(category)
    return axios.get("https://opentdb.com/api.php?amount=20&category="+category+"&type=boolean")
  }
};
