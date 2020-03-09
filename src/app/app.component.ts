import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "./store"; // referencia al archivo index.ts de "store"
import { Customer } from "./models/customer.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  customers: Customer[];
  display: string = "none";
  isEditModeEnabled: boolean = false;
  person: Customer = {};

  constructor(private store: Store<fromStore.AppState>) {
    store.select(fromStore.getCustomers).subscribe(response => {
      this.customers = response;
    });

    store.select(fromStore.getCustomerById(2)).subscribe(response => {
      console.log(response);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new fromStore.LoadCustomer());
  }

  openModelDialog() {
    this.isEditModeEnabled = false;
    this.display = "block";
  }

  closeModal(myForm: NgForm) {
    myForm.reset();
    this.display = "none";
  }

  editClient(customer: Customer) {
    this.isEditModeEnabled = true;
    this.person = { ...customer }; // Copia del cliente seleccionado
    this.display = "block";
  }

  addCustomer(myForm: NgForm) {
    // Generando id del cliente
    let userId = new Date().getTime(); // tiempo en milisegundos
    let newCustomer = myForm.value;
    newCustomer["id"] = userId;
    if (newCustomer.name !== null && newCustomer !== undefined) {
      this.store.dispatch(new fromStore.AddCustomer(newCustomer));
      this.closeModal(myForm);
    }
  }

  updateCustomer(myForm: NgForm) {
    this.store.dispatch(new fromStore.UpdateCustomer(myForm.value));
    this.closeModal(myForm);
  }

  deleteClient(customerId) {
    if (customerId !== undefined) {
      if (confirm("¿Estás segur@ de borrar este usuatio?")) {
        this.store.dispatch(new fromStore.DeleteCustomer(customerId));
      }
    }
  }
}
