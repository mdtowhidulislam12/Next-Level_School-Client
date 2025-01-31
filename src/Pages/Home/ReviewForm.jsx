import React, { useState } from 'react';
import { useAuth } from '../../AuthProvider/Authprovider';
import ratingLottie from '../../Ratings.json';
import Lottie from 'lottie-react';
import SectionTitle from '../../Components/Shared/SectionTitle';
import axios from 'axios';

const ReviewForm = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const reviewData = {
                email: user.email,
                rating,
                comment,
                date: new Date(),
            };

            await axios.post('http://localhost:5000/reviews', reviewData);
            setMessage('Review submitted successfully!');


            setComment('');
            setRating(0);
            window.location.reload();

        } catch (error) {
            console.error('Error submitting review:', error);
            setMessage('Failed to submit the review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <SectionTitle
                title={"Don't forget to rate me!"}
                subTitle={"Your rating can inspire me"}
            ></SectionTitle>
            <form onSubmit={handleSubmit} className="md:flex justify-between items-center gap-6 p-4 md:p-6">
                <div>
                    <Lottie animationData={ratingLottie} loop={true}></Lottie>
                </div>
                <div className="w-full space-y-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        defaultValue={user?.email}
                        readOnly
                        className="input input-bordered w-full"
                    />
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <input
                                key={star}
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                onClick={() => handleRatingChange(star)}
                            />
                        ))}
                    </div>
                    <textarea
                        className="border-2 w-full rounded-lg min-h-40 p-4"
                        name="comment"
                        placeholder="Type your comment!"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="btn btn-outline w-full bg-gradient-to-tr from-purple-900 to-blue-800 text-white font-bold text-lg"
                        disabled={isSubmitting || !rating || !comment}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    {message && <p className="text-center text-green-500">{message}</p>}
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
