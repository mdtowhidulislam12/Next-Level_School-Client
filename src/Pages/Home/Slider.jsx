import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Slider = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(response => {
                
                setProducts(response.data);
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
        <div>
            <div className="carousel carousel-end rounded-box">
                {products.map(product=>(<div key={product._id} className="carousel-item">
                    <img className='w-56' src={product.imageUrl} alt={product.title} />
                </div>) )}
                
                


               
            </div>
        </div>
    );
};

export default Slider;