import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../AuthProvider/Authprovider";
import { useNavigate } from "react-router-dom";

const Addproduct = () => {
    const { user } = useAuth();
    const navigate = useNavigate()



    useEffect(() => {
        const loggedInUserEmail = `${user?.email}`;
        setFormData((prev) => ({
            ...prev,
            email: loggedInUserEmail,
        }));
    }, []);

    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        email: "",
        image: null,
    });




    const [loading, setLoading] = useState(false);

    const imgbbApikey = '388c794c9b95d21a340b9a471a96b087';

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Step 1: Upload image to ImgBB
            const imgData = new FormData();
            imgData.append("image", formData.image);

            const imgbbResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApikey}`,
                imgData
            );

            const imageUrl = imgbbResponse.data.data.url; // Extract the uploaded image URL

            // Step 2: Send form data + image URL to your server
            const productData = {
                productName: formData.productName,
                description: formData.description,
                email: formData.email,
                imageUrl, // Save the image URL in your server
            };

            const response = await axios.post('http://localhost:5000/products', productData);

            console.log("Response:", response.data);
            alert("Product added successfully!");
            navigate('/dashboard/myproducts/email')

        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 ">
            <div className="card w-full max-w-lg shadow-lg bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Add Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Product Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input
                                type="text"
                                name="productName"
                                placeholder="Enter product name"
                                className="input input-bordered w-full"
                                value={formData.productName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                placeholder="Enter product description"
                                className="textarea textarea-bordered w-full"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={formData.email}
                                onChange={handleChange}
                                readOnly 
                                required
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Image</span>
                            </label>
                            <input
                                type="file"
                                name="image"
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Addproduct;
