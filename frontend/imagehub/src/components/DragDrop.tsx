//
// Patrick Carvalho
// copyright 2022
//

import { ToastContainer, toast } from 'react-toastify';
import { ChangeEvent } from "react";

function allowDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
}

async function execUpload(ev : any)
{
    const url_host = 'batmanhub.com';
    const url_backend = 'http://' + url_host + ':5000/ImageHubApi/image/upload';

    const formData = new FormData();

    try {

      formData.append('imageFile', ev);
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

async function drop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    //console.log(ev.dataTransfer);
    //console.log(ev.dataTransfer.files[0]);

    if (ev.dataTransfer.files![0]) {
        execUpload(ev.dataTransfer.files![0]);
       
    }
  
}

async function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files![0]) {
        execUpload(e.target.files![0]);
    }
        
}

function DragDrop() {
    return <div id="div1" onDrop={drop} onDragOver={allowDrop} className="dark:bg-slate-700 rounded-xl p-8 dark:bg-slate-800 text-white border-b" >
        <h2 className="dark:text-slate-400 text-sm leading-6 truncate">
        Drop Here :) 💧
      </h2>

      <p>
      <br/>
      <label className="rounded-lg flex items-center justify-center dark:text-slate-400 text-sm ">
      💾  or Click Here
      <input type="file"
        className="hidden dark:text-slate-400 text-sm leading-6 truncate"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg" onChange={onChange} ></input>
       
        </label>
      </p>

      <ToastContainer />




    </div>;
}

export default DragDrop;