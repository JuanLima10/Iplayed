import { Type } from '@nestjs/common';

export interface ISwagger {
  summary?: string;
  status: number;
  res?: Type<unknown>;
  auth?: boolean;
  array?: boolean;
}
