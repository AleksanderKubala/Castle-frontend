import {ImageMapperService} from '../services/internal-services/image-mapper-service/image-mapper.service';
import {ProductionResponse} from '../responses/element-responses/production-response';
import {Resource} from '../classes/resource';

export interface Producing {
  fillProduction(imageService: ImageMapperService, productions: ProductionResponse[]);
  updateProduction(productions: ProductionResponse[]);
  getProductionByResource(res: Resource): number;
  getProduction();
}
