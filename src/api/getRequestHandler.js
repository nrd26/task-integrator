import axios from "axios";

const getRequestHandler = async () => {
    var result = []
    try {
      await axios.get("http://localhost:5000/tasks",  { crossdomain: true }).then(response => {
        result =  response.data;
        });
    } catch (error) {
      console.log(error)
    }
    return result
  };

export default getRequestHandler;