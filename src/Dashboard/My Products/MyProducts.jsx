import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider/Authprovider';
import SectionTitle from '../../Components/Shared/SectionTitle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const userEmail = `${user.email}`;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:5000/products/email/${userEmail}`
                );
                setProducts(response.data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [userEmail]);

    const handleDelete = async (productId) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (!confirmed) return;

        try {
            await axios.delete(`http://localhost:5000/products/${productId}`);
            setProducts(products.filter((product) => product._id !== productId));
            alert("Product deleted successfully!");
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Failed to delete the product.");
        }
    };

    const handleUpdate = (productId) => {
        navigate(`/update-product/${productId}`);
    };

    return (
        <div>
            <SectionTitle title="My Products" />
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table min-w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Likes</th>
                                    <th>Dislikes</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id} className="text-sm">
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.productName}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.productName}</div>
                                                    <div className="text-xs opacity-50">
                                                        {product.description}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{product.likes}</td>
                                        <td>{product.dislikes}</td>
                                        <td>
                                            <span className="badge badge-warning text-xs">Pending</span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary text-xs px-3 py-1 mr-2"
                                                onClick={() => handleUpdate(product._id)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error text-xs px-3 py-1"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProducts;
