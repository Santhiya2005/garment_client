import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import successAlert from '../utils/SuccessAlert';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [], 
    category: [],
    subCategory: [],
    sizes: [], // Added sizes array
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // State for size selection
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  // Available size options
  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding an image URL directly
  const handleAddImageUrl = (e) => {
    const imageUrl = e.target.value;

    if (imageUrl) {
      setData((prev) => ({
        ...prev,
        image: [...prev.image, imageUrl],
      }));
    }
  };

  // Handle removing an image URL
  const handleDeleteImage = (index) => {
    const updatedImages = [...data.image];
    updatedImages.splice(index, 1);

    setData((prev) => ({
      ...prev,
      image: updatedImages,
    }));
  };

  // Handle removing a category
  const handleRemoveCategory = (index) => {
    const updatedCategories = [...data.category];
    updatedCategories.splice(index, 1);

    setData((prev) => ({
      ...prev,
      category: updatedCategories,
    }));
  };

  // Handle removing a subcategory
  const handleRemoveSubCategory = (index) => {
    const updatedSubCategories = [...data.subCategory];
    updatedSubCategories.splice(index, 1);

    setData((prev) => ({
      ...prev,
      subCategory: updatedSubCategories,
    }));
  };

  // Handle adding a size
  const handleAddSize = () => {
    if (selectedSize && !data.sizes.includes(selectedSize)) {
      setData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, selectedSize],
      }));
      setSelectedSize("");
    }
  };

  // Handle removing a size
  const handleRemoveSize = (index) => {
    const updatedSizes = [...data.sizes];
    updatedSizes.splice(index, 1);

    setData((prev) => ({
      ...prev,
      sizes: updatedSizes,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          sizes: [],
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="grid p-3">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter product description"
              name="description"
              value={data.description}
              onChange={handleChange}
              required
              rows={3}
              className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
            />
          </div>

          <div>
            <p className="font-medium">Image URL</p>
            <div>
              <input
                type="text"
                placeholder="Paste image URL here"
                onChange={handleAddImageUrl}
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
              <div className="flex flex-wrap gap-4">
                {data.image.map((img, index) => {
                  return (
                    <div
                      key={img + index}
                      className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                    >
                      <img
                        src={img}
                        alt={img}
                        className="w-full h-full object-scale-down cursor-pointer"
                      />
                      <div
                        onClick={() => handleDeleteImage(index)}
                        className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="font-medium">Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((el) => el._id === value);

                  setData((prev) => ({
                    ...prev,
                    category: [...prev.category, category],
                  }));
                  setSelectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="font-medium">Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find((el) => el._id === value);

                  setData((prev) => ({
                    ...prev,
                    subCategory: [...prev.subCategory, subCategory],
                  }));
                  setSelectSubCategory("");
                }}
              >
                <option value={""}>Select Sub Category</option>
                {allSubCategory.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="grid gap-1">
            <label className="font-medium">Available Sizes</label>
            <div className="flex gap-2">
              <select
                className="bg-blue-50 border p-2 rounded flex-grow"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                <option value="">Select Size</option>
                {sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddSize}
                className="bg-primary-100 hover:bg-primary-200 px-4 rounded font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.sizes.map((size, index) => (
                <div
                  key={size + index}
                  className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded"
                >
                  <span>{size}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor='stock' className='font-medium'>Number of Stock</label>
            <input 
              id='stock'
              type='number'
              placeholder='Enter product stock'
              name='stock'
              value={data.stock}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='price' className='font-medium'>Price</label>
            <input 
              id='price'
              type='number'
              placeholder='Enter product price'
              name='price'
              value={data.price}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='discount' className='font-medium'>Discount</label>
            <input 
              id='discount'
              type='number'
              placeholder='Enter product discount'
              name='discount'
              value={data.discount}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadProduct;