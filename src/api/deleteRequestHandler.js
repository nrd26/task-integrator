import axios from "axios";

const deleteRequestHandler = async (id, platform) => {
    await axios.delete(`http://localhost:5000/tasks/${platform}/${id}`)
  };

  export default deleteRequestHandler;