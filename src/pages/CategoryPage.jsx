


import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryModel';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import EditCategory from '../components/EditCategory';
import CofirmBox from '../components/CofirmBox';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: '',
        image: '',
    });
    const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: '',
    });

    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getCategory,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                setCategoryData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory,
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchCategory();
                setOpenConfirmBoxDelete(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="bg-gray-50 min-h-screen">
            <div className="p-4 bg-white shadow-md flex items-center justify-between rounded-lg mb-6">
                <h2 className="font-semibold text-lg">Categories</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="text-sm bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200"
                >
                    Add Category
                </button>
            </div>

            {/* Display No Data if there are no categories and not loading */}
            {!categoryData[0] && !loading && <NoData />}

            {/* Categories Grid */}
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {categoryData.map((category) => (
                    <div
                        className="w-full max-w-xs bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                        key={category._id}
                    >
                        <img
                            alt={category.name}
                            src={category.image}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="px-4 py-3">
                            <h3 className="text-center font-semibold text-gray-800">{category.name}</h3>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => {
                                        setOpenEdit(true);
                                        setEditData(category);
                                    }}
                                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-2 rounded-lg transition duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => {
                                        setOpenConfirmBoxDelete(true);
                                        setDeleteCategory(category);
                                    }}
                                    className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-2 rounded-lg transition duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Loading State */}
            {loading && <Loading />}

            {/* Modals */}
            {openUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
            )}

            {openEdit && (
                <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
            )}

            {openConfimBoxDelete && (
                <CofirmBox
                    close={() => setOpenConfirmBoxDelete(false)}
                    cancel={() => setOpenConfirmBoxDelete(false)}
                    confirm={handleDeleteCategory}
                />
            )}
        </section>
    );
};

export default CategoryPage;

