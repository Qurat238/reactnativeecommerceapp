import { createReducer, createAction } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "https://backend-gray-sigma.vercel.app";


//Actions

export const createOrderRequest = createAction("createOrderRequest");
export const createOrderSuccess = createAction("createOrderSuccess");
export const createOrderFail = createAction("createOrderFail");

export const myOrdersRequest = createAction("myOrdersRequest");
export const myOrdersSuccess = createAction("myOrdersSuccess");
export const myOrdersFail = createAction("myOrdersFail");

export const allOrdersRequest = createAction("allOrdersRequest");
export const allOrdersSuccess = createAction("allOrdersSuccess");
export const allOrdersFail = createAction("allOrdersFail");

export const updateOrderRequest = createAction("updateOrderRequest");
export const updateOrderSuccess = createAction("updateOrderSuccess");
export const updateOrderFail = createAction("updateOrderFail");
export const updateOrderReset = createAction("updateOrderReset");

export const deleteOrderRequest = createAction("deleteOrderRequest");
export const deleteOrderSuccess = createAction("deleteOrderSuccess");
export const deleteOrderFail = createAction("deleteOrderFail");
export const deleteOrderReset = createAction("deleteOrderReset");

export const orderDetailsRequest = createAction("orderDetailsRequest");
export const orderDetailsSuccess = createAction("orderDetailsSuccess");
export const orderDetailsFail = createAction("orderDetailsFail");

export const clearError = createAction("clearError");



// CREATE ORDER
export const createOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch(createOrderRequest());
        
        const config = {
            headers: {
                "Content-Type":"application/json",
            },
        };

        const {data} = await axios.post(`${serverUrl}/api/v1/order/new`,order,config);

        dispatch(createOrderSuccess(data));

    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
}

// My ORDERS
export const myOrders = () => async(dispatch, getState) => {
    try {
        dispatch(myOrdersRequest());
        
        const {data} = await axios.get(`${serverUrl}/api/v1/orders/me`);

        dispatch(myOrdersSuccess(data.orders));

    } catch (error) {
        dispatch(myOrdersFail(error.response.data.message));
    }
}

// Get All Orders(Admin)
export const getAllOrders = () => async(dispatch, getState) => {
    try {
        dispatch(allOrdersRequest());
        
        const {data} = await axios.get(`${serverUrl}/api/v1/admin/orders`);

        dispatch(allOrdersSuccess(data.orders));

    } catch (error) {
        dispatch(allOrdersFail(error.response.data.message));
    }
}

// UPDATE ORDER
export const updateOrder = (id,order) => async(dispatch, getState) => {
    try {
        dispatch(updateOrderRequest());
        
        const config = {
            headers: {
                "Content-Type":"application/json",
            },
        };

        const {data} = await axios.put(`${serverUrl}/api/v1/admin/order/${id}`,order,config);

        dispatch(updateOrderSuccess(data.success));

    } catch (error) {
        dispatch(updateOrderFail(error.response.data.message));
    }
}

// DELETE ORDER
export const deleteOrder = (id) => async(dispatch, getState) => {
    try {
        dispatch(deleteOrderRequest());

        const {data} = await axios.delete(`${serverUrl}/api/v1/admin/order/${id}`);

        dispatch(deleteOrderSuccess(data.success));

    } catch (error) {
        dispatch(deleteOrderFail(error.response.data.message));
    }
}

// GET ORDER DETAILS
export const getOrderDetails = (id) => async(dispatch) => {
    try {
        dispatch(orderDetailsRequest());
        
        const {data} = await axios.get(`${serverUrl}/api/v1/order/${id}`);

        dispatch(orderDetailsSuccess(data.order));

    } catch (error) {
        dispatch(orderDetailsFail(error.response.data.message));
    }
}

// CLEARING ERRORS
export const clearErrors = () => async(dispatch) => {
    dispatch(clearError());
};



export const newOrderReducer = createReducer(
    {}, (builder) => {
      builder
      .addCase(createOrderRequest, (state) => {
          state.loading = true;
      })
      .addCase(createOrderSuccess, (state,action) => {
          state.loading = false;
          state.order = action.payload;
      })
      .addCase(createOrderFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );


  export const myOrdersReducer = createReducer(
    {orders:[]}, (builder) => {
      builder
      .addCase(myOrdersRequest, (state) => {
          state.loading = true;
      })
      .addCase(myOrdersSuccess, (state,action) => {
          state.loading = false;
          state.orders = action.payload;
      })
      .addCase(myOrdersFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );

  export const allOrdersReducer = createReducer(
    {orders:[]}, (builder) => {
      builder
      .addCase(allOrdersRequest, (state) => {
          state.loading = true;
      })
      .addCase(allOrdersSuccess, (state,action) => {
          state.loading = false;
          state.orders = action.payload;
      })
      .addCase(allOrdersFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );

  export const orderReducer = createReducer(
    {}, (builder) => {
      builder
      .addCase(updateOrderRequest, (state) => {
          state.loading = true;
      })
      .addCase(updateOrderSuccess, (state,action) => {
          state.loading = false;
          state.isUpdated = action.payload;
      })
      .addCase(updateOrderFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(updateOrderReset, (state,action) => {
        state.isUpdated = false;
    })
    .addCase(deleteOrderRequest, (state) => {
        state.loading = true;
    })
    .addCase(deleteOrderSuccess, (state,action) => {
        state.loading = false;
        state.isDeleted = action.payload;
    })
    .addCase(deleteOrderFail, (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(deleteOrderReset, (state,action) => {
      state.isDeleted = false;
  })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );


  export const orderDetailsReducer = createReducer(
    {order:{}}, (builder) => {
      builder
      .addCase(orderDetailsRequest, (state) => {
          state.loading = true;
      })
      .addCase(orderDetailsSuccess, (state,action) => {
          state.loading = false;
          state.order = action.payload;
      })
      .addCase(orderDetailsFail, (state,action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(clearError, (state) => {
          state.error = null;
      })
    }
  );

