import {AbstractEconomyObject} from './abstract-economy-object';
import {Fortified} from '../interfaces/fortified';
import {Storing} from '../interfaces/storing';
import {ImageMapperService} from '../services/internal-services/image-mapper-service/image-mapper.service';
import {StorageResponse} from '../responses/element-responses/storage-response';
import {Requirement} from './requirement';
import {GarrisonResponse} from '../responses/element-responses/garrison-response';
import {CityStorage} from './city-storage';
import {isNullOrUndefined} from 'util';
import {Garrison} from './garrison';
import {Resource} from './resource';
import {Unit} from './unit';

export class AbstractStrategicObject extends AbstractEconomyObject implements Storing, Fortified {

  protected storage: CityStorage[];
  protected garrison: Garrison[];

  public checkForRequirementsMet(reqs: Requirement[]): boolean {
    let reqMet = true;
    for (let i = 0; (i < reqs.length) && (reqMet); i++) {
      for (let j = 0; (j < this.storage.length) && (reqMet); j++) {
        if (reqs[i].resource === this.storage[j].resource) {
          if (reqs[i].quantity > this.storage[j].quantity) {
            reqMet = false;
          }
        }
      }
    }
    return reqMet;
  }


  public fillStorage(imageService: ImageMapperService, storages: StorageResponse[]) {
    if (isNullOrUndefined(this.storage)) {
      this.storage = [];
      for (let j = 0; j < storages.length; j++) {
        const resource = imageService.getResourceByName(storages[j].resource);
        this.storage[j] = new CityStorage(resource, storages[j].quantity);
      }
    }
  }

  public updateStorage(storages: StorageResponse[]) {
    for (let i = 0; i < storages.length; i++) {
      for (let j = 0; j < this.storage.length; j++) {
        if (this.storage[j].resource.name === storages[i].resource) {
          this.storage[j].quantity = storages[i].quantity;
        }
      }
    }
  }

  getStorage() {
    return this.storage;
  }

  getStorageByResource(res: Resource): number {
    for (let i = 0; i < this.storage.length; i++) {
      if (res === this.storage[i].resource) {
        return this.storage[i].quantity;
      }
    }
  }

  public fillGarrison(imageService: ImageMapperService, garrison: GarrisonResponse[]) {
    if (isNullOrUndefined(this.garrison)) {
      this.garrison = [];
      for (let j = 0; j < garrison.length; j++) {
        const unit = imageService.getUnitByName(garrison[j].unit);
        this.garrison[j] = new Garrison(unit, garrison[j].quantity);
      }
    }
  }

  public updateGarrison(garrison: GarrisonResponse[]) {
    for (let i = 0; i < garrison.length; i++) {
      for (let j = 0; j < this.garrison.length; j++) {
        if (this.garrison[j].unit.name === garrison[i].unit) {
          this.garrison[j].quantity = garrison[i].quantity;
        }
      }
    }
  }

  getGarrison() {
    return this.garrison;
  }

  getGarrisonByUnit(unit: Unit) {
    let found = false;
    for (let i = 0; (i < this.garrison.length) && (!found); i++) {
      if (unit === this.garrison[i].unit) {
        found = true;
        if (this.garrison[i].quantity > 0) {
          return this.garrison[i].quantity;
        }
      }
    }
    return 0;
  }

}
