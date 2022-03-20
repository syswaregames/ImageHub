//
// Patrick Carvalho
// copyright 2022
//


import React, { ChangeEvent } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files![0]) {

      const url_host = 'batmanhub.com';
      const url_backend = 'http://' + url_host + ':5000/ImageHubApi/image/upload';

      const formData = new FormData();

      try {

        formData.append('imageFile', e.target.files![0]);
        const response = await fetch(url_backend, {
          method: 'POST',
          body: formData,
          headers: {
            "accept": '*/*'
          }
        });

        if (response.ok) {
          toast("Image sent, sucessful!");
        } else {
          toast("Error! Image not sent.");
        }

      }
      catch (e) {
        toast("Error! Image not sent. " + e);
      }




    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-300 bg-gradient-to-br from-gray-300 via-teal-700 to-gray-800">

      <input type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg" onChange={onChange}></input>

      <ToastContainer />

    </div>
  );
}

export default App;
