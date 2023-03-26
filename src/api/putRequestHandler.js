import axios from "axios";

const putRequestHandler = async (id, task, platform) => {
    const data = { "task": task, "platform":platform };
   try {
    await axios.put(`http://localhost:5000/tasks/${id}`, data)
   } catch (error) {
    console.log(error)
   }
    
  };

export default putRequestHandler;