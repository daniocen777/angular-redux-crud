// Referencia a "app.reducer"
import * as fromCustomerReducer from "./app.reducer";
import { createFeatureSelector, createSelector } from '@ngrx/store';

// Estado de toda la aplicación (modelo)
export interface AppState {
  /* Estados de toda la aplicación */
  // Dando estado
  customers: fromCustomerReducer.CustomerState; // tipado
}

export const reducers = {
  customers: fromCustomerReducer.reducer
};

export const getState = state => state; // Acceso a todas los estados
// Acceso a customers
export const getCustomersState = createFeatureSelector<fromCustomerReducer.CustomerState>("customers");
// Acceso a la propiedad "data"
export const getCustomers = createSelector(getCustomersState, fromCustomerReducer.getCustomers);
// Acceso a un cliente por id
export const getCustomerById = (id) => createSelector(getCustomers, (customers) => {
  if (getCustomers) {
    var customerFound = customers.find(persona => {
      return persona.id === id;
    })
    return customerFound || {};
  } else {
    return {};
  }

});
