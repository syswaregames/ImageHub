import React from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const url_host = 'batmanhub.com';
const url_backend = 'http://' + url_host + ':5000/ImageHubApi/image/upload';

const FileUploadComponent = () => {
    const fileParams = ({ meta }) => {
        return { url: url_backend }
    }
    const onFileChange = ({ meta, file }, status) => { 
        console.log(status, meta, file) 

        const formData = new FormData();

      try {

        formData.append('imageFile', file);
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
    const onSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
    }
    const getFilesFromEvent = e => {
        return new Promise(resolve => {
            getDroppedOrSelectedFiles(e).then(chosenFiles => {
                resolve(chosenFiles.map(f => f.fileObject))
            })
        })
    }
    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files'
        return (
            <label className="btn btn-danger mt-4">
                {textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }
    return (
        <Dropzone
            onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*,audio/*,video/*"
            maxFiles={5}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: 600, height: 400 },
                dropzoneActive: { borderColor: 'green' },
            }}            
        />
    );
};
export default FileUploadComponent;