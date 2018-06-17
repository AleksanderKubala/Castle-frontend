import {Producing} from '../interfaces/producing';
import {Requiring} from '../interfaces/requiring';
import {ImageMapperService} from '../services/internal-services/image-mapper-service/image-mapper.service';
import {ProductionResponse} from '../responses/element-responses/production-response';
import {RequirementResponse} from '../responses/element-responses/requirement-response';
import {Production} from './production';
import {Requirement} from './requirement';
import {isNullOrUndefined} from 'util';
import {Resource} from './resource';

export class AbstractEconomyObject implements Producing, Requiring {

  protected productions: Production[];
  protected requirements: Requirement[];

  protected constructor() {}

  public fillProduction(imageService: ImageMapperService, productions: ProductionResponse[]) {
    if (isNullOrUndefined(this.productions)) {
      this.productions = [];
      for (let j = 0; j < productions.length; j++) {
        const resource = imageService.getResourceByName(productions[j].resource);
        this.productions[j] = new Production(resource, productions[j].quantity);
      }
    }
  }

  public updateProduction(productions: ProductionResponse[]) {
    for (let i = 0; i < productions.length; i++) {
      for (let j = 0; j < this.productions.length; j++) {
        if (this.productions[j].resource.name === productions[i].resource) {
          this.productions[j].quantity = productions[i].quantity;
        }
      }
    }
  }

  getProduction() {
    return this.productions;
  }

  getProductionByResource(res: Resource): number {
    for (let i = 0; i < this.productions.length; i++) {
      if (res === this.productions[i].resource) {
        return this.productions[i].quantity;
      }
    }
  }


  public fillRequirements(imageMapper: ImageMapperService, reqs: RequirementResponse[]) {
    if (isNullOrUndefined(this.requirements)) {
      this.requirements = [];
      for (let j = 0; j < reqs.length; j++) {
        const resource = imageMapper.getResourceByName(reqs[j].resource);
        this.requirements[j] = new Requirement(resource, reqs[j].quantity);
      }
    }
  }

  public updateRequirements(reqs: RequirementResponse[]) {
    for (let i = 0; i < reqs.length; i++) {
      for (let j = 0; j < this.requirements.length; j++) {
        if (this.requirements[j].resource.name === reqs[i].resource) {
          this.requirements[j].quantity = reqs[i].quantity;
        }
      }
    }
  }

  getRequirements() {
    return this.requirements;
  }

  getRequirementByResource(res: Resource): number {
    for (let i = 0; i < this.productions.length; i++) {
      if (res === this.productions[i].resource) {
        return this.productions[i].quantity;
      }
    }
  }


}
