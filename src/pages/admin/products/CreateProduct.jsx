import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productsCreate } from '../../../features/products/ProductSlice';

const CreateProduct = () => {
  
  const dispatch = useDispatch();
  const { isLoading,message} = useSelector((state) => state.productRedux);

  const [productImg, setProductImg] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      productsCreate({
        name,
        brand,
        price,
        desc,
        image: productImg,
      })
    );
  };

  return (
    <div className="h-screen w-full fm" >
    
      <div className=' w-10 h-[900px] border-2 border-black'>
        {productImg ? (
          <>
            <img src={productImg} alt="error!" width='300px' height='300px' />
          </>
        ) : (
          <img src='./images/default_avatar.jpg' alt="error!" width='300px' height='300px' />
        )}
      </div>
    
      <div className=" flex flex-col justify-center items-start m-4" onSubmit={handleSubmit}>
        <h3 className=' text-2xl font-bold mb-4'>Create a Product</h3>
        <div className='bg-red-500'>
        <input className=' text-xl mb-2 '
          id="imgUpload"
          accept="image/*"
          type="file"
          onChange={handleProductImageUpload}
          required
        />
        </div>
        <select className=' text-xl mb-2' onChange={(e) => setBrand(e.target.value)} required>
          <option value="">Select Brand</option>
          <option value="men">men</option>
          <option value="women">women</option>
          <option value="tshirt">tshirt</option>
          <option value="shirt">shirt</option>
        </select>
        <input className=' text-xl mb-2 border-2 border-black'
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input className=' text-xl mb-2 border-2 border-black'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea className=' text-xl mb-2 border-2 border-black'                                                                                                                                                                                                                                                                                                              
          type="text"
          rows="4"
          cols="50"
          placeholder="Short Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />

        <button className='btn btn-outline' type="submit">
          { isLoading=== "pending" ? "Submitting" : "Submit"}
        </button>
      </div>
      
     </div>
   
  );
};

export default CreateProduct;