import { Modal, ModalBody } from "react-bootstrap"
import { useState } from "react";
import AxiosRepository from "../axiosRepo/axiosRepository";


function AddProduct( {isOpen, close, editingProduct} ) {

    const [formData, setFormData] = useState({
        productName: editingProduct?.productName,
        productCode: editingProduct?.productCode,
        price: editingProduct?.price,
        productCategoryName: editingProduct?.productCategoryName,
        productBrand: editingProduct?.productBrand,
        deliveryLocation: "",
        productDescription: editingProduct?.productDescription,
        specifications : ""
    });

    const [modalIsOpen, setModalIsOpen] = useState(isOpen)

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await AxiosRepository.addProduct(formData).then(result=>console.log(result));
        } catch (error) {
          console.error("Registration failed:", error);
        }
      };

    const handleClose = () => setModalIsOpen(false);
    const handleShow = () => setModalIsOpen(true);


    return(
        <Modal show={isOpen} onHide={close}>
            <ModalBody>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="mb-0">Registration Form</h4>
                            </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">
                                        Product Name
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="productName"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productCode" className="form-label">
                                        Product Code
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="productCode"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">
                                        Product Price
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productCategoryName" className="form-label">
                                        Product Category
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="productCategoryName"
                                    name="productCategoryName"
                                    value={formData.productCategoryName}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productBrand" className="form-label">
                                        Product Brand
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="productBrand"
                                    name="productBrand"
                                    value={formData.productBrand}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="deliveryLocation" className="form-label">
                                        Delivery Location
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="deliveryLocation"
                                    name="deliveryLocation"
                                    value={formData.deliveryLocation}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productDescription" className="form-label">
                                        Description
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="productDescription"
                                    name="productDescription"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="specifications" className="form-label">
                                        Specifications
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    id="specifications"
                                    name="specifications"
                                    value={formData.specifications}
                                    onChange={handleChange}
                                    required
                                />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={close}>
                                    Submit
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </ModalBody>
        </Modal>





    )

}

export default AddProduct