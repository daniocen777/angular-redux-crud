import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
// Importando los reducers
import { StoreModule } from "@ngrx/store";
import { reducers, effects } from "./store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientModule } from "@angular/common/http"; // Http
import { EffectsModule } from "@ngrx/effects"; // Effects
// Módulos de angular
import { FormsModule } from "@angular/forms";
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [AppComponent, SearchPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot(effects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
