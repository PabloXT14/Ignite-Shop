import { styled } from '../../styles';
import { Swiper } from 'swiper/react';


export const SliderContainer = styled(Swiper, {
  '.swiper-wrapper': {
    display: 'flex',
    gap: 1, // só para o ProductSkeleton aparecer
  },

  ".swiper-slide": {
    maxWidth: 696,
  },

  '.swiper-button-prev': {
    // backgroundColor: 'red',
    color: '$white',
  },
  '.swiper-button-next': {
    color: '$white',
  },
})
