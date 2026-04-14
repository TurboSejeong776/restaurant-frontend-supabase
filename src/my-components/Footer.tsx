import logo from '@/assets/RestoLogo.png';
import fb from '@/assets/SocialMedia/facebook.png';
import ins from '@/assets/SocialMedia/Instagram.png';
import link from '@/assets/SocialMedia/LinkedIn.png';
import tiktok from '@/assets/SocialMedia/TikTok.png';

const Footer = () => {
  return (
    <section
      id='baseFooterBody'
      className='flex flex-col sm:flex-row w-full h-[620px] border-top-[1px] border-[#D5D7DA] px-[16px] py-[40px] gap-[24px] bg-[#0A0D12] sm:px-[120px] sm:py-[80px] justify-evenly'
    >
      <div className='flex flex-col w-full sm:w-[380px] h-[224px] sm:h-[284px] gap-[16px] sm:gap-[40px]'>
        <div className='flex flex-col w-full h-[120px] sm:h-[154px] gap-[22px]'>
          <div
            id='companyLogoSet'
            className='flex flex-row w-[149px] h-[42px] gap-[15px]'
          >
            <img
              src={logo}
              alt='companyLogoHere'
              className='w-[42px] h-[42px]'
            />
            <p className='font-extrabold text-[32px] text-white'>Foody</p>
          </div>
          <p className='text-sm sm:text-base tracking-tight text-white'>
            Enjoy homemade flavors & chef’s signature dishes, freshly prepared
            every day. Order online or visit our nearest branch.
          </p>
        </div>

        <div className='flex flex-col w-[196px] h-[88px] sm:h-[90px] gap-[20px]'>
          <p className='text-sm sm:text-base font-bold sm:font-extrabold tracking-tight sm:tracking-normal text-white'>
            Follow on Social Media
          </p>
          <div className='flex flex-row w-full h-[40px] gap-[12px]'>
            <img src={fb} alt='facebookLogo' className='w-[40px] h-[40px]' />
            <img src={ins} alt='instagramLogo' className='w-[40px] h-[40px]' />
            <img src={link} alt='linkedInLogo' className='w-[40px] h-[40px]' />
            <img src={tiktok} alt='tikTokLogo' className='w-[40px] h-[40px]' />
          </div>
        </div>
      </div>

      <div
        id='mobileFooterBottom'
        className='sm:hidden flex flex-row w-full h-[292px] gap-[16px]'
      >
        <div className='flex flex-col w-full gap-[16px] text-white text-sm tracking-tight'>
          <p className='font-extrabold tracking-normal'>Explore</p>
          <p>All Food</p>
          <p>Nearby</p>
          <p>Discount</p>
          <p>Best Seller</p>
          <p>Delivery</p>
          <p>Lunch</p>
        </div>

        <div className='flex flex-col w-full gap-[16px] text-white text-sm tracking-tight'>
          <p className='font-extrabold tracking-normal'>Help</p>
          <p>How to Order</p>
          <p>Payment Methods</p>
          <p>Track My Order</p>
          <p>FAQ</p>
          <p>Contact Us</p>
        </div>
      </div>

      <div
        id='desktopFooter1'
        className='hidden sm:flex flex-col w-[200px] gap-[20px] text-white text-sm sm:text-base tracking-tight'
      >
        <p className='font-extrabold tracking-normal'>Explore</p>
        <p>All Food</p>
        <p>Nearby</p>
        <p>Discount</p>
        <p>Best Seller</p>
        <p>Delivery</p>
        <p>Lunch</p>
      </div>

      <div
        id='desktopFooter2'
        className='hidden sm:flex flex-col w-[200px] gap-[20px] text-white text-sm sm:text-base tracking-tight'
      >
        <p className='font-extrabold tracking-normal'>Help</p>
        <p>How to Order</p>
        <p>Payment Methods</p>
        <p>Track My Order</p>
        <p>FAQ</p>
        <p>Contact Us</p>
      </div>
    </section>
  );
};

export default Footer;
