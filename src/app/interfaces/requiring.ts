import {ImageMapperService} from '../services/internal-services/image-mapper-service/image-mapper.service';
import {RequirementResponse} from '../responses/element-responses/requirement-response';
import {Requirement} from '../classes/requirement';
import {Resource} from '../classes/resource';

export interface Requiring {

  fillRequirements (imageMapper: ImageMapperService, reqs: RequirementResponse[]);
  updateRequirements (reqs: RequirementResponse[]);
  getRequirementByResource(res: Resource): number;
  getRequirements();
}
