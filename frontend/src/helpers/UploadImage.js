const cloudName = process.env.REACT_APP_CLOUD_NAME_CLOUDINARY;
const uploadPreset = process.env.REACT_APP_CLOUD_UPLOAD_PRESET;

const uploadImage = async (image) => {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};

export default uploadImage;
