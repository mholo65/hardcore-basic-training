import axios from "axios";

const getPersons = async () => {
  try {
    const ret = await axios.get(`${process.env.REACT_APP_API}/persons`);
    return ret.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default {
  getPersons
};
