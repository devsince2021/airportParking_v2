import { BadRequestException } from '@nestjs/common';
import _ from 'lodash';

interface BadRequestErrorContent {
  message: string;
  code: string;
}

export class BadRequestError extends BadRequestException {
  constructor(content?: BadRequestErrorContent) {
    if (_.isNil(content)) {
      super();
      return;
    }
    super(JSON.stringify(content));
  }
}
