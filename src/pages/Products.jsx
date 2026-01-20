import React, { useState } from 'react';
import useTanstackGet from '../hook/useTanstackGet';
import { FaRegHeart } from 'react-icons/fa';
import { BsFillCartDashFill, BsFillCartPlusFill } from 'react-icons/bs';
import { GrView } from 'react-icons/gr';
import { addToCart, removeToCart } from '../features/cardSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Products =()=> {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart)
  const [brand, setBrand] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(30)
  const [skip, setSkip] = useState(0)
  const pages = [];
  const {data, isLoading} = useTanstackGet({url: "products/category-list", key:"category-lists"});
  const categoryList = data?.data; 

  
  
  const {data:categoryProducts} = useTanstackGet({
    url:`products${category === "" ? "": `/category/${category}`}?limit=${limit}&skip=${skip}`, 
    key: `${category}${skip}`
  })  
  const {data:brandProducts} = useTanstackGet({
    url: "products?limit=100", key:"brands"
  })
  const brandsArray = brandProducts?.data?.products || [];
  const brands = [...new Set(brandsArray?.map((el) => el.brand))]
  console.log(brand);

  // const filteredProducts = products?.filter((el)=> brands.includes(el.brand))
  
  
  const products = categoryProducts?.data?.products;
  const total = categoryProducts?.data?.total;
  const pageCount = Math.ceil(total / limit)

  for(let i = 1; i <= pageCount; i++){
    pages.push(i);
  }

  
  
  return (
    <section>
      <div className='container flex flex-col sm:flex-row gap-3 mx-auto px-2 md:px-0 2xl:px-33 w-full mt-[130px]'>
        <div className="max-w-[312px] w-full bg-white p-4 space-y-6">
          <div className='max-h-[317px] overflow-y-auto'>
            <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">Category</h3>
            <label className='flex items-center gap-2 px-3 py-2 cursor-pointer'>
                  <input 
                  type="radio"
                  name='category' 
                  value={""} 
                  className='w-4 h-4 text-blue-500 accent-blue-500' 
                  onChange={(el) =>{setSkip(0), setCategory(el.target.value)}} />
                  <span className='text-sm text-gray-700 uppercase'>All</span>
                </label>
              {categoryList?.map((el) => (
                <label className='flex items-center gap-2 px-3 py-2 cursor-pointer'>
                  <input 
                  type="radio"
                  name='category' 
                  value={el} 
                  className='w-4 h-4 text-blue-500 accent-blue-500' 
                  onChange={(el) => {setCategory(el.target.value), setSkip(0)}} />
                  <span className='text-sm text-gray-700 uppercase'>{el}</span>
                </label>
              ))}
          </div>

          <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase">Popular Brands</h3>
        <div className="grid grid-cols-2 gap-2">
          {brands.map((el) => (
            <label 
            key={el}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                value={el}
                className="w-4 h-4 rounded text-orange-500 accent-orange-500"
                onChange={(e) => {
                  setBrand((prev) => {
                  return prev?.find((item) => item === e?.target?.value) ? prev?.filter((item)=> !(item === e?.target?.value)) : [...prev, e.target.value]
                  }),
                  setSkip(0)
                }}
              />
              <span className="text-xs">{el}</span>
            </label>
          ))}
        </div>
      </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {
              products?.map((el) =>(
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

          <div className="flex items-center justify-center gap-2 my-8">
            {/* Previous Button */}
            <button 
            onClick={()=> setSkip((prev) => prev - 30)}
            className={`${skip === 0 ? "hidden" : ""}flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors`}>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Prev</span>
            </button>

              {
                pages?.map((el)=>(
                  <button onClick={() => setSkip((el-1)*30)} className={`${(el-1)*30 === skip ? "bg-blue-600" :"bg-blue-400"} ${(el-1)*30 >= skip +60 ? "hidden" :""} w-10 h-10 rounded text-white font-medium transition-colors`}>
                      {el}
                  </button>
                ))
              }
            {/* Next Button */}
            <button 
            onClick={()=> setSkip((prev) => prev + 30)}
            className={`${skip === 180 ? "hidden" : ""}flex items-center gap-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors`}>
              <span className="text-sm font-medium">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
      </div>

      </div>
    </section>
  );
}

export default Products;