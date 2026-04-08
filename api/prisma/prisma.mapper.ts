export interface PrismaMapper<Entity, Response> {
  select: Record<string, boolean>;
  toResponse(this: void, entity: Entity): Response;
}
