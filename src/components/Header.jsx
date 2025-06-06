import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import Search from './Search';

const Header = () => {
    const [isMobile] = useMobile();
    const location = useLocation();
    const isSearchPage = location.pathname === "/search";
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const cartItem = useSelector(state => state.cartItem.cart);
    const { totalPrice, totalQty } = useGlobalContext();
    const [openCartSection, setOpenCartSection] = useState(false);

    const redirectToLoginPage = () => {
        navigate("/login");
    };

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false);
    };

    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login");
            return;
        }
        navigate("/user");
    };

    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-red'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='container mx-auto flex items-center px-2 justify-between'>
                        {/* Logo */}
                        <div className='h-full'>
                            <Link to={"/"} className='h-full flex justify-center items-center'>
                                {/* Logo image or text */}
                            </Link>
                        </div>

                        {/* Search (desktop) */}
                        <div className='hidden lg:block'>
                            <Search />
                        </div>

                        {/* Login / User Info / Cart */}
                        <div>
                            {/* Mobile user icon */}
                            <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                                <FaRegCircleUser size={26} />
                            </button>

                            {/* Desktop user info and cart */}
                            <div className='hidden lg:flex items-center gap-10'>
                                {
                                    user?._id ? (
                                        <>
                                            {/* My Account */}
                                            <div className='relative'>
                                                <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
                                                    <p className="font-bold text-lg" style={{ color: 'black' }}>My Account</p>
                                                    {
                                                        openUserMenu ? (
                                                            <GoTriangleUp size={25} style={{ color: 'blue' }} />
                                                        ) : (
                                                            <GoTriangleDown size={25} style={{ color: 'red' }} />
                                                        )
                                                    }
                                                </div>
                                                {
                                                    openUserMenu && (
                                                        <div className='absolute right-0 top-12 bg-black-500'>
                                                            <div className='bg-blue rounded p-4 min-w-52 lg:shadow-lg text-white'>
                                                                <UserMenu close={handleCloseUserMenu} />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>

                                            {/* My Cart (Only when logged in) */}
                                            <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-black-800 hover:bg-blue-500 px-3 py-2 rounded text-black'>
                                                <div className='animate-bounce'>
                                                    <BsCart4 size={26} />
                                                </div>
                                                <div className='font-semibold text-sm'>
                                                    {
                                                        cartItem && cartItem.length > 0 ? (
                                                            <div>
                                                                <p>{totalQty} Items</p>
                                                                <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                            </div>
                                                        ) : (
                                                            <p className="font-bold">My Cart</p>
                                                        )
                                                    }
                                                </div>
                                            </button>
                                        </>
                                    ) : (
                                        <button
  onClick={redirectToLoginPage}
  className="text-white text-xl px-6 py-3 bg-black hover:bg-gray-800 rounded-xl shadow-lg transition duration-300"
>
  Login
</button>

                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Search on mobile */}
            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>

            {/* Cart Drawer */}
            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
        </header>
    );
};

export default Header;
