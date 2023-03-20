import axios from "axios";

const putRequestHandler = async (id, task, platform) => {
    const data = { "task": task, "platform":platform };
   
    await axios.put(`http://localhost:5000/tasks/${id}`, data)
  };

export default putRequestHandler;