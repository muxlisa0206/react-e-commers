import React from 'react'
import useGet from "../hook/useGet"
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import CardPage from './CardPage';

const HomePage = () => {
  const {data} = useGet({url: "products?limit=194"})
  const products = data?.products;  
  const slicedproducts = products?.slice(1, 9)
  const product = products ? products[0] : "";

  return (
    <>
      <section className='hidden lg:block border-b-1 pt-[140px] border-[gray]/10'>
        <div className='container mx-auto px-[20px] flex items-center py-[10px] justify-between px-5'>
          <div className='flex items-center gap-[25px] font-medium'>
            <select className='px-[20px] bg-[#F2F4F5] max-w-[160px] w-full py-[14px] '>
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
      <section>
        <div className='container mx-auto pt-[150px] lg:pt-[20px] px-5 flex flex-col lg:flex-row items-center gap-[40px]'>
            <div className='flex items-center justify-between gap-[10px] max-w-[1222px] bg-[#F2F4F5] w-full h-full lg:h-[520px] p-[30px] xl:p-[50px] rounded-[4px]'>
              <div className='max-w-[356px] w-full flex flex-col gap-[5px] '>
                <p className='text-[#2484C2] font-[600] text-[10px] sm:text-[14px]'>- THE BEST PLACE TO PLAY</p>
                <h1 className='text-[18px] sm:text-[30px] xl:text-[48px] text-[#191C1F] font-[600]'>Xbox Consoles</h1>
                <p className='text-[#475156] text-[10px] sm:text-[14px] xl:text-[18px] font-[400] max-w-[230px] sm:max-w-[350px] w-full line-clamp-2'>Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.</p>
                <Link to='/card' className='bg-[#FA8232] mt-[10px] border-none px-[32px] font-[300] sm:font-[500] text-white text-[8px] whitespace-nowrap sm:text-[12px] xl:text-[18px] flex items-center max-w-[140px] sm:max-w-[150px] xl:max-w-[191px] gap-2 w-full py-[10px] rounded-[4px]'>SHOP NOW <FaArrowRight /></Link >
              </div>
              <div className='relative'>
                <img className='max-w-[368px] w-full' src="/hero1.svg" alt="" />
                <div className='absolute top-[-20px] left-[110px] xl:left-[160px] bg-[#2DA5F3] w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] xl:w-[100px] xl:h-[100px] flex items-center justify-center rounded-[50%] text-[#FFFFFF] text-[14px] sm:text-[22px] font-[600]'>$299</div>
              </div>
            </div>
            <div className='flex flex-col gap-3 max-w-[750px] lg:max-w-[494px] w-full'>
              <div className='bg-[#191C1F] w-full pt-[20px] rounded-[4px]'>
                <div className='pl-[30px] pb-[20px] h-[245px] w-full flex justify-center lg:justify-between items-center gap-[10px] rounded-[4px]'>
                  <div>
                    <p className='text-[#EBC80C] text-[14px] font-[500]'>SUMMER SALES</p>
                    <h1 className='text-[18px] sm:text-[24px] font-[600] text-[#FFFFFF] max-w-[160px] w-full'>New Google Pixel 6 Pro</h1>
                    <Link to='/card' className='bg-[#FA8232] mt-[10px] border-none px-[24px] font-[500] text-white text-[6px] sm:text-[10px] xl:text-[14px] flex items-center max-w-[110px] sm:max-w-[120px] xl:max-w-[156px] gap-2 w-full py-[10px] rounded-[4px]'>SHOP NOW <FaArrowRight /></Link >
                  </div>
                  <div className='relative'>
                    <img src="/hero2.svg" alt="" />
                    <div className='absolute top-[-10px] left-[60px] sm:left-[90px] px-[16px] py-[8px] rounded-[4px] bg-[#EFD33D] text-black text-[12px] whitespace-nowrap sm:text-[16px] font-[600]'>29% OFF</div>
                  </div>
                </div>
              </div>
              <div className='flex items-center bg-[#F2F4F5] rounded-[4px] justify-center lg:justify-between gap-[20px] sm:gap-[50px] w-full h-[245px] p-[30px]'>
                  <img className='max-w-[160px] w-full object-contain' src="/hero3.svg" alt="" />
                  <div className='flex flex-col gap-[5px]'>
                    <p className='text-[#EBC80C] text-[18px] sm:text-[24px] font-[500] max-w-[172px] w-full'>Xiaomi FlipBuds Pro</p>
                    <h1 className='text-[14px] font-[600] text-[#2DA5F3]'>$299 USD</h1>
                    <Link to='/card' className='bg-[#FA8232] mt-[10px] border-none px-[24px] font-[500] whitespace-nowrap text-white text-[6px] sm:text-[10px] xl:text-[14px] flex items-center max-w-[110px] sm:max-w-[120px] xl:max-w-[156px] gap-2 w-full py-[10px] rounded-[4px]'>SHOP NOW <FaArrowRight /></Link >
                  </div>
              </div>
            </div>
        </div>
      </section>
      <section>
        <div className='container mx-auto pt-[150px] lg:pt-[20px] px-5 grid grid-cols-4 border-[#E4E7E9] border-1'>
          <div className='flex items-center border-l-1 border-[#E4E7E9]'>
            <img src="/Package.svg" alt="" />
            <div>
              
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container flex pt-[20px] gap-5 mx-auto px-5">
        <div className='bg-white p-5 rounded-2xl shadow-md max-w-[328px] w-full'>
                  <div>
                    <img className='w-full h-[250px] object-contain' src={product?.thumbnail} alt="" />
                  </div>
                  <h1 className='line-clamp-1'>
                    {product?.title}
                  </h1>
                  <p className='mt-2'>{product?.price}</p>
                </div>
          <div className="grid grid-cols-4 gap-5">
            {
              slicedproducts?.map((el) =>(
                <div className='bg-white p-5 rounded-2xl shadow-md max-w[248px] w-full'>
                  <div>
                    <img className='w-full h-[250px] object-contain' src={el.thumbnail} alt="" />
                  </div>
                  <h1 className='line-clamp-1'>
                    {el.title}
                  </h1>
                  <p className='mt-2'>{el.price}</p>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage