import axios from "axios";

const postRequestHandler = async (task, platform) => {
    const data = { "task": task, "platform":platform };
    await axios.post("http://localhost:5000/tasks", data)
  };

  export default postRequestHandler;