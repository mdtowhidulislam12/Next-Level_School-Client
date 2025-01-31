import React, { useEffect, useState } from 'react';
import SectionTitle from '../../Components/Shared/SectionTitle';
import { Link } from 'react-router-dom';
import { BiDislike, BiLike } from 'react-icons/bi';
import axios from 'axios';

const FeaturesProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [likedProducts, setLikedProducts] = useState({});
    const [dislikedProducts, setDislikedProducts] = useState({});

    const handleLike = async (productId) => {
        if (dislikedProducts[productId]) {
            setDislikedProducts(prev => ({ ...prev, [productId]: false }));
        }

        if (!likedProducts[productId]) {
            setLikedProducts(prev => ({ ...prev, [productId]: true }));

            try {
                const updatedProducts = products.map(product =>
                    product._id === productId
                        ? { ...product, likes: (product.likes || 0) + 1 }
                        : product
                );
                setProducts(updatedProducts);

                await axios.post(`http://localhost:5000/products/${productId}/like`);
            } catch (error) {
                console.error('Error updating like:', error);
            }
        } else {
            setLikedProducts(prev => ({ ...prev, [productId]: false }));

            try {
                const updatedProducts = products.map(product =>
                    product._id === productId
                        ? { ...product, likes: (product.likes || 0) - 1 }
                        : product
                );
                setProducts(updatedProducts);

                await axios.post(`http://localhost:5000/products/${productId}/like`);
            } catch (error) {
                console.error('Error updating like:', error);
            }
        }
    };

    const handleDislike = async (productId) => {
        if (likedProducts[productId]) {
            setLikedProducts(prev => ({ ...prev, [productId]: false }));
        }

        if (!dislikedProducts[productId]) {
            setDislikedProducts(prev => ({ ...prev, [productId]: true }));

            try {
                const updatedProducts = products.map(product =>
                    product._id === productId
                        ? { ...product, dislikes: (product.dislikes || 0) + 1 }
                        : product
                );
                setProducts(updatedProducts);

                await axios.post(`http://localhost:5000/products/${productId}/dislike`);
            } catch (error) {
                console.error('Error updating dislike:', error);
            }
        } else {
            setDislikedProducts(prev => ({ ...prev, [productId]: false }));

            try {
                const updatedProducts = products.map(product =>
                    product._id === productId
                        ? { ...product, dislikes: (product.dislikes || 0) - 1 }
                        : product
                );
                setProducts(updatedProducts);

                await axios.post(`http://localhost:5000/products/${productId}/dislike`);
            } catch (error) {
                console.error('Error updating dislike:', error);
            }
        }
    };

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                const fetchedProducts = response.data.slice(0, 4).map(product => ({
                    ...product,
                    likes: product.likes || 0,
                    dislikes: product.dislikes || 0,
                }));
                setProducts(fetchedProducts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='my-5'>
            <SectionTitle title={'features Products'} subTitle={'All off Your favourite Products'}></SectionTitle>

            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-4'>
                {products.map(product => (
                    <div key={product._id} className='flex flex-col space-y-4 md:flex-row justify-between md:gap-4 bg-gray-100 items-center p-4 rounded-lg'>
                        <div className='min-w-20'>
                            <img src={product.imageUrl} alt={product.title} className='w-20 h-20 rounded-lg object-cover' />
                        </div>
                        <div className='space-y-6'>
                            <div className='max-h-20 overflow-hidden'>
                                <h2 className='text-blue-900 text-2xl font-bold uppercase'>{product.productName}</h2>
                                <p className=''>{product.description}</p>
                            </div>
                            <div>
                                <Link to={`/product/${product._id}`} className='text-blue-600 underline'>View Details</Link>
                            </div>
                        </div>
                        <div className='md:space-y-4 flex md:flex-col gap-4 items-center'>
                            <button onClick={() => handleLike(product._id)} className='btn btn-outline flex items-center gap-2'>
                                <div className="badge badge-secondary">{product.likes}</div>
                                <BiLike />
                            </button>
                            <button onClick={() => handleDislike(product._id)} className='btn btn-outline flex items-center gap-2'>
                                <BiDislike />
                                <div className="badge badge-secondary">{product.dislikes}</div>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className='w-fit mx-auto my-6'>
                <Link to={'/products'}><button className='uppercase font-semibold btn btn-outline border-b-4 border-purple-900'>Veiw All Products</button></Link>
            </div>

        </div>
    );
};

export default FeaturesProduct;
