import React from 'react';

const Carousel = () => {
    return (
        <div>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img
                        src="https://i.ibb.co.com/hmqxkBS/3.jpg"
                        className="w-full" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src="https://i.ibb.co.com/fqfKRKh/6.jpg"
                        className="w-full" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src="https://i.ibb.co.com/5KwMWJk/5.jpg"
                        className="w-full" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img
                        src="https://i.ibb.co.com/55C9KMg/4.jpg"
                        className="w-full" />
                </div>
                <div id="item5" className="carousel-item w-full">
                    <img
                        src="https://i.ibb.co.com/6vs7M2w/1.jpg"
                        className="w-full" />
                </div>
                <div id="item6" className="carousel-item w-full">
                    <img
                        src="https://i.ibb.co.com/NCQkvXL/2.jpg"
                        className="w-full" />
                </div>
                <div id="item7" className="carousel-item w-full">
                    <img
                        src="https://i.ibb.co.com/hmqxkBS/3.jpg"
                        className="w-full" />
                </div>
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
                <a href="#item5" className="btn btn-xs">5</a>
                <a href="#item6" className="btn btn-xs">6</a>
                <a href="#item7" className="btn btn-xs">7</a>
                
            </div>
        </div>
        //
// 
// 
// 
// 
// 
    );
};

export default Carousel;