
import img from "assets/images/arbisoftimages-200737-1_suite_hotelthenewalgarb_galeria-image.jpg"
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath: img,
    },
    {
        label: 'Bird',
        imgPath: img,
    },
    {
        label: 'Bali, Indonesia',
        imgPath: img,
    },
    {
        label: 'Goč, Serbia',
        imgPath: img,
    },
];

export function Slider() {
   return(
       <Carousel autoFocus={true} showThumbs={false} showStatus={false} useKeyboardArrows  className="presentation-mode" width="300px">
           <div >
               <img src={img} />
               <p className="legend">Legend 1</p>
           </div>
           <div >
               <img src={img} />
               <p className="legend">Legend 2</p>
           </div>
           <div >
               <img src={img} />
               <p className="legend">Legend 3</p>
           </div>
       </Carousel>
   )
}
