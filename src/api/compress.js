import React from 'react';
import imageCompression from 'browser-image-compression';

export default function ImageUploader({ setImage, setImageDisplay, size, length }) {
  const compressImage = async (file) => {
    try {
      const webpBlob = await convertToWebp(file);
      const compressedFile = new File([webpBlob], `${file.name}.webp`, {
        type: 'image/webp',
      });
      const compressedUrl = URL.createObjectURL(webpBlob);
      setImage(compressedFile);
      setImageDisplay(compressedUrl);
    } catch (error) {
      console.error('압축 오류:', error);
      throw error;
    }
  };

  const convertToWebp = async (file) => {
    const options = {
      maxSizeMB: size,
      maxWidthOrHeight: length,
      fileType: 'webp',
      returnBlob: true,
    };
    console.log(options)
    const compressedBlob = await imageCompression(file, options);
    return compressedBlob;
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      try {
        const originalImage = files[0];
        await compressImage(originalImage);
      } catch (error) {
        console.error('이미지 처리 오류:', error);
      }
    }
  };

  return (
    <>
      <input id='file' type='file' accept='image/*' onChange={handleImageUpload} />
    </>
  );
}
