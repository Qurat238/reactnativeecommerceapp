import { createReducer, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "https://backend-gray-sigma.vercel.app";

//Actions

export const allProductRequest = createAction("allProductRequest");
export const allProductSuccess = createAction("allProductSuccess");
export const allProductFail = createAction("allProductFail");

export const adminProductRequest = createAction("adminProductRequest");
export const adminProductSuccess = createAction("adminProductSuccess");
export const adminProductFail = createAction("adminProductFail");

export const newProductRequest = createAction("newProductRequest");
export const newProductSuccess = createAction("newProductSuccess");
export const newProductFail = createAction("newProductFail");
export const newProductReset = createAction("newProductReset");

export const deleteProductRequest = createAction("deleteProductRequest");
export const deleteProductSuccess = createAction("deleteProductSuccess");
export const deleteProductFail = createAction("deleteProductFail");
export const deleteProductReset = createAction("deleteProductReset");

export const updateProductRequest = createAction("updateProductRequest");
export const updateProductSuccess = createAction("updateProductSuccess");
export const updateProductFail = createAction("updateProductFail");
export const updateProductReset = createAction("updateProductReset");

export const productDetailsRequest = createAction("productDetailsRequest");
export const productDetailsSuccess = createAction("productDetailsSuccess");
export const productDetailsFail = createAction("productDetailsFail");

export const newReviewRequest = createAction("newReviewRequest");
export const newReviewSuccess = createAction("newReviewSuccess");
export const newReviewFail = createAction("newReviewFail");
export const newReviewReset = createAction("newReviewReset");

export const allReviewRequest = createAction("allReviewRequest");
export const allReviewSuccess = createAction("allReviewSuccess");
export const allReviewFail = createAction("allReviewFail");

export const deleteReviewRequest = createAction("deleteReviewRequest");
export const deleteReviewSuccess = createAction("deleteReviewSuccess");
export const deleteReviewFail = createAction("deleteReviewFail");
export const deleteReviewReset = createAction("deleteReviewReset");

export const clearError = createAction("clearError");



export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings=0) => async(dispatch) => {
    try {
        dispatch(allProductRequest());
        let link = `${serverUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            link = `${serverUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }

        const {data} = await axios.get(link);

        dispatch(allProductSuccess(data));
    } 
    catch (error) {
        dispatch(allProductFail(error.response.data.message));
    }
};


//Get All Products(Admin)
export const getAdminProduct = () => async(dispatch) => {
    try {
        dispatch(adminProductRequest());
        const { data } = await axios.get(`${serverUrl}/api/v1/admin/products`);
        dispatch(adminProductSuccess(data.products));
    } catch (error) {
        dispatch(adminProductFail(error.response.data.message));
    }
};

//Create Product
export const  createProduct = (productData) => async(dispatch) => {
    try{ 
        dispatch(newProductRequest());

        const config = {
            headers : {
                "Content-Type":"multipart/form-data"
            }
        };
        const {data} = await axios.post(`${serverUrl}/api/v1/admin/product/new`, productData, config);

        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(newProductFail(error.response.data.message));
    }
};

//Delete Product
export const deleteProduct = (id) => async(dispatch) => {
    try{ 
        dispatch(deleteProductRequest());

        const {data} = await axios.delete(`${serverUrl}/api/v1/admin/product/${id}`);

        dispatch(deleteProductSuccess(data.success));
    } catch (error) {
        dispatch(deleteProductFail(error.response.data.message));
    }
};

//Update Product
export const  updateProduct = (id,productData) => async(dispatch) => {
    try{ 
        dispatch(updateProductRequest());

        const config = {
            headers : {
                "Content-Type":"multipart/form-data"
            }
        };

        const {data} = await axios.put(`${serverUrl}/api/v1/admin/product/${id}`, productData, config);

        dispatch(updateProductSuccess(data.success));
    } catch (error) {
        dispatch(updateProductFail(error.response.data.message));
    }
};

//Get Product Details
export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch(productDetailsRequest());

        const {data} = await axios.get(`${serverUrl}/api/v1/product/${id}`);

        dispatch(productDetailsSuccess(data.product));
    } catch (error) {
        dispatch(productDetailsFail(error.response.data.message));
    }
};

//New Review
export const  newReview = (reviewData) => async(dispatch) => {
    try{ 
        dispatch(newReviewRequest());

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const {data} = await axios.put(`${serverUrl}/api/v1/review`, reviewData, config);

        dispatch(newReviewSuccess(data.success));
    } catch (error) {
        dispatch(newReviewFail(error.response.data.message));
    }
};

//Get All Reviews Of a Product
export const  getAllReviews = (id) => async(dispatch) => {
    try{ 
        dispatch(allReviewRequest());

        const {data} = await axios.get(`${serverUrl}/api/v1/reviews?id=${id}`);

        dispatch(allReviewSuccess(data.reviews));
    } catch (error) {
        dispatch(allReviewFail(error.response.data.message));
    }
};

//Delete Review Of a Product
export const  deleteReviews = (reviewId, productId) => async(dispatch) => {
    try{ 
        dispatch(deleteReviewRequest());

        const {data} = await axios.delete(`${serverUrl}/api/v1/reviews?id=${reviewId}&productId=${productId}`);

        dispatch(deleteReviewSuccess(data.success));
    } catch (error) {
        dispatch(deleteReviewFail(error.response.data.message));
    }
};

//Clearing Errors
export const  clearErrors= () => async(dispatch) => {
    dispatch(clearError());
}



export const productsReducer = createReducer(
    {products:[]}, (builder) => {
      builder
        .addCase(allProductRequest, (state) => {
          state.loading = true;
          state.products = [];
        })
        .addCase(allProductSuccess, (state, action) => {
          state.loading = false;
          state.products = action.payload.products;
          state.productsCount = action.payload.productsCount;
          state.resultPerPage = action.payload.resultPerPage;
          state.filteredProductsCount = action.payload.filteredProductsCount;
        })
        .addCase(allProductFail, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(adminProductRequest, (state) => {
          state.loading = true;
          state.products = [];
        })
        .addCase(adminProductSuccess, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(adminProductFail, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(clearError, (state) => {
          state.error = null;
        })
    }
  );

  export const newProductReducer = createReducer(
    {product:{}}, (builder) => {
      builder
      .addCase(newProductRequest, (state) => {
          state.loading = true;
      })
      .addCase(newProductSuccess, (state,action) => {
          state.loading = false;
          state.success = action.payload.success;
          state.product = action.payload.product;
      })
      .addCase(newProductFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(newProductReset, (state) => {
          state.success = false;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );

  export const productReducer = createReducer(
    {}, (builder) => {
      builder
      .addCase(deleteProductRequest, (state) => {
          state.loading = true;
      })
      .addCase(deleteProductSuccess, (state,action) => {
          state.loading = false;
          state.isDeleted = action.payload;
      })
      .addCase(deleteProductFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(deleteProductReset, (state) => {
          state.isDeleted = false;
      })
      .addCase(updateProductRequest, (state) => {
        state.loading = true;
    })
    .addCase(updateProductSuccess, (state,action) => {
        state.loading = false;
        state.isUpdated = action.payload;
    })
    .addCase(updateProductFail, (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(updateProductReset, (state) => {
        state.isUpdated = false;
    })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );

  export const productDetailsReducer = createReducer(
    {product:{}}, (builder) => {
      builder
      .addCase(productDetailsRequest, (state) => {
          state.loading = true;
      })
      .addCase(productDetailsSuccess, (state,action) => {
          state.loading = false;
          state.product = action.payload;
      })
      .addCase(productDetailsFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );

  export const newReviewReducer = createReducer(
    {}, (builder) => {
      builder
      .addCase(newReviewRequest, (state) => {
          state.loading = true;
      })
      .addCase(newReviewSuccess, (state,action) => {
          state.loading = false;
          state.success = action.payload;
      })
      .addCase(newReviewFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(newReviewReset, (state) => {
          state.success = false;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );

  export const productReviewsReducer = createReducer(
    {reviews:[]}, (builder) => {
      builder
      .addCase(allReviewRequest, (state) => {
          state.loading = true;
      })
      .addCase(allReviewSuccess, (state,action) => {
          state.loading = false;
          state.reviews = action.payload;
      })
      .addCase(allReviewFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );

  export const reviewReducer = createReducer(
    {}, (builder) => {
      builder
      .addCase(deleteReviewRequest, (state) => {
          state.loading = true;
      })
      .addCase(deleteReviewSuccess, (state,action) => {
          state.loading = false;
          state.isDeleted = action.payload;
      })
      .addCase(deleteReviewFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(deleteReviewReset, (state) => {
          state.isDeleted = false;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );
