import React, { ChangeEvent } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const notify = () => toast("Wow so easy!");

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files![0]) {
        
        const url_backend = 'http://batmanhub.com:5000/ImageHubApi/image/upload';

        const formData = new FormData();
        formData.append('imageFile', e.target.files![0]);
        const response = await fetch(url_backend, {
          method: 'POST',
          body: formData,
          headers: {
              "accept" : '*/*'
          }
        });        


        if (response.ok) {
            const url = await response.text();
            alert(response.text);

            //setImageUrl(url);
        } else {
            //ShowNotification("Erro ao enviar imagem", ResultType.error);
            alert("Erro ao enviar imagem");
        }
        //setUploading(false);
    }
}

  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-300 bg-gradient-to-br from-gray-300 via-teal-700 to-gray-800">
      
      <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" onChange={onChange}></input>


        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      
    </div>
  );
}

export default App;
