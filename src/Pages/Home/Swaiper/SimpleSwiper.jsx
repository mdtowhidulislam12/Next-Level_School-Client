import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";
import { Navigation, Pagination } from "swiper/modules";

const ReviewsSlider = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews using Axios
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/reviews");
        setReviews(response.data); // Assuming the API returns an array of reviews
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={30}
      slidesPerView={1}
      className="w-full max-w-3xl mx-auto"
    >
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <SwiperSlide key={review._id} className="flex justify-center">
            <div className="card bg-base-100 shadow-xl p-5 w-full ">
              <div className="card-body">
                <h4 className="card-title text-lg font-semibold">{review.email}</h4>
                <p className="text-yellow-500 font-bold">Rating: {review.rating} ★</p>
                <p className="text-gray-700">{review.comment}</p>
                <small className="text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </small>
              </div>
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide className="flex justify-center">
          <div className="text-center text-gray-500">Loading reviews...</div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default ReviewsSlider;
