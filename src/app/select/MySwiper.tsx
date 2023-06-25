
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//カルーセル用のタグをインポート
import { Swiper, SwiperSlide } from 'swiper/react';
//使いたい機能をインポート
import SwiperCore, { Pagination, Navigation } from 'swiper';
import React from 'react';

SwiperCore.use([Pagination, Navigation]);

// const images = [
//   'https://www.tripyhotellounge.xyz/wp-content/uploads/2022/10/Fukazawa050.jpg',
//   'https://s3-ap-northeast-1.amazonaws.com/thegate/2021/02/10/12/16/55/Korankei.jpg',
//   'https://mitsu-log.com/wp-content/uploads/2022/07/23008080_s-1.jpg',
//   'https://tori-dori.com/wp/wp-content/uploads/EBP15-44444.jpg',
// ];

type Props = {
  images: string[];
  className: string;
}

const MySwiper: React.FC<Props> = ({ images, className }) => {
return (
    <Swiper
      slidesPerView={1}   //一度に表示するスライドの数
      pagination={{
        clickable: true,
      }}   //　何枚目のスライドかを示すアイコン、スライドの下の方にある
      navigation   //スライドを前後させるためのボタン、スライドの左右にある
      loop={true}
      allowTouchMove={false}
    >
      {images.map((src: string, index: number) => {
        return (
          <SwiperSlide key={`${index}`}>
            <img className={className} src={src} alt="香嵐渓の写真" />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default MySwiper;
