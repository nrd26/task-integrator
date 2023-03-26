import axios from "axios";

const postRequestHandler = async (task, platform) => {
    const data = { "task": task, "platform":platform };
    try {
      await axios.post("http://localhost:5000/tasks", data)
    } catch (error) {
      console.log(error)
    }
    
  };

  export default postRequestHandler;