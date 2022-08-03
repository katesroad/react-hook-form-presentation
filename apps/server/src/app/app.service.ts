import { Injectable } from '@nestjs/common';

import classes from './data/classes';
import limits from './data/limits';

@Injectable()
export class AppService {
  getClassTypes() {
    return classes;
  }

  getLimits(classType: string) {
    console.info(limits, limits[classType], classType);

    return limits[classType] ?? [];
  }
}
