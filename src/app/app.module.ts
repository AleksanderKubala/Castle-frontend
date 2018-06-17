import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CityMapComponent } from './components/city-map/city-map.component';
import { WorldMapComponent } from './components/world-map/world-map.component';
import {EventService} from './services/internal-services/event-service/event.service';
import {ImageMapperService} from './services/internal-services/image-mapper-service/image-mapper.service';
import {TerrainService} from './services/external-services/model-services/terrain-type-service/terrain-type.service';
import {BuildingTypeService} from './services/external-services/model-services/building-type-service/building-type.service';
import {StructureTypeService} from './services/external-services/model-services/structure-type-service/structure-type.service';
import {Urls} from './_config/server-urls';
import {WorldService} from './services/external-services/model-services/world-service/world.service';
import {CityService} from './services/external-services/model-services/city-service/city.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MDBBootstrapModule } from '../../node_modules/angular-bootstrap-md';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {LoginService} from './services/external-services/game-services/login_service/login.service';
import { WorldTileComponent } from './components/world-tile/world-tile.component';
import { CityTileComponent } from './components/city-tile/city-tile.component';
import {CityManagementService} from './services/external-services/game-services/city-management/city-management.service';
import {UserInfoService} from './services/internal-services/user-info-service/user-info.service';
import {ResourceService} from './services/external-services/model-services/resource-service/resource.service';
import {UpdateService} from './services/external-services/game-services/update-service/update.service';
import { UpdateComponent } from './components/update/update.component';
import {UnitService} from './services/external-services/model-services/unit-service/unit.service';
import { CastleComponent } from './components/castle/castle.component';
import {RecruitmentService} from './services/external-services/game-services/recruitment-service/recruitment.service';
import { StructureDetailComponent } from './components/structure-detail/structure-detail.component';
import {WebsocketService} from './services/external-services/game-services/websocket-service/websocket.service';
import {BattleService} from './services/external-services/game-services/battle-service/battle.service';
import {SettlementService} from './services/external-services/game-services/settlement-service/settlement.service';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from './services/external-services/game-services/auth-service/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    SlidePanelComponent,
    CityMapComponent,
    WorldMapComponent,
    LoginComponent,
    WorldTileComponent,
    CityTileComponent,
    UpdateComponent,
    CastleComponent,
    StructureDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    EventService,
    ImageMapperService,
    TerrainService,
    BuildingTypeService,
    StructureTypeService,
    Urls,
    WorldService,
    CityService,
    LoginService,
    CityManagementService,
    UserInfoService,
    ResourceService,
    UpdateService,
    UnitService,
    RecruitmentService,
    WebsocketService,
    BattleService,
    SettlementService,
    FlashMessagesService,
    AuthService,
    HttpClient
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
