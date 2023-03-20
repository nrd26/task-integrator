import axios from "axios";

const getRequestHandler = async () => {
    var result = []
    await axios.get("http://localhost:5000/tasks",  { crossdomain: true }).then(response => {
    result =  response.data;
    });

    return result
  };

export default getRequestHandler;