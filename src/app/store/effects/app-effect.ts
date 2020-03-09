import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { of, Observable } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import * as fromCustomersActions from "../actions/customer.action";
import { Action } from "@ngrx/store";
import { CustomerService } from "src/app/services/customer.service";
//import all requried services or any dependencies

@Injectable()
export class CustomerEffects {
  constructor(
    private action$: Actions,
    private customerServie: CustomerService
  ) {}

  // Cargar
  @Effect()
  loadCustomers$: Observable<Action> = this.action$.pipe(
    ofType(fromCustomersActions.LOAD_CUSTOMERS),
    switchMap(() =>
      this.customerServie.getCustomers().pipe(
        map(response => {
          return new fromCustomersActions.LoadCustomerSuccess(response);
        }),
        catchError(error =>
          of(new fromCustomersActions.LoadCustomerFail(error))
        )
      )
    )
  );

  // Editar
  @Effect()
  updateCustomers$: Observable<Action> = this.action$.pipe(
    ofType(fromCustomersActions.UPDATE_CUSTOMER),
    map((action: fromCustomersActions.UpdateCustomer) => action.payload),
    switchMap(payload =>
      this.customerServie.updateCustomer(payload).pipe(
        map(
          response => new fromCustomersActions.UpdateCustomerSuccess(response)
        ),
        catchError(error =>
          of(new fromCustomersActions.UpdateCustomerFail(error))
        )
      )
    )
  );

  // Agregar
  @Effect()
  addCustomers$: Observable<Action> = this.action$.pipe(
    ofType(fromCustomersActions.ADD_CUSTOMER),
    map((action: fromCustomersActions.AddCustomer) => action.payload),
    switchMap(payload =>
      this.customerServie.addCustomer(payload).pipe(
        map(response => new fromCustomersActions.AddCustomerSuccess(response)),
        catchError(error => of(new fromCustomersActions.AddCustomerFail(error)))
      )
    )
  );

  // Eliminar
  @Effect()
  deleteCustomers$: Observable<Action> = this.action$.pipe(
    ofType(fromCustomersActions.DELETE_CUSTOMER),
    map((action: fromCustomersActions.DeleteCustomer) => action.payload),
    switchMap(payload =>
      this.customerServie.deleteCustomer(payload).pipe(
        map(() => new fromCustomersActions.DeleteCustomerSuccess(payload)),
        catchError(error =>
          of(new fromCustomersActions.DeleteCustomerFail(error))
        )
      )
    )
  );
}
