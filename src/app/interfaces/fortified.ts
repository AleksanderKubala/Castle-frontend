import {ImageMapperService} from '../services/internal-services/image-mapper-service/image-mapper.service';
import {GarrisonResponse} from '../responses/element-responses/garrison-response';
import {Unit} from '../classes/unit';

export interface Fortified {

  fillGarrison(imageService: ImageMapperService, garrison: GarrisonResponse[]);
  updateGarrison(garrison: GarrisonResponse[]);
  getGarrisonByUnit(unit: Unit);
  getGarrison();
}
