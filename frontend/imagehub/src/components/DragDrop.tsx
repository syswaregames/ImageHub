import { ToastContainer, toast } from 'react-toastify';

function allowDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
}



async function drop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    console.log(ev.dataTransfer);
    console.log(ev.dataTransfer.files[0]);

    if (ev.dataTransfer.files![0]) {

        const url_host = 'batmanhub.com';
        const url_backend = 'http://' + url_host + ':5000/ImageHubApi/image/upload';
  
        const formData = new FormData();
  
        try {
  
          formData.append('imageFile', ev.dataTransfer.files![0]);
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

function DragDrop() {
    return <div id="div1" onDrop={drop} onDragOver={allowDrop} className="dark:bg-slate-700 rounded-xl p-8 dark:bg-slate-800 text-white border-b" >
        <h2 className="dark:text-slate-400 text-sm leading-6 truncate">
        Drop Here :) 💧
      </h2>


      <p>
      <br/>
      <input type="file"
        className="dark:text-slate-400 text-sm leading-6 truncate"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg" ></input>
      </p>
     

      <ToastContainer />
    </div>;
}

export default DragDrop;