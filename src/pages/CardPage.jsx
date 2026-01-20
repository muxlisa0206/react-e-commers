import { useDispatch, useSelector } from 'react-redux'
import { decrease, increase, removeProduct } from '../features/cardSlice';
import { Link } from 'react-router-dom';

const CardPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  console.log(cart);
  
  // Umumiy narxni hisoblash (chegirma bilan)
  const totalPrice = cart.reduce((sum, el) => {
    const discountedPrice = el.price - (el.price * el.discountPercentage / 100);
    return sum + (discountedPrice * (el.qty || 1));
  }, 0);

  return (
    <section className='py-4 md:py-8'>
      <div className='container mx-auto mt-[80px] md:mt-[120px] px-2 md:px-4 2xl:px-33'>
        <h1 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6'>Savat</h1>
        
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6'>
          {/* Mahsulotlar ro'yxati */}
          <div className='lg:col-span-2 space-y-3 md:space-y-4'>
            {
              cart.length === 0 ? (
                <p className='text-gray-500 text-center py-8'>Savat bo'sh</p>
              ) : (
                cart.map((el) => (
                  <div key={el.id} className='bg-white rounded-lg shadow-md p-3 md:p-4'>
                    {/* Mobile layout */}
                    <div className='flex flex-col md:hidden gap-3'>
                      <div className='flex items-start gap-3'>
                        <button 
                          onClick={() => dispatch(removeProduct(el.id))}
                          className='text-red-500 hover:text-red-700 font-bold text-lg mt-1'>
                          X
                        </button>
                        <img 
                          src={el.thumbnail} 
                          alt={el.title || "Mahsulot"} 
                          className='w-20 h-20 object-cover rounded'
                        />
                        <div className='flex-1'>
                          <h2 className='font-semibold text-base mb-1'>{el.title}</h2>
                          <div className='flex items-center gap-2 text-sm'>
                            <p className='line-through text-red-600'>${(el.price * (el.qty || 1)).toFixed(2)}</p>
                            <p className='font-bold text-gray-800'>
                              ${((el.price - el.price * el.discountPercentage/100) * (el.qty || 1)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className='flex items-center justify-between pt-2 border-t'>
                        <div className='flex items-center gap-2'>
                          <button 
                            onClick={() => dispatch(decrease(el.id))}
                            className='bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center font-bold text-lg'>
                            -
                          </button>
                          <span className='font-semibold min-w-[30px] text-center'>{el.qty || 1}</span>
                          <button 
                            onClick={() => dispatch(increase(el.id))}
                            className='bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center font-bold text-lg'>
                            +
                          </button>
                        </div>
                        <p className='text-lg font-bold text-blue-600'>
                          ${((el.price - el.price * el.discountPercentage/100) * (el.qty || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className='hidden md:flex items-center justify-between gap-4'>
                      <div className='flex items-center gap-4'>
                        <button 
                          onClick={() => dispatch(removeProduct(el.id))}
                          className='text-red-500 hover:text-red-700 font-bold text-xl'>
                          X
                        </button>
                        <img 
                          src={el.thumbnail} 
                          alt={el.title || "Mahsulot"} 
                          className='w-24 h-24 object-cover rounded'
                        />
                        <div>
                          <h2 className='font-semibold text-lg mb-2'>{el.title}</h2>
                          <p className='text-gray-600 mb-2'>${el.price}</p>
                        </div>
                      </div>
                      
                      <div className='flex items-center gap-4 lg:gap-8'>
                        <p className='font-bold line-through text-lg text-red-600 min-w-20 text-right'>
                          ${(el.price * (el.qty || 1)).toFixed(2)}
                        </p>
                        <p className='font-bold text-lg text-gray-800 min-w-20 text-right'>
                          ${el.price}
                        </p>
                        <div className='flex items-center gap-3'>
                          <button 
                            onClick={() => dispatch(decrease(el.id))}
                            className='bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center font-bold'>
                            -
                          </button>
                          <span className='font-semibold min-w-[30px] text-center'>{el.qty || 1}</span>
                          <button 
                            onClick={() => dispatch(increase(el.id))}
                            className='bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded flex items-center justify-center font-bold'>
                            +
                          </button>
                        </div>
                        <p className='text-lg font-bold min-w-[80px] text-right'>
                          ${((el.price - el.price * el.discountPercentage/100) * (el.qty || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )
            }
          </div>

          {/* Umumiy narx kartasi */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg shadow-md p-4 md:p-6 lg:sticky lg:top-4'>
              <h2 className='text-lg md:text-xl font-bold mb-3 md:mb-4'>Buyurtma xulosasi</h2>
              
              <div className='space-y-2 md:space-y-3 mb-3 md:mb-4'>
                <div className='flex justify-between text-gray-600 text-sm md:text-base'>
                  <span>Mahsulotlar soni:</span>
                  <span className='font-semibold'>{cart.length}</span>
                </div>
                <div className='flex justify-between text-gray-600 text-sm md:text-base'>
                  <span>Jami miqdor:</span>
                  <span className='font-semibold'>{cart.reduce((sum, el) => sum + (el.qty || 1), 0)}</span>
                </div>
              </div>

              <div className='border-t pt-3 md:pt-4 mb-4 md:mb-6'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg md:text-xl font-bold'>Jami:</span>
                  <span className='text-xl md:text-2xl font-bold text-blue-600'>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link to={"/order"} className='inline-block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 md:py-3 rounded-lg transition duration-200 text-sm md:text-base'>
                To'lovga o'tish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CardPage