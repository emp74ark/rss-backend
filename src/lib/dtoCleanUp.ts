export const dtoCleanUp = (dto: unknown) => {
  if (typeof dto !== 'object' || dto === null) return;

  Reflect.deleteProperty(dto, '_id')
  Reflect.deleteProperty(dto, 'createdAt')
};
