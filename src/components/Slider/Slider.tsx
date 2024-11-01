import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { SliderProps } from 'components/Slider/Slider.props.ts';
import type { Swiper as SwiperClass } from 'swiper/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { cardActions } from '../../store/card.slice.ts';
import styles from './Slider.module.css';
import { useRef } from 'react';

function Slider({
  slides,
  paginationOptions,
  setActiveIndexImage
}: SliderProps) {
  const { activeCard } = useSelector((s: RootState) => s.card);
  const dispatch = useDispatch<AppDispatch>();

  const handlerSlideChange = (swiper: SwiperClass) => {
    dispatch(cardActions.changeActiveCard(swiper.activeIndex));
    setActiveIndexImage(swiper.activeIndex);
  };

	const sliderRef = useRef;

	// console.log(sliderRef.current)

  return (
    <Swiper
		  ref={sliderRef}
      modules={[Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: paginationOptions?.clickable ?? false }}
      initialSlide={activeCard}
      onSlideChange={swiper => handlerSlideChange(swiper)}
    >
      {slides.map((slide, index) => {
        if (typeof slide === 'string') {
          return (
            <SwiperSlide
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}
              key={index}
            >
              <img
                className={styles['slide']}
                src={slide}
                alt="слайд"
              />
            </SwiperSlide>
          );
        } else {
          return (
            <SwiperSlide key={index} className={styles['test']}>
              <>{slide}</>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
}

export default Slider;
