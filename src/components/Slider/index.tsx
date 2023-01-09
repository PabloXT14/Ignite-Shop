import { Navigation, A11y } from 'swiper';
import { SwiperSlide, SwiperProps } from 'swiper/react';
import { SliderContainer } from './styles';
import { IProduct } from '../../@types/ProductType';
import { Product, ProductFooter } from '../../styles/pages/home';
import Link from 'next/link';
import Image from 'next/image';
import { SpinnerLoading } from '../SpinnerLoading';
import { useState } from 'react';
import { formatteMoney } from '../../utils/formatter';
import { ButtonAddToCart } from '../ButtonAddToCart';
import { useShoppingCart } from 'use-shopping-cart';
import { ProductSkeleton } from '../ProductSkeleton';

import 'swiper/css';
import 'swiper/css/navigation';

interface SliderProps {
  products?: IProduct[];
}

export function Slider({ products }: SliderProps) {
  const sliderSettings: SwiperProps = {
    modules: [Navigation, A11y],
    spaceBetween: 48,
    slidesPerView: 2,
    navigation: true,
    draggable: true,
  }
  const [idProductClicked, setIdProductClicked] = useState('');
  const { addItem } = useShoppingCart();

  function handleAddingProductToCart(product: IProduct) {
    addItem(product);
  }

  return (
    <SliderContainer {...sliderSettings}>
      {
        products
          ? (
            products.map(product => {
              const priceWithTwoDecimals = product.price / 100;

              return (
                <SwiperSlide key={product.id}>
                  <Product>
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      prefetch={false}
                      onClick={() => setIdProductClicked(product.id)}
                    >
                      {idProductClicked === product.id && (<SpinnerLoading size="lg" className="spinnerLoading" />)}

                      <Image src={product.imageUrl} width={520} height={480} alt="" />
                    </Link>

                    <ProductFooter>
                      <div>
                        <strong>{product.name}</strong>
                        <span>
                          {formatteMoney(priceWithTwoDecimals)}
                        </span>
                      </div>

                      <ButtonAddToCart
                        size="lg"
                        bgColor="green"
                        iconColor="white"
                        onClick={() => handleAddingProductToCart(product)}
                      />
                    </ProductFooter>
                  </Product>
                </SwiperSlide>
              )
            })
          ) : (
            <>
              <SwiperSlide>
                <ProductSkeleton />
              </SwiperSlide>

              <SwiperSlide>
                <ProductSkeleton />
              </SwiperSlide>

              <SwiperSlide>
                <ProductSkeleton />
              </SwiperSlide>
            </>
          )
      }
    </SliderContainer>
  )
}
