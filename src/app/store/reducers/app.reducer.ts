import * as fromCustomerActions from "../actions/customer.action";
import { Customer } from "src/app/models/customer.model";

// Modelo para los states
export interface CustomerState {
  data: Customer[]; // Lista de usuarios
  loaded: boolean;
  loading: boolean;
  error: string;
}

export const initState: CustomerState = {
  data: [],
  loaded: false,
  loading: false,
  error: ""
};

// Función reducer
export function reducer(
  state = initState,
  action: fromCustomerActions.CustomerActions
) {
  switch (action.type) {
    case fromCustomerActions.LOAD_CUSTOMERS:
      return { ...state, loading: true };

    case fromCustomerActions.LOAD_CUSTOMERS_SUCCESS:
      const data = action.payload; // Lista de clientes enviada por el api
      return { ...state, loading: false, loaded: true, data: data };

    case fromCustomerActions.LOAD_CUSTOMERS_FAIL:
      return { ...state, loading: false, loaded: false, error: action.payload };

    case fromCustomerActions.UPDATE_CUSTOMER_SUCCESS:
      let dataEdit = state.data.map(customer => {
        if (customer.id === action.payload.id) {
          return action.payload;
        } else {
          return customer;
        }
      });
      return {
        ...state,
        loading: false,
        loaded: true,
        data: dataEdit
      };

    case fromCustomerActions.UPDATE_CUSTOMER_FAIL:
      return { ...state, loading: false, loaded: false, error: action.payload };

    case fromCustomerActions.ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload]
      };

    case fromCustomerActions.ADD_CUSTOMER_FAIL:
      return { ...state, error: action.payload };

    case fromCustomerActions.DELETE_CUSTOMER_SUCCESS:
      const userId = action.payload;
      return {
        ...state,
        data: [
          ...state.data.filter(user => {
            user.id !== userId;
          })
        ]
      };

    case fromCustomerActions.DELETE_CUSTOMER_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// Creando selector que retorne la propiedad "data"
export const getCustomers = (state: CustomerState) => state.data;
export const getCustomersLoaded = (state: CustomerState) => state.loaded;
export const getCustomersLoading = (state: CustomerState) => state.loading;
export const getCustomersError = (state: CustomerState) => state.error;
