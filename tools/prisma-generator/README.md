# Prisma CRUD Generator

Generador automático de código frontend Angular a partir del schema Prisma.

## Estructura

```
prisma-generator/
├── parse-prisma.ts          # Parser del schema.prisma
├── generate-crud.ts         # Orquestador principal
├── tsconfig.json            # Configuración TypeScript
└── templates/
    ├── model.template.ts    # Genera interfaces TypeScript
    ├── service.template.ts  # Genera servicios Angular
    ├── table.template.ts    # Genera componentes de tabla
    └── form.template.ts     # Genera componentes de formulario
```

## Uso

Desde la raíz del proyecto:

```bash
npm run generate:crud
```

## Arquitectura

1. **PrismaParser** lee `apps/backend/prisma/schema.prisma`
2. Extrae modelos y campos usando regex
3. Mapea tipos Prisma → TypeScript
4. **Templates** generan código Angular
5. **CRUDGenerator** escribe archivos en `apps/frontend/`

## Output

Para cada modelo en el schema, genera:

- `shared/models/{model}.model.ts` - Interface TypeScript
- `modules/{plural}/{model}.service.ts` - Service con CRUD
- `modules/{plural}/{model}-table/` - Componente de listado
- `modules/{plural}/{model}-create/` - Componente de creación
- `modules/{plural}/{model}-edit/` - Componente de edición
- `modules/{plural}/{plural}.module.ts` - Módulo Angular
- `modules/{plural}/{plural}-routing.module.ts` - Routing

## Tecnologías

- TypeScript 5.x
- Node.js fs/path modules
- Regex para parsing
- Template strings para generación

## Documentación Completa

Ver `/docs/PRISMA-CRUD-GENERATOR.md` para documentación técnica detallada.
Ver `/docs/FRONTEND-AUTOGENERATION.md` para guía de uso.

## Mantenimiento

### Modificar Templates

Editar archivos en `templates/` y ejecutar `npm run generate:crud`.

### Agregar Nuevos Templates

1. Crear `templates/mi-template.template.ts`
2. Implementar función generadora
3. Llamar desde `generate-crud.ts`

## Versión

**v0.5.0** - Generación automática de CRUD completo

---

Desarrollado por ANFUTRANS Development Team
