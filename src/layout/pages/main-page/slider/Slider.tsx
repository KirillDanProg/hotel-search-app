import {useState} from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import {useAppSelector} from "../../../../common/hooks/redux-hooks";
import {selectHotelsImages} from "../../../../app/selectors";
import Box from "@mui/material/Box";
import "App.scss"

export function Carousel() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const images = useAppSelector(selectHotelsImages)

    return (
        <div style={{width: "100%"}}>
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={1}
                itemsToScroll={1}
                forwardBtnProps={{
                    className: "carouselBtnController",
                    children: <span>{`>`}</span>,
                }}
                backwardBtnProps={{
                    className: "carouselBtnController",
                    children: <span>{`<`}</span>,
                }}
                containerProps={{
                    className: "carouselContainer",
                }}
                responsiveProps={[
                    {
                        itemsToShow: 4,
                        itemsToScroll: 1,
                        minWidth: 1081,
                    },
                    {
                        itemsToShow: 3,
                        itemsToScroll: 1,
                        minWidth: 801,
                        maxWidth: 1080
                    },
                    {
                        itemsToShow: 2,
                        itemsToScroll: 1,
                        minWidth: 600,
                        maxWidth: 800
                    },
                ]}
                speed={400}
                easing="linear"
            >
                {
                    images.map((img, i) => {
                        return (
                            <HotelImage key={ i + img.url} urlImage={img.url}/>
                        )
                    })
                }
            </ReactSimplyCarousel>
        </div>
    );
}

const HotelImage = (props: { urlImage: string }) => {
    const imgStyle = {
        width: "150px",

        height: "100px",
        backgroundImage: `url(${props.urlImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: "10px"
    }
    const imgContainerStyle = {
        padding: "5px",
    }

    return (
        <Box sx={imgContainerStyle}>
            <Box sx={imgStyle}>
            </Box>
        </Box>
    )
}
