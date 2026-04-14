import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import HomePage from './page-folder/homepage';
import Detail from './page-folder/detail';
import Filter from './page-folder/filterpage';
import Cart from './page-folder/cart';
import Checkout from './page-folder/checkout';
import PaySucc from './page-folder/paysucc';
import MyOrder from './page-folder/myorder';
import LogRegi from './page-folder/logregi';
import Navbar from './my-components/Navbar';
import Footer from './my-components/Footer';

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const hideHF = ['/'];
  const showHeadFoot = !hideHF.includes(location.pathname);

  return (
    <section className='font-nunito'>
      {showHeadFoot && <Navbar />}
      <Toaster
        richColors
        className='w-full h-[40px] px-[12px] py-[8px] gap-[8px] rounded-[8px]'
      />
      <Routes>
        <Route path='/' element={<LogRegi />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Detail/:id' element={<Detail />} />
        <Route path='/Filter' element={<Filter />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Checkout' element={<Checkout />} />
        <Route path='/Receipt' element={<PaySucc />} />
        <Route path='/MyOrder' element={<MyOrder />} />
      </Routes>
      {showHeadFoot && <Footer />}
    </section>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
