import axios from "axios";

const deleteRequestHandler = async (id, platform) => {
  try {
    await axios.delete(`http://localhost:5000/tasks/${platform}/${id}`)
  } catch (error) {
    console.log(error)
  }
    
  };

  export default deleteRequestHandler;