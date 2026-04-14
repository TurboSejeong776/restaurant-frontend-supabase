import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchRecommendations } from '@/api/restaurantService';
import type { Recommendation } from '@/types/RestoTypes';

import FilterCard from '@/reusables/FilterCard';
import RestoCard from '@/reusables/RestoCard';
import Searchbar from '@/my-components/Searchbar';

import { Button } from '@/components/button';

import All from '@/assets/Category/AllFood.png';
import Deli from '@/assets/Category/Delivery.png';
import Locate from '@/assets/Category/Location.png';
import Popular from '@/assets/Category/Popular.png';
import Rice from '@/assets/Category/Rice.png';
import Sale from '@/assets/Category/Sale.png';

const HomePage = () => {
  const [keyword, setKeyword] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchRecommendations(keyword);
      console.log('recommendations response:', data);
      setRecommendations(data);
    };

    load();
  }, [keyword]);
  const navigate = useNavigate();

  return (
    <section className='flex flex-col w-[393px] sm:w-screen min-h-screen sm:min-h-[2000px] bg-white items-center'>
      <div
        id='topHome'
        className="flex w-full h-[648px] bg-[url('/SUPERBURGERPICT.png')] bg-cover bg-center sm:h-[827px] justify-center"
      >
        <div
          id='topHomeHero'
          className='absolute flex flex-col w-[349px] h-[228px] mt-[210px] mx-auto gap-[24px] sm:w-[712px] sm:h-[200px] sm:gap-[40px] sm:mt-[326px] items-center'
        >
          <div
            id='topHomeHeroTitle'
            className='flex flex-col w-full h-[156px] gap-[4px] text-white sm:h-[104px] sm:gap-[8px]'
          >
            <p className='font-extrabold text-[36px] leading-[44px] text-center sm:text-[48px] sm:leading-[60px]'>
              Explore Culinary Experiences
            </p>
            <p className='font-bold text-lg tracking-tight text-center sm:text-[24px] sm:leading-[36px]'>
              Search and refine your choice to discover the perfect restaurant.
            </p>
          </div>
          <Searchbar keyword={keyword} setKeyword={setKeyword} />
        </div>
      </div>

      <div
        id='filterSelection'
        className='flex flex-wrap w-full h-[332px] px-[16px] py-[24px] gap-[20px] sm:w-[1200px] sm:h-[138px] sm:justify-between sm:gap-none items-center'
      >
        {/* All of these will go to All Restaurant Filter because backend doesn't provide enough context to sort by Discount, Best Seller, Delivery or whatever category Lunch is... */}
        <button onClick={() => navigate(`/Filter`)}>
          <FilterCard name='All Restaurant' image={All} />
        </button>
        <button onClick={() => navigate(`/Filter`)}>
          <FilterCard name='Nearby' image={Locate} />
        </button>
        <button onClick={() => navigate(`/Filter`)}>
          <FilterCard name='Discount' image={Sale} />
        </button>
        <button onClick={() => navigate(`/Filter`)}>
          <FilterCard name='Best Seller' image={Popular} />
        </button>
        <button onClick={() => navigate(`/Filter`)}>
          <FilterCard name='Delivery' image={Deli} />
        </button>
        <button onClick={() => navigate(`/Filter`)}>
          <FilterCard name='Lunch' image={Rice} />
        </button>
      </div>

      <div
        id='recommendedSection'
        className='flex flex-col sm:flex-row sm:flex-wrap w-full px-[16px] py-[24px] gap-[16px] sm:w-[1200px] sm:h-[822px] sm:gap-[32px]'
      >
        <div
          id='titleAndSeeAll'
          className='flex flex-row justify-between w-full h-[36px] font-extrabold sm:h-[40px]'
        >
          <p className='text-[24px] leading-[36px] text-black sm:text-[32px] sm:leading-[42px]'>
            Recommended
          </p>
          <Button
            onClick={() => navigate(`/Filter`)}
            className='bg-transparent text-base sm:text-lg sm:tracking-tight text-[#C12116]'
          >
            See All
          </Button>
        </div>
        <div className='sm:flex hidden flex-wrap w-full gap-[20px]'>
          {recommendations.map((resto) => (
            <button onClick={() => navigate(`/Detail/${resto.id}`)}>
              <RestoCard
                key={resto.id}
                resto={{
                  name: resto.name,
                  star: resto.star,
                  place: resto.place,
                  logo: resto.logo,
                  distance: resto.distance,
                }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className='sm:hidden mb-[48px]'>
        {recommendations.map((resto) => (
          <button onClick={() => navigate(`/Detail/${resto.id}`)}>
            <RestoCard
              key={resto.id}
              resto={{
                name: resto.name,
                star: resto.star,
                place: resto.place,
                logo: resto.logo,
                distance: resto.distance,
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HomePage;
