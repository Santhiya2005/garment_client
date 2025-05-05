import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi"
import isAdmin from '../utils/isAdmin'

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout })
      if (response.data.success) {
        close?.()
        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
        navigate("/")
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleClose = () => close?.()

  // shared classes for each menu item
  const itemClasses = `
    block
    w-full
    text-left
    bg-gray-300
    text-black
    hover:bg-gray-400
    py-2
    px-4
    rounded
    transition
  `

  return (
    <div className="bg-neutral-800 rounded-lg shadow-lg p-4 min-w-[200px] text-white">
    {/* Account heading */}
    <div className="font-semibold text-lg mb-1">My Account</div>
  

      {/* Name + external link */}
      <div className="flex items-center text-sm mb-3">
        <span className="flex-1 truncate">{user.name || user.mobile}</span>
        <Link
          onClick={handleClose}
          to="/dashboard/profile"
          className="text-white hover:text-primary-200"
        >
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider className="mb-3" />

      {/* Menu items */}
      <div className="grid gap-2">
        {isAdmin(user.role) && (
          <Link onClick={handleClose} to="/dashboard/category" className={itemClasses}>
            Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link onClick={handleClose} to="/dashboard/subcategory" className={itemClasses}>
            Sub Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link onClick={handleClose} to="/dashboard/upload-product" className={itemClasses}>
            Upload Product
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link onClick={handleClose} to="/dashboard/product" className={itemClasses}>
            Product
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link onClick={handleClose} to="/update-order" className={itemClasses}>
            User Orders
          </Link>
        )}
        <Link onClick={handleClose} to="/dashboard/myorders" className={itemClasses}>
          My Orders
        </Link>
        <Link onClick={handleClose} to="/dashboard/address" className={itemClasses}>
          Save Address
        </Link>
        <a
          href="https://garment-analysis-1.onrender.com"
          target="_blank"
          rel="noopener noreferrer" 
          className={itemClasses}
        >
          Analysis
        </a>
        <button onClick={handleLogout} className={itemClasses}>
          Log Out
        </button>
      </div>
    </div>
  )
}

export default UserMenu
