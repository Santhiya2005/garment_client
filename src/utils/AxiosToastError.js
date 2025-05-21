import toast from "react-hot-toast";

const AxiosToastError = (error) => {
    const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

    toast.error(message);
};

export default AxiosToastError;
