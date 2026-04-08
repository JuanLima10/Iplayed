import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const { DATABASE_URL } = process.env;
    if (!DATABASE_URL) throw new Error('DATABASE_URL is not defined');

    const pool = new Pool({ connectionString: DATABASE_URL });
    super({ adapter: new PrismaPg(pool), log: ['error', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
