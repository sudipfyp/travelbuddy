import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import swal from "sweetalert";
import { MenuItem, Select } from "@mui/material";

const AddProduct = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  const userCheck = async () => {
    let data = await fetch("http://127.0.1:8000/user/usercheck", {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 200) {
      if (parsedData.role !== "seller") {
        swal(
          "Unauthorized Access",
          "You are not authorized to access this page",
          "error"
        );
        navigate("/login");
      }
      setUser(parsedData);
    }

    if (data.status === 403) {
      swal(
        "Unauthorized Access",
        "You are not authorized to access this page",
        "error"
      );

      navigate("/login");
    }
  };

  useEffect(() => {
    userCheck();
    document.title = "TravelBuddy ● Add Product";
  }, []);

  const [profile, setProfile] = useState("");

  const fetchData = async () => {
    let api = "http://127.0.1:8000/user/profile";
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();

    if (data.status === 401) {
      navigate("/login");
    }
    setProfile(parsedData[0]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [shop, setShop] = useState("");

  const fetchShop = async () => {
    let api = `http://127.0.1:8000/shop/detail/${profile.id}`;
    let data = await fetch(api, {
      method: "GET",
      credentials: "include",
    });

    let parsedData = await data.json();
    console.log(parsedData);
    setShop(parsedData[0]);
  };

  useEffect(() => {
    if (profile.id) {
      fetchShop();
    }
  }, [profile]);

  const [productname, setProductName] = useState("");
  const [productdescription, setProductDescription] = useState("");
  const [productprice, setProductPrice] = useState("");
  const [productimage, setProductImage] = useState("");
  const [productcategory, setProductCategory] = useState("");
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const addProduct = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", productname);
    formData.append("description", productdescription);
    formData.append("price", productprice);
    formData.append("image", productimage);
    formData.append("shop", shop.id);
    formData.append("tag", productcategory);

    let response = await fetch(
      `http://127.0.1:8000/shop/product/add/${shop.id}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Product added Successfully", "", "success");
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductCategory("");
      setRefresh((prev) => !prev);
    } else {
      swal("Failed to add", "", "error");
    }
  };

  useEffect(() => {
    if (shop.id) {
      const fetchProducts = async () => {
        let response = await fetch(
          `http://127.0.1:8000/shop/product/list/${shop.id}`
        );
        let parsedData = await response.json();
        let productData = parsedData;
        setProducts(productData);
      };

      fetchProducts();
    }
  }, [shop, refresh]);

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setProductCategory(product.tag);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDel(false);
  };

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpenDel(true);
  };

  const edit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", productname);
    formData.append("description", productdescription);
    formData.append("price", productprice);
    formData.append("image", productimage);
    formData.append("tag", productcategory);
    formData.append("shop", shop.id);

    let response = await fetch(
      `http://127.0.1:8000/shop/product/edit/${selectedProduct.id}`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Product Edited Successfully", "", "success");
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductCategory("");
      setRefresh((prev) => !prev);
      setOpen(false);
    } else {
      swal("Error", "Something went wrong", "error");
    }
  };

  const handleDelete = async (event) => {
    let response = await fetch(
      `http://127.0.1:8000/shop/product/delete/${selectedProduct.id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal("Product Deleted", "Product has been deleted successfully", "success");
      setRefresh((prev) => !prev);
    } else {
      console.log(parsedData);
      swal("Error", "Something went wrong", "error");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="tips-container">
        <div className="add-place-container">
          <form className="add-place-form" onSubmit={addProduct}>
            <h2>Add Product</h2>
            <br />

            <div className="place-column">
              <div className="place-row">
                <label htmlFor="name">Name:</label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productname}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className="place-row">
                <label htmlFor="price">Price:</label>
                <br />
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={productprice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="place-column">
              <div className="place-row">
                <label htmlFor="name">Category:</label>
                <br />
                <select
                  name=""
                  id=""
                  value={productcategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="popular">Popular</option>
                  <option value="handcrafted">Handcrafted</option>
                  <option value="decoration">Decoration</option>
                  <option value="clothing">Clothing</option>
                  <option value="ornament">Ornament</option>
                  <option value="historical">Historical</option>
                </select>
              </div>
              <div className="place-row">
                <label htmlFor="image">Image:</label>
                <br />
                <input
                  type="file"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
                <br />
              </div>
            </div>

            <label htmlFor="description">Description:</label>
            <br />
            <textarea
              type="text"
              id="description"
              name="description"
              value={productdescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />

            <input type="submit" value="Add Product" />
          </form>
        </div>

        <br />
        <br />
        <h2>Product List</h2>
        <br />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products && products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell component="th" scope="row">
                      {product.id}
                    </TableCell>
                    <TableCell align="right">
                      <img
                        src={product.image}
                        alt=""
                        height={100}
                      />
                    </TableCell>
                    <TableCell align="right">{product.name}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.description}</TableCell>
                    <TableCell align="right">{product.tag}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => handleClickOpen(product)}
                      >
                        Edit
                      </Button>
                      <br />
                      <br />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpen(product)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={8}>
                    No Products Yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Product Details</DialogTitle>
          <DialogContent>
            {selectedProduct && (
              <>
                Name
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  type="text"
                  fullWidth
                  value={productname}
                  onChange={(e) => setProductName(e.target.value)}
                />
                Price
                <TextField
                  margin="dense"
                  id="price"
                  type="text"
                  fullWidth
                  value={productprice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
                Tag
                <Select
                  margin="dense"
                  fullWidth
                  value={productcategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  <MenuItem value="popular">Popular</MenuItem>
                  <MenuItem value="handcrafted">Handcrafted</MenuItem>
                  <MenuItem value="decoration">Decoration</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="ornament">Ornament</MenuItem>
                  <MenuItem value="historical">Historical</MenuItem>
                </Select>
                Description
                <TextField
                  margin="dense"
                  id="description"
                  type="text"
                  fullWidth
                  value={productdescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
                Image
                <TextField
                  margin="dense"
                  id="image"
                  type="file"
                  fullWidth
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={edit}>Save</Button>
          </DialogActions>
        </Dialog>

        <Fragment>
          <Dialog
            open={openDel}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">Delete Product?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this product?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                No
              </Button>
              <Button
                autoFocus
                onClick={() => {
                  handleDelete(selectedProduct);
                  handleClose();
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      </div>

      <Footer />
    </div>
  );
};

export default AddProduct;
