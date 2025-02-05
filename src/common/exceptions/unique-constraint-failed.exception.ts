import { ConflictException } from '@nestjs/common';

export class UniqueConstraintFailedException extends ConflictException {
  constructor(field: string) {
    super(`A record with this ${field} already exists`);
  }
} 