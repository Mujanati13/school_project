import React, {useState} from "react";

import '../tailwind/style.css'
// drag drop file component
export default function () {
  const [issUpload , setupload] = useState('Drag and drop your Video here or')
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  function uploadFile(file) {
    setupload(<h1 className='animate-pulse font-bold'>Uploading...</h1>)
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      onUploadProgress: progressEvent => {
        const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        console.log(`Upload progress: ${percentage}%`);
        setupload(`Upload progress: ${percentage}%`)
      }
    };

    fetch('https://65.20.97.122/upload', {
      method: 'POST',
      body: formData,
      ...config
    }).then(response => {
      console.log();
      setupload(<h1 className="text-green-400 text-bold">Video uploaded successfully</h1>)
    }).catch(error => {
      console.error('Error uploading video:', error);
      setupload(`Error uploading video`)
    });
  }

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      uploadFile(file);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadFile(file);
    }
  };


  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form className="mt-24" id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
      <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
        <div>
          <p className="font-bold">{issUpload}</p>
          <button className="upload-button" onClick={onButtonClick}>Upload a video</button>
        </div>
      </label>
      {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    </form>
  );
};