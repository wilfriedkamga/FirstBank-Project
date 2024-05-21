import React from 'react'
import axios from 'react'
import Variable from "../../../../../Variable"


type TLogin={
    phone:string,
    password:string
}

/*const component = () => {

const postData = async (url:string, contentType:string, token = null, data) => {
  try {
    const headers = {
      "Content-Type": contentType,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(url, data, { headers });

    return {
      response,
      data: response.data,
      error: false,
    };
  } catch (err) {
    console.log(err);
    return {
      response: err.response,
      data: null,
      error: true,
    };
  }
};
   
  return (
    <div>component</div>
  )
}
*/
//export default component