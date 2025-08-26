import React, { useState } from 'react';

const BannerUploadForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setMessage('');
    } else {
      setFile(null);
      setPreview(null);
      setMessage('Please select a valid image file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select an image before uploading.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('adbanner', file); // field name must match multer

    try {
      const response = await fetch('http://localhost:5000/api/upload/adbanner', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Image uploaded successfully!');
        setFile(null);
        setPreview(null);
      } else {
        setMessage(data.error || 'Upload failed.');
      }
    } catch (error) {
      setMessage('Upload error: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20, fontFamily: 'Arial' }}>
      <h2>Upload Banner Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ marginBottom: 10, width: '100%' }}
        />
        {preview && <img src={preview} alt="Preview" style={{ width: '100%', marginBottom: 10 }} />}
        <button type="submit" disabled={uploading} style={{ width: '100%', padding: 10 }}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
};

export default BannerUploadForm;
