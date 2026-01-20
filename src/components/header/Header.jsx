import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// react-icons
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { HiBars3 } from "react-icons/hi2";
import { useSelector } from "react-redux";
import useGet from "../../hook/useGet";

const Header = () => {

    const cart = useSelector((state) => state.cart)
    const {data} = useGet({url: "products?limit=100"})
    const products = data?.products || [];

    const [language, setLanguage] = useState("Eng");
    const [currency, setCurrency] = useState("USD");
    const [hideTopBar, setHideTopBar] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    const lastScrollY = useRef(0);
    const upScroll = useRef(0);
    const downScroll = useRef(0);

    // Search filter
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Click outside to close search results
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            const diff = current - lastScrollY.current;

            // pastga harakat
            if (diff > 0) {
                downScroll.current += diff;
                upScroll.current = 0;

                if (downScroll.current >= 35) {
                    setHideTopBar(true);
                    downScroll.current = 0;
                }
            }

            // tepaga harakat
            if (diff < 0) {
                upScroll.current += Math.abs(diff);
                downScroll.current = 0;

                if (upScroll.current >= 35) {
                    setHideTopBar(false);
                    upScroll.current = 0;
                }
            }

            lastScrollY.current = current;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setShowResults(e.target.value.length > 0);
    };

    const handleProductClick = () => {
        setSearchQuery("");
        setShowResults(false);
    };

    return (
        <header className="fixed top-0 z-50 w-full bg-[#1B6392] pb-4">
            <div>

                {/* TOP BAR */}
                <div
                    className={`container mx-auto px-2 md:px-0 2xl:px-33 w-full
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${hideTopBar
                            ? "h-0 opacity-0 pt-0"
                            : "h-[56px] opacity-100 pt-4"
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <p className="text-white text-sm">
                            Welcome to Clicon online eCommerce store.
                        </p>

                        <ul className="hidden lg:flex items-center gap-3 text-white text-sm">
                            <li className="font-medium">Follow us :</li>

                            <li className="cursor-pointer"><img src="/Facebook.svg" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Instagram.svg" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Youtube.svg" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Twitter.svg" alt="" /></li>
                            <li className="cursor-pointer"><img src="/Reddit.svg" alt="" /></li>

                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-[#1B6392] outline-none"
                            >
                                <option>Eng</option>
                                <option>Ru</option>
                                <option>Uz</option>
                            </select>

                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="bg-[#1B6392] outline-none"
                            >
                                <option>USD</option>
                                <option>EUR</option>
                            </select>
                        </ul>
                    </div>
                </div>

                <hr
                    className={`border-gray-300 transition-all duration-500
                    ${hideTopBar ? "opacity-0 h-0 m-0" : "opacity-100"}
                    `}
                />

                {/* MAIN HEADER */}
                <div className="flex items-center justify-between pt-3 container mx-auto px-2 md:px-0 2xl:px-33 w-full">
                    <Link to="/">
                        <img src="/Logo.svg" className="w-[180px]" alt="Logo" />
                    </Link>

                    {/* Search with Results */}
                    <div className="relative hidden md:block" ref={searchRef}>
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg z-10" />

                        <input
                            type="search"
                            placeholder="Search for anything..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => searchQuery.length > 0 && setShowResults(true)}
                            className="w-[550px] h-[38px] bg-white rounded pl-10 pr-3 outline-none"
                        />

                        {/* Search Results Dropdown */}
                        {showResults && filteredProducts.length > 0 && (
                            <div className="absolute top-[45px] left-0 w-full bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-50">
                                {filteredProducts.slice(0, 8).map((product) => (
                                    <Link
                                        key={product.id}
                                        to={`/products/${product.id}`}
                                        onClick={handleProductClick}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-100 transition border-b border-gray-100 last:border-0"
                                    >
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-[60px] h-[60px] object-contain rounded"
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-[14px] font-[500] text-[#191C1F] line-clamp-1">
                                                {product.title}
                                            </h4>
                                            <p className="text-[12px] text-[#5F6C72] line-clamp-1 mt-1">
                                                {product.description}
                                            </p>
                                            <p className="text-[14px] font-[600] text-[#2DA5F3] mt-1">
                                                ${product.price}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* No Results */}
                        {showResults && searchQuery.length > 0 && filteredProducts.length === 0 && (
                            <div className="absolute top-[45px] left-0 w-full bg-white rounded-lg shadow-lg p-4 z-50">
                                <p className="text-center text-gray-500">No products found</p>
                            </div>
                        )}
                    </div>

                    <div className="hidden lg:flex gap-5 text-white text-[29px]">
                        <Link className="relative" to="/cart">
                            <FiShoppingCart />
                            <span className="bg-black text-white text-[14px] px-[5px] rounded-[50%] absolute top-[-10px] left-[25px]">
                                {cart?.length}
                            </span>
                        </Link>
                        <Link to="/like"><AiOutlineHeart /></Link>
                        <Link to="/register"><AiOutlineUser /></Link>
                    </div>
                </div>

                <HiBars3 className="block lg:hidden text-white text-3xl absolute right-5 top-[85px]" />
            </div>
        </header>
    );
};

export default Header