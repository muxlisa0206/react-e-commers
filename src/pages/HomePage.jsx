import React from 'react'
import useGet from "../hook/useGet"
import { FaArrowRight, FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { addToCart, removeToCart } from '../features/cardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';

const HomePage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)
  const {data} = useGet({url: "products?limit=94"})
  const products = data?.products;  
  const slicedproducts = products?.slice(1, 9)
  const product = products ? products[0] : "";

  return (
    <>
      <section className='hidden lg:block border-b-1 pt-[140px] border-[gray]/10'>
        <div className='container mx-auto px-[20px] flex items-center py-[10px] justify-between px-2 md:px-0 2xl:px-33'>
          <div className='flex items-center gap-[25px] font-medium'>
            <select className='px-[20px] bg-[#F2F4F5] max-w-[160px] w-full py-[14px] rounded-[4px]'>
              <option value="Phone">Phone</option>
              <option value="Hp">HP Noutbook</option>
              <option value="Bluetooth">Bluetooth</option>
              <option value="Clothes">Clothes</option>
            </select>
            <p className='flex items-center gap-2'>
              <img src="/map.svg" alt="" />
              <span className='text-[#5F6C72] font-[400] text-[14px]'>Track Order</span>
            </p>
            <p className='flex items-center gap-2'>
              <img src="/compare.svg" alt="" />
              <span className='text-[#5F6C72] font-[400] text-[14px]'>Compare</span>
            </p>
            <p className='flex items-center gap-2'>
              <img src="/support.svg" alt="" />
              <span className='text-[#5F6C72] font-[400] text-[14px]'>Customer Support</span>
            </p>
            <p className='flex items-center gap-2'>
              <img src="/info.svg" alt="" />
              <span className='text-[#5F6C72] font-[400] text-[14px]'>Need Help</span>
            </p>
          </div>
          <p className='flex items-center gap-2'>
              <img src="/PhoneCall.svg" alt="" />
              <span className='text-[#191C1F] font-[400] text-[18px]'>+1-202-555-0104</span>
            </p>
        </div>
      </section>

      {/* Hero Section */}
      <section>
        <div className='container mx-auto pt-[150px] lg:pt-[20px] px-4 md:px-6 lg:px-2 2xl:px-33 flex flex-col lg:flex-row items-center gap-[20px] lg:gap-[40px]'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-[10px] max-w-[1222px] bg-[#F2F4F5] w-full h-full lg:h-[520px] p-[20px] sm:p-[30px] xl:p-[50px] rounded-[4px]'>
              <div className='max-w-[356px] w-full flex flex-col gap-[5px] text-center sm:text-left'>
                <p className='text-[#2484C2] font-[600] text-[12px] sm:text-[14px]'>- THE BEST PLACE TO PLAY</p>
                <h1 className='text-[24px] sm:text-[30px] xl:text-[48px] text-[#191C1F] font-[600]'>Xbox Consoles</h1>
                <p className='text-[#475156] text-[12px] sm:text-[14px] xl:text-[18px] font-[400] w-full line-clamp-2'>Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.</p>
                <Link to='/cart' className='bg-[#FA8232] mt-[10px] border-none px-[24px] sm:px-[32px] font-[500] text-white text-[12px] sm:text-[14px] xl:text-[18px] flex items-center justify-center mx-auto sm:mx-0 max-w-[160px] sm:max-w-[191px] gap-2 w-full py-[12px] rounded-[4px] hover:bg-[#e67429] transition'>SHOP NOW <FaArrowRight /></Link >
              </div>
              <div className='relative'>
                <img className='max-w-[250px] sm:max-w-[300px] lg:max-w-[368px] w-full' src="/hero1.svg" alt="Xbox Console" />
                <div className='absolute top-[-15px] sm:top-[-20px] left-[80px] sm:left-[110px] xl:left-[160px] bg-[#2DA5F3] w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] xl:w-[100px] xl:h-[100px] flex items-center justify-center rounded-[50%] text-[#FFFFFF] text-[16px] sm:text-[22px] font-[600]'>$299</div>
              </div>
            </div>

            <div className='flex flex-col gap-3 max-w-[750px] lg:max-w-[494px] w-full'>
              <div className='bg-[#191C1F] w-full pt-[20px] rounded-[4px]'>
                <div className='pl-[20px] sm:pl-[30px] pr-[10px] pb-[20px] h-[245px] w-full flex justify-between items-center gap-[10px] rounded-[4px]'>
                  <div className='flex-shrink-0'>
                    <p className='text-[#EBC80C] text-[12px] sm:text-[14px] font-[500]'>SUMMER SALES</p>
                    <h1 className='text-[18px] sm:text-[24px] font-[600] text-[#FFFFFF] max-w-[160px] w-full'>New Google Pixel 6 Pro</h1>
                    <Link to='/cart' className='bg-[#FA8232] mt-[10px] border-none px-[16px] sm:px-[24px] font-[500] text-white text-[10px] sm:text-[14px] flex items-center justify-center max-w-[120px] sm:max-w-[156px] gap-2 w-full py-[10px] rounded-[4px] hover:bg-[#e67429] transition'>SHOP NOW <FaArrowRight /></Link >
                  </div>
                  <div className='relative flex-shrink-0'>
                    <img className='max-w-[140px] sm:max-w-[180px] w-full' src="/hero2.svg" alt="Google Pixel" />
                    <div className='absolute top-[-10px] left-[40px] sm:left-[60px] md:left-[90px] px-[12px] sm:px-[16px] py-[6px] sm:py-[8px] rounded-[4px] bg-[#EFD33D] text-black text-[10px] sm:text-[12px] md:text-[16px] font-[600] whitespace-nowrap'>29% OFF</div>
                  </div>
                </div>
              </div>

              <div className='flex items-center bg-[#F2F4F5] rounded-[4px] justify-between gap-[15px] sm:gap-[30px] w-full h-[245px] p-[20px] sm:p-[30px]'>
                  <img className='max-w-[120px] sm:max-w-[160px] w-full object-contain flex-shrink-0' src="/hero3.svg" alt="Xiaomi FlipBuds" />
                  <div className='flex flex-col gap-[5px]'>
                    <p className='text-[#EBC80C] text-[16px] sm:text-[20px] md:text-[24px] font-[500] max-w-[172px] w-full'>Xiaomi FlipBuds Pro</p>
                    <h1 className='text-[14px] sm:text-[16px] font-[600] text-[#2DA5F3]'>$299 USD</h1>
                    <Link to='/cart' className='bg-[#FA8232] mt-[10px] border-none px-[16px] sm:px-[24px] font-[500] whitespace-nowrap text-white text-[10px] sm:text-[14px] flex items-center justify-center max-w-[120px] sm:max-w-[156px] gap-2 w-full py-[10px] rounded-[4px] hover:bg-[#e67429] transition'>SHOP NOW <FaArrowRight /></Link >
                  </div>
              </div>
            </div>
        </div>
      </section>

      {/* Features Section - Scrollable */}
      <section className='py-[40px] lg:py-[60px]'>
        <div className='container mx-auto px-4 md:px-6 lg:px-2 2xl:px-33'>
          <div className='border-[#E4E7E9] border-1 p-[20px] sm:p-[30px] rounded-[4px] overflow-x-auto'>
            <div className='flex items-center gap-[20px] min-w-max'>
              <div className='flex items-center px-[20px] sm:px-[30px] border-r-1 border-[#E4E7E9] gap-3 sm:gap-5'>
                <img className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]' src="/Package.svg" alt="" />
                <div>
                  <p className='text-[#191C1F] font-[500] text-[12px] sm:text-[14px] whitespace-nowrap'>Fasted Delivery</p>
                  <p className='text-[#5F6C72] font-[400] text-[10px] sm:text-[14px] whitespace-nowrap'>Delivery in 24/H</p>
                </div>
              </div>

              <div className='flex items-center px-[20px] sm:px-[30px] border-r-1 border-[#E4E7E9] gap-3 sm:gap-5'>
                <img className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]' src="/Trophy.svg" alt="" />
                <div>
                  <p className='text-[#191C1F] font-[500] text-[12px] sm:text-[14px] whitespace-nowrap'>24 Hours Return</p>
                  <p className='text-[#5F6C72] font-[400] text-[10px] sm:text-[14px] whitespace-nowrap'>100% money-back guarantee</p>
                </div>
              </div>

              <div className='flex items-center px-[20px] sm:px-[30px] border-r-1 border-[#E4E7E9] gap-3 sm:gap-5'>
                <img className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]' src="/CreditCard.svg" alt="" />
                <div>
                  <p className='text-[#191C1F] font-[500] text-[12px] sm:text-[14px] whitespace-nowrap'>Secure Payment</p>
                  <p className='text-[#5F6C72] font-[400] text-[10px] sm:text-[14px] whitespace-nowrap'>Your money is safe</p>
                </div>
              </div>

              <div className='flex items-center px-[20px] sm:px-[30px] gap-3 sm:gap-5'>
                <img className='w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]' src="/Headphones.svg" alt="" />
                <div>
                  <p className='text-[#191C1F] font-[500] text-[12px] sm:text-[14px] whitespace-nowrap'>Support 24/7</p>
                  <p className='text-[#5F6C72] font-[400] text-[10px] sm:text-[14px] whitespace-nowrap'>Live contact/message</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="container pt-[20px] mx-auto px-4 md:px-6 lg:px-2 2xl:px-33">
          <Link className='text-blue-600 text-end font-medium text-[24px]' to={'/products'}>All Products</Link>
          <div className='flex flex-col lg:flex-row'>
          <div className='bg-white p-4 sm:p-5 w-full lg:max-w-[328px] border-1 border-[gray]/20 rounded-[4px]'>
                  <div>
                    <img className='w-full h-[200px] sm:h-[250px] object-contain' src={product?.thumbnail} alt={product?.title} />
                  </div>
                  <div className='flex flex-col gap-3 sm:gap-4'>
                    <h1 className='mt-[10px] text-[18px] sm:text-[24px] font-[400] line-clamp-2'>
                      {product?.title}
                    </h1>
                    <p className='text-[16px] sm:text-[18px] font-[600] text-[#2DA5F3]'>${product?.price}</p>
                    <p className='text-[14px] sm:text-[16px] text-[#5F6C72] font-semibold line-clamp-3'>{product?.description}</p>
                  </div>
                  <div className='flex gap-2 sm:gap-3 items-center justify-between mt-[60px] sm:mt-[100px] lg:mt-[150px]'>
                    <button className='cursor-pointer w-12 h-12 sm:w-14 sm:h-14 lg:w-12 lg:h-12 bg-[#FFE7D6] hover:bg-[#FA8232] text-black hover:text-white rounded-[4px] text-[18px] sm:text-[22px] lg:text-[20px] flex items-center justify-center transition'>
                      <FaRegHeart />
                    </button>
                    <Link to='/cart' className='bg-[#FA8232] hover:bg-[#e67429] border-none px-[16px] sm:px-[24px] font-[500] whitespace-nowrap text-white text-[14px] sm:text-[16px] flex justify-center items-center gap-2 flex-1 py-[12px] sm:py-[14px] lg:py-[12px] cursor-pointer rounded-[4px] transition'><FiShoppingCart/> Buy now</Link >
                    <Link to={`/products/${product?.id}`} className='cursor-pointer w-12 h-12 sm:w-14 sm:h-14 lg:w-12 lg:h-12 bg-[#FFE7D6] hover:bg-[#FA8232] text-black hover:text-white rounded-[4px] text-[18px] sm:text-[22px] lg:text-[20px] flex items-center justify-center transition'>
                      <GrView />
                    </Link>
                  </div>
            </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {
              slicedproducts?.map((el) =>(
                <div key={el.id} className='bg-white p-4 sm:p-5 border border-[gray]/20 w-full rounded-[4px] hover:shadow-lg transition'>
                  <div className='relative group'>
                    <img
                      className='w-full h-[180px] sm:h-[220px] lg:h-[250px] object-contain'
                      src={el.thumbnail}
                      alt={el.title}
                    />

                    <div
                      className='
                        absolute inset-0
                        bg-[gray]/50
                        flex items-center justify-center gap-3
                        opacity-0 group-hover:opacity-100
                        transition-all duration-500
                        rounded-[4px]
                      '
                    >
                      <button className='w-10 h-10 rounded-full bg-white text-[red] hover:bg-orange-500 hover:text-white flex items-center justify-center hover:scale-110 transition'>
                      <FaRegHeart />
                      </button>

                      {
                        cart.find((items) => items.id === el.id) ? (
                          <button onClick={() => dispatch(removeToCart(el))}
                          className='w-10 h-10 rounded-full bg-white text-black hover:bg-orange-500 hover:text-white flex items-center justify-center hover:scale-110 transition'>
                            <BsFillCartDashFill />
                          </button>
                        ) : (
                          <button onClick={() => dispatch(addToCart(el))}
                          className='w-10 h-10 rounded-full bg-white text-black hover:bg-orange-500 hover:text-white flex items-center justify-center hover:scale-110 transition'>
                            <BsFillCartPlusFill />
                          </button>
                        )
                      }

                      <button className='w-10 h-10 rounded-full bg-white text-black hover:bg-orange-500 hover:text-white flex items-center justify-center hover:scale-110 transition'>
                        <GrView />
                      </button>
                    </div>
                  </div>

                  <h1 className='line-clamp-1 text-[14px] sm:text-[16px] font-[400] mt-3'>
                    {el.title}
                  </h1>
                  <p className='mt-2 text-[12px] sm:text-[14px] text-[#5F6C72] line-clamp-2 font-semibold'>{el.description}</p>
                  <p className='mt-2 text-[14px] font-[600] text-[#2DA5F3] font-semibold'>
                    ${el.price}
                  </p>
                </div>
              ))
            }
          </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage