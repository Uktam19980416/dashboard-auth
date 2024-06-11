import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import './react-toastify/dist/ReactToastify.css';

export const Brands = () => {
  const base_URL = 'https://autoapi.dezinfeksiyatashkent.uz/api';
  const base_URL2 = 'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/';
  const [datas, setDatas] = useState([]);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const addModalRef = useRef(null);
  const editModalRef = useRef(null);
  

  const getFetch = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
    });
    return await response.json();
  };

  useEffect(() => {
    getFetch(`${base_URL}/brands`).then((data) => {
      setDatas(data?.data);
    });
  }, []);

  const handleAdd = () => {
    if(title === '') {
      toast.error('Please fill the required fields');
      return;
    }
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('images', images);

    fetch(`${base_URL}/brands`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setDatas([...datas, data?.data]);
        toast.success('Data is uploaded');
        addModalRef.current.close();
        setTitle('');
        setImages(null);
        setPreview(null);
      })
      .catch(() => toast.error('Data is not uploaded'));
  };

  const handleDelete = (id) => {
    fetch(`${base_URL}/brands/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setDatas((prevItem) => prevItem.filter((item) => item.id !== id));
          toast.success('Data is deleted');
        } else {
          toast.error('Failed to delete the data');
        }
      })
      .catch(() => toast.error('Data is not deleted'));
  };

  const handleEdit = (id) => {
    const data = datas.find((data) => data.id === id);
    setTitle(data?.title || '');
    setImages(null);
    setPreview(`${base_URL2}${data?.image_src}`);
    setEditId(id);
    editModalRef.current.showModal();
  };

  const handleUpdate = () => {
    if(title === '') {
      toast.error('Please fill the required fields');
      return;
    }
    
    const formData = new FormData();
    formData.append('title', title);
    if (images) {
      formData.append('images', images);
    }

    fetch(`${base_URL}/brands/${editId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedIndex = datas.findIndex((item) => item.id === editId);
        const updatedDatas = [...datas];
        if (updatedIndex !== -1) {
          updatedDatas[updatedIndex] = data?.data;
        }
        setDatas(updatedDatas);
        toast.success('Data is updated');
        editModalRef.current.close();
        setTitle('');
        setImages(null);
        setPreview(null);
      })
      .catch(() => toast.error('Data is not updated'));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container w-full max-w-[1200px] mx-auto mt-5">
      <div className="flex items-center justify-between">
        <button
          className="btn"
          onClick={() => addModalRef.current.showModal()}
        >
          Add
        </button>
        <div className="p-5 border-2 rounded-full"></div>
      </div>
      <table border={2} className="border-2 w-full">
        <thead className="bg-slate-300">
          <tr>
            <th>Title</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="bg-slate-100">
          {datas.map((data, index) => (
            <tr key={index} className="border-2 text-center">
              <td className="text-lg text-black">{data.title}</td>
              <td className="w-[100px]">
                <img
                  src={`${base_URL2}${data.image_src}`}
                  alt="Photo"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </td>
              <td className="text-lg text-black">
                <button
                  className="btn"
                  onClick={() => handleEdit(data.id)}
                >
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(data.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={addModalRef} className="modal">
        <div className="modal-box space-y-5">
          <input
            type="text"
            placeholder="Title *"
            className="input input-bordered w-full max-w-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="input input-bordered w-full max-w-sm"
            onChange={handleImageChange}
          />
          <div className="w-full">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-3xl"
              />
            )}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => addModalRef.current.close()}>Close</button>
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </dialog>

      <dialog ref={editModalRef} className="modal">
        <div className="modal-box space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full max-w-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="input input-bordered w-full max-w-sm"
            onChange={handleImageChange}
          />
          <div className="w-full">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-3xl"
              />
            )}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => editModalRef.current.close()}>Close</button>
            <button className="btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
