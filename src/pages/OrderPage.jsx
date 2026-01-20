import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Home } from 'lucide-react';

const OrderPage = () => {
  const cart = useSelector((state) => state.cart);
  
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    country: 'Uzbekistan',
    region: '',
    city: '',
    zipCode: '',
    email: '',
    phone: '',
    shipToDifferent: false,
    nameOnCard: '',
    cardNumber: '',
    expireDate: '',
    cvc: '',
    orderNotes: ''
  });

  const regions = [
    'Tashkent', 'Andijan', 'Bukhara', 'Fergana', 'Jizzakh', 'Khorezm', 
    'Namangan', 'Navoiy', 'Kashkadarya', 'Samarkand', 'Sirdaryo', 
    'Surkhandarya', 'Tashkent Region', 'Karakalpakstan'
  ];

  const paymentMethods = [
    { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
    { id: 'venmo', name: 'Venmo', icon: '💳' },
    { id: 'paypal', name: 'Paypal', icon: '🅿️' },
    { id: 'amazon', name: 'Amazon Pay', icon: '🛒' },
    { id: 'debit', name: 'Debit/Credit Card', icon: '💳' }
  ];

  // Calculate prices
  const subtotal = cart.reduce((sum, el) => {
    const discountedPrice = el.price - (el.price * el.discountPercentage / 100);
    return sum + (discountedPrice * (el.qty || 1));
  }, 0);
  
//   const shipping = 0;
  const discount = 24;
  const tax = 61.99;
  const total = subtotal - discount + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Telegram'ga yuborish funksiyasi
  const sendToTelegram = async () => {
    const BOT_TOKEN = '8279071315:AAEjF3zN5h83G-aqx3oz6jYi2b0O8imcTDQ'; // Bu yerga bot tokeningizni qo'ying
    const CHAT_ID = '7593685089'; // Bu yerga chat ID ni qo'ying

    // Ma'lumotlarni formatlash
    let message = `🛒 *YANGI BUYURTMA*\n\n`;
    message += `👤 *Mijoz ma'lumotlari:*\n`;
    message += `Ism: ${formData.firstName} ${formData.lastName}\n`;
    if (formData.companyName) message += `Kompaniya: ${formData.companyName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Telefon: ${formData.phone}\n`;
    message += `Manzil: ${formData.address}\n`;
    message += `Viloyat: ${formData.region}\n`;
    message += `Shahar: ${formData.city}\n`;
    message += `Zip: ${formData.zipCode}\n\n`;

    message += `💳 *To'lov usuli:* ${paymentMethods.find(m => m.id === selectedPayment)?.name}\n\n`;

    message += `📦 *Buyurtma mahsulotlari:*\n`;
    cart.forEach((item, index) => {
      const itemPrice = (item.price - item.price * item.discountPercentage / 100).toFixed(2);
      message += `${index + 1}. ${item.title}\n`;
      message += `   Miqdor: ${item.qty} x $${itemPrice} = $${(itemPrice * item.qty).toFixed(2)}\n`;
    });

    message += `\n💰 *Narxlar:*\n`;
    message += `Subtotal: $${subtotal.toFixed(2)}\n`;
    message += `Yetkazib berish: Free\n`;
    message += `Chegirma: $${discount}\n`;
    message += `Soliq: $${tax.toFixed(2)}\n`;
    message += `*JAMI: $${total.toFixed(2)}*\n`;

    if (formData.orderNotes) {
      message += `\n📝 *Izoh:* ${formData.orderNotes}`;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        alert('✅ Buyurtma muvaffaqiyatli yuborildi!');
        // Formani tozalash
        setFormData({
          firstName: '',
          lastName: '',
          companyName: '',
          address: '',
          country: 'Uzbekistan',
          region: '',
          city: '',
          zipCode: '',
          email: '',
          phone: '',
          shipToDifferent: false,
          nameOnCard: '',
          cardNumber: '',
          expireDate: '',
          cvc: '',
          orderNotes: ''
        });
      } else {
        alert('❌ Xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Xatolik yuz berdi. Iltimos qayta urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  // Form validatsiya
  const handlePlaceOrder = () => {
    // Asosiy maydonlarni tekshirish
    if (!formData.firstName || !formData.lastName) {
      alert('⚠️ Iltimos ism va familiyangizni kiriting!');
      return;
    }
    if (!formData.email) {
      alert('⚠️ Iltimos email manzilingizni kiriting!');
      return;
    }
    if (!formData.phone) {
      alert('⚠️ Iltimos telefon raqamingizni kiriting!');
      return;
    }
    if (!formData.address) {
      alert('⚠️ Iltimos manzilingizni kiriting!');
      return;
    }
    if (!formData.region) {
      alert('⚠️ Iltimos viloyatni tanlang!');
      return;
    }
    if (cart.length === 0) {
      alert('⚠️ Savatingiz bo\'sh!');
      return;
    }

    // Agar hammasi to'g'ri bo'lsa, Telegram'ga yuborish
    sendToTelegram();
  };

  return (
    <div className='bg-gray-50 min-h-screen py-6'>
      <div className='container mx-auto px-4 max-w-7xl'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 text-sm mt-[125px] mb-6 text-gray-600'>
          <Home className='w-4 h-4' />
          <span>Home</span>
          <span>›</span>
          <span>Shopping Card</span>
          <span>›</span>
          <span className='text-blue-600 font-semibold'>Checkout</span>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Left Column - Forms */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Billing Information */}
            <div className='bg-white rounded-lg border-2 border-dashed border-blue-300 p-6'>
              <h2 className='text-xl font-bold mb-4 pb-3 border-b-2 border-dashed border-gray-200'>
                Billing Information
              </h2>
              
              <div className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>User name</label>
                    <input
                      type='text'
                      name='firstName'
                      placeholder='First name'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <input
                      type='text'
                      name='lastName'
                      placeholder='Last name'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mt-6'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>
                      Company Name <span className='text-gray-400 text-xs'>(Optional)</span>
                    </label>
                    <input
                      type='text'
                      name='companyName'
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium mb-1'>Address</label>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    required
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Country</label>
                    <select
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white'
                    >
                      <option>Uzbekistan</option>
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Region/State</label>
                    <select
                      name='region'
                      value={formData.region}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white'
                      required
                    >
                      <option value=''>Select...</option>
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>City</label>
                    <select
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white'
                    >
                      <option value=''>Select...</option>
                      {regions.map(region => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Zip Code</label>
                    <input
                      type='text'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Email</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Phone Number</label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      required
                    />
                  </div>
                </div>

                <div className='flex items-center gap-2 pt-2'>
                  <input
                    type='checkbox'
                    name='shipToDifferent'
                    id='shipToDifferent'
                    checked={formData.shipToDifferent}
                    onChange={handleInputChange}
                    className='w-4 h-4 text-blue-600 border-gray-300 rounded'
                  />
                  <label htmlFor='shipToDifferent' className='text-sm'>
                    Ship into different address
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Option */}
            <div className='bg-white rounded-lg border-2 border-dashed border-blue-300 p-6'>
              <h2 className='text-xl font-bold mb-4 pb-3 border-b-2 border-dashed border-gray-200'>
                Payment Option
              </h2>
              
              <div className='grid grid-cols-2 md:grid-cols-5 gap-3 mb-6'>
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      selectedPayment === method.id
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className='text-2xl mb-1'>{method.icon}</div>
                    <div className='text-xs font-medium text-gray-700'>{method.name}</div>
                    {selectedPayment === method.id && (
                      <div className='mt-2 w-6 h-6 mx-auto bg-orange-500 rounded-full flex items-center justify-center'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {selectedPayment === 'debit' && (
                <div className='space-y-4 pt-4 border-t-2 border-dashed border-gray-200'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Name on Card</label>
                    <input
                      type='text'
                      name='nameOnCard'
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Card Number</label>
                    <input
                      type='text'
                      name='cardNumber'
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder='1234 5678 9012 3456'
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium mb-1'>Expire Date</label>
                      <input
                        type='text'
                        name='expireDate'
                        value={formData.expireDate}
                        onChange={handleInputChange}
                        placeholder='DD/YY'
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-1'>CVC</label>
                      <input
                        type='text'
                        name='cvc'
                        value={formData.cvc}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500'
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className='bg-white rounded-lg border-2 border-dashed border-blue-300 p-6'>
              <h2 className='text-xl font-bold mb-4 pb-3 border-b-2 border-dashed border-gray-200'>
                Additional Information
              </h2>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Order Notes <span className='text-gray-400 text-xs'>(Optional)</span>
                </label>
                <textarea
                  name='orderNotes'
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  placeholder='Notes about your order, e.g. special notes for delivery'
                  rows='4'
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none'
                />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg border-2 border-dashed border-blue-300 p-6 sticky top-6'>
              <h2 className='text-xl font-bold mb-4 pb-3 border-b-2 border-dashed border-gray-200'>
                Order Summary
              </h2>
              
              {/* Products */}
              <div className='space-y-3 mb-4 max-h-60 overflow-y-auto'>
                {cart.length === 0 ? (
                  <p className='text-gray-500 text-center py-4'>No items in cart</p>
                ) : (
                  cart.map((el) => (
                    <div key={el.id} className='flex gap-3 pb-3 border-b border-gray-100 last:border-0'>
                      <img
                        src={el.thumbnail}
                        alt={el.title}
                        className='w-16 h-16 object-cover rounded border'
                      />
                      <div className='flex-1 min-w-0'>
                        <h3 className='text-sm font-medium truncate'>{el.title}</h3>
                        <p className='text-sm text-gray-600'>
                          {el.qty || 1} x ${((el.price - el.price * el.discountPercentage / 100)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Price breakdown */}
              <div className='space-y-2 mb-4 border-t-2 border-dashed border-gray-200 pt-4'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Sub-total</span>
                  <span className='font-semibold'>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className='font-semibold text-green-600'>Free</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Discount</span>
                  <span className='font-semibold'>${discount}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Tax</span>
                  <span className='font-semibold'>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className='flex justify-between items-center text-lg font-bold border-t-2 border-dashed border-gray-200 pt-4 mb-6'>
                <span>Total</span>
                <span className='text-xl'>${total.toFixed(2)} USD</span>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className='w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-md transition duration-200 flex items-center justify-center gap-2 uppercase text-sm'
              >
                {loading ? 'YUBORILMOQDA...' : 'PLACE ORDER'}
                {!loading && <span>→</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;