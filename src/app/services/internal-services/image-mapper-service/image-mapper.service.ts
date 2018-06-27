import {Injectable, OnInit} from '@angular/core';
import {BuildingTypeService} from '../../external-services/model-services/building-type-service/building-type.service';
import {TerrainService} from '../../external-services/model-services/terrain-type-service/terrain-type.service';
import {StructureTypeService} from '../../external-services/model-services/structure-type-service/structure-type.service';
import {AbstractService} from '../../abstract-service';
import {EventService} from '../event-service/event.service';
import {TileDetails} from '../../../classes/tile-details';
import {EXT, IMG_SOURCE, PLAYER, ENEMY} from '../../../_config/img-config';
import {isNullOrUndefined} from 'util';
import {BuildingType} from '../../../classes/building-type';
import {TerrainType} from '../../../classes/terrain-type';
import {StructureType} from '../../../classes/structure-type';
import {Resource} from '../../../classes/resource';
import {ResourceService} from '../../external-services/model-services/resource-service/resource.service';
import {BuildingTypeResponse} from '../../../responses/element-responses/building-type-response';
import {Production} from '../../../classes/production';
import {Requirement} from '../../../classes/requirement';
import {UnitService} from '../../external-services/model-services/unit-service/unit.service';
import {Unit} from '../../../classes/unit';
import {UnitResponse} from '../../../responses/element-responses/unit-response';

@Injectable()
export class ImageMapperService extends AbstractService {

  private buildingService: BuildingTypeService;
  private terrainService: TerrainService;
  private structureService: StructureTypeService;
  private resourceService: ResourceService;
  private unitService: UnitService;

  private terrains: TerrainType[];
  private mainBuilding: BuildingType;
  private buildings: BuildingType[];
  private structures: StructureType[];
  private resources: Resource[];
  private units: Unit[];

  constructor(
    protected eventService: EventService,
    buildingService: BuildingTypeService,
    terrainService: TerrainService,
    structureService: StructureTypeService,
    resourceService: ResourceService,
    unitService: UnitService
  ) {
    super(eventService);
    this.buildingService = buildingService;
    this.structureService = structureService;
    this.terrainService = terrainService;
    this.resourceService = resourceService;
    this.unitService = unitService;
    this.resources = [];
    this.units = [];
    this.terrainService.getTerrains().then(response => this.saveTerrainTypes(response));
    this.structureService.getStructures().then(response => this.saveStructureTypes(response));
    this.resourceService.getResources().then((resources => {
      this.saveResources(resources);
      this.buildingService.getBuildings().then(response => this.saveBuildingTypes(response));
    }));
    this.unitService.getUnits().then(response => this.saveUnitTypes(response));
  }

  public createStructureImageString(terrain: string, entity: string, playerOwned: boolean) {
    let key = this.createKey(terrain, entity);
    if (playerOwned) {
      key = key + '_' + PLAYER;
    } else {
      key = key + '_' + ENEMY;
    }
    return IMG_SOURCE + key + EXT;
  }

  public createImageString(terrain: string, entity: string) {
    const key = this.createKey(terrain, entity);

    return IMG_SOURCE + key + EXT;
  }

  public createIconString(icon: string) {
    return IMG_SOURCE + icon + EXT;
  }

  private createKey(terrain: string, entity: string) {
    let key: string;
    if ( isNullOrUndefined(entity)) {
      key = terrain;
    } else {
      key = terrain + '_' + entity;
    }
    return key;
  }

  public getBuildingTypes(): BuildingType[] {
    return this.buildings;
  }

  public getMainBuilding(): BuildingType[] {
    const mains = [];
    mains.push(this.mainBuilding);
    return mains;
  }

  public getTerrainTypes(): TerrainType[] {
    return this.terrains;
  }

  public getStructureTypes(): StructureType[] {
    return this.structures;
  }

  public getResources(): Resource[] {
    return this.resources;
  }

  public getResourceByName(name: string) {
    for (let i = 0; i < this.resources.length; i++) {
      if (this.resources[i].name === name) {
        return this.resources[i];
      }
    }
    return null;
  }

  public getBuildingTypeByName(name: string) {
    for (let i = 0; i < this.buildings.length; i++) {
      if (this.buildings[i].name === name) {
        return this.buildings[i];
      }
    }
    if (this.mainBuilding.name === name) {
      return this.mainBuilding;
    }
    return null;
  }

  public getUnits() {
    return this.units;
  }

  public getUnitByName(name: string) {
    for (let i = 0; i < this.units.length; i++) {
      if (this.units[i].name === name) {
        return this.units[i];
      }
    }
    return null;
  }

  private saveResources(resources: Resource[]): void {
    this.resources = resources;
    for (let i = 0; i < this.resources.length; i++) {
      this.resources[i].image = this.createIconString(this.resources[i].name);
    }
  }

  private saveTerrainTypes(terrains: TerrainType[]): void {
    this.terrains = terrains;
    // this.createMap();
  }

  private saveStructureTypes(structures: StructureType[]): void {
    this.structures = structures;
    // this.createMap();
  }

  private saveBuildingTypes(buildings: BuildingTypeResponse[]): void {
    this.buildings = [];
    for (let i = 0; i < buildings.length; i++) {
      const building = new BuildingType(
        buildings[i].name,
        buildings[i].displayName,
        buildings[i].limit,
        buildings[i].destructible,
        buildings[i].mainBuilding);
      building.fillProduction(this, buildings[i].productions);
      building.fillRequirements(this, buildings[i].requirements);
      if (building.mainBuilding) {
        this.mainBuilding = building;
      } else {
        this.buildings.push(building);
      }
    }
  }

  private saveUnitTypes(units: UnitResponse[]) {
    this.units = [];
    for (let i = 0; i < units.length; i++) {
      this.units[i] = new Unit(
        units[i].name,
        units[i].displayName,
        units[i].strength,
        units[i].speed,
        units[i].health,
        units[i].capacity
      );
      this.units[i].image = this.createIconString(this.units[i].name);
      this.units[i].fillRequirements(this, units[i].requirements);
      this.units[i].fillProduction(this, units[i].productions);
    }
  }

}
