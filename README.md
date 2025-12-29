# 💰 Control Cash

Aplicación de gestión de finanzas personales desarrollada con Next.js 16, TypeScript y TanStack Query. Permite a los usuarios gestionar sus ingresos y gastos de manera eficiente, con una interfaz moderna y funcionalidades completas de CRUD.

## 🚀 Características Principales

- ✅ **Autenticación completa**: Login, registro y recuperación de contraseña
- ✅ **Gestión de transacciones**: CRUD completo de ingresos y gastos
- ✅ **Dashboard financiero**: Resumen de ingresos, gastos y balance neto
- ✅ **Filtrado y organización**: Tabs para separar ingresos y gastos
- ✅ **Interfaz moderna**: Diseño responsive con Tailwind CSS y shadcn/ui
- ✅ **Type-safe**: TypeScript estricto con enums y tipos centralizados
- ✅ **Estado optimizado**: React Query para caché y sincronización automática
- ✅ **Validaciones robustas**: Zod + React Hook Form para formularios

## 🛠️ Stack Tecnológico

### Frontend Core
- **Next.js 16.1.1** - Framework React con App Router
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first

### Gestión de Estado y Datos
- **TanStack Query 5.90.12** - Gestión de estado del servidor y caché
- **TanStack Table 8.21.3** - Tablas avanzadas con paginación y ordenamiento
- **Jotai 2.16.0** - Estado global ligero

### Formularios y Validación
- **React Hook Form 7.69.0** - Gestión de formularios
- **Zod 4.2.1** - Validación de esquemas
- **@hookform/resolvers** - Integración Zod + RHF

### UI Components
- **Radix UI** - Componentes accesibles (Dialog, Tabs, Dropdown, etc.)
- **shadcn/ui** - Componentes reutilizables
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast
- **Framer Motion** - Animaciones

### Backend Mock
- **MockAPI** - API REST mock para persistencia de datos

### Testing y Calidad
- **Jest** - Framework de testing
- **Testing Library** - Testing de componentes React
- **ESLint** - Linter
- **Prettier** - Formateador de código

## 📋 Requisitos Previos

- **Node.js** >= 18.x
- **Bun** >= 1.0 (o npm/yarn/pnpm)
- Cuenta en [MockAPI](https://mockapi.io/) para el backend mock

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd control-cash
```

2. **Instalar dependencias**
```bash
bun install
# o
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_MOCKAPI_URL=https://694f17558531714d9bcd4d0d.mockapi.io/api/v1
```

> **Nota**: Reemplaza la URL con tu propia instancia de MockAPI si es necesario.

4. **Configurar MockAPI**

En tu instancia de MockAPI, crea las siguientes entidades:

- **`users`** - Para autenticación
  - Campos: `id`, `email`, `password`, `name`, `createdAt`
  
- **`transactions`** - Para transacciones financieras
  - Campos: `id`, `title`, `amount`, `type`, `category`, `date`, `description`, `receipt_url`, `userId`, `createdAt`

5. **Ejecutar en desarrollo**
```bash
bun run dev
# o
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
control-cash/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Rutas protegidas del dashboard
│   │   ├── layout.tsx           # Layout del dashboard con sidebar
│   │   ├── page.tsx             # Página principal del dashboard
│   │   ├── master/              # Sección Master (usuarios, productos)
│   │   └── transactions/        # Gestión de transacciones
│   ├── login/                    # Página de login
│   ├── register/                 # Página de registro
│   ├── forgot/                   # Página de recuperación de contraseña
│   └── layout.tsx                # Layout raíz
│
├── components/                    # Componentes React
│   ├── atomic-design/            # Componentes organizados por Atomic Design
│   │   ├── atoms/                # Componentes básicos
│   │   ├── molecules/            # Componentes compuestos
│   │   ├── organism/             # Componentes complejos (GenericTable, Navigation)
│   │   └── template/             # Templates de layout
│   ├── pages/                    # Componentes específicos de páginas
│   │   ├── dashboard/            # Componentes del dashboard
│   │   ├── login/                # Componentes de login
│   │   └── register/             # Componentes de registro
│   ├── auth/                      # Componentes de autenticación
│   ├── common/                    # Componentes comunes
│   └── ui/                        # Componentes shadcn/ui
│
├── lib/                           # Lógica de negocio
│   ├── api/                       # Capa de servicios API
│   │   ├── hooks/                 # React Query hooks
│   │   │   ├── transactions/     # Hooks de transacciones
│   │   │   └── users/             # Hooks de usuarios
│   │   ├── services/              # Servicios API
│   │   │   ├── transactions/     # Servicios de transacciones
│   │   │   └── users/             # Servicios de usuarios
│   │   ├── config.ts              # Configuración de APIs
│   │   └── types.ts                # Tipos TypeScript centralizados
│   ├── auth/                      # Schemas y utilidades de autenticación
│   └── utils.ts                    # Utilidades generales
│
├── context/                       # Contextos de React (Jotai atoms)
│   └── pages/                     # Contextos por página
│
├── config/                        # Configuración
│   ├── routes-pages.ts            # Rutas de la aplicación
│   ├── routes-api.ts              # Rutas de APIs
│   └── keywords.ts                # Textos y constantes
│
├── hooks/                         # Hooks personalizados
├── public/                        # Archivos estáticos
└── types/                         # Tipos globales
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo
bun run dev              # Inicia servidor de desarrollo

# Producción
bun run build            # Construye la aplicación para producción
bun run start            # Inicia servidor de producción

# Calidad de código
bun run lint             # Ejecuta ESLint
bun run format           # Formatea código con Prettier
bun run format:check     # Verifica formato sin modificar

# Testing
bun run test             # Ejecuta tests
bun run test:watch       # Ejecuta tests en modo watch
bun run test:coverage    # Genera reporte de cobertura

# Verificación completa
bun run quality-check    # Ejecuta format, lint, tests y build
```

## ✨ Funcionalidades Implementadas

### 🔐 Autenticación
- [x] Login con validación de formularios
- [x] Registro de nuevos usuarios
- [x] Recuperación de contraseña (estructura)
- [x] Protección de rutas con `AuthCheck`
- [x] Almacenamiento de sesión en `localStorage`
- [x] Integración completa con MockAPI

### 💳 Transacciones
- [x] Listado de transacciones con tabs (Income/Expense)
- [x] Eliminación de transacciones con confirmación
- [x] Refresco automático tras mutaciones
- [x] Notificaciones toast (éxito/error)
- [x] Estados de loading durante operaciones
- [x] Filtrado por tipo de transacción
- [x] Tabla genérica con paginación y ordenamiento

### 📊 Dashboard
- [x] Layout con Sidebar y Breadcrumb
- [x] Página principal con saludo personalizado
- [x] Navegación estructurada
- [ ] Resumen financiero en UI (hook implementado, falta componente)

### 🛠️ Infraestructura
- [x] Arquitectura modular y escalable
- [x] Path aliases configurados (`@/`)
- [x] Query keys centralizadas para React Query
- [x] Manejo centralizado de errores API
- [x] TypeScript estricto con enums
- [x] Testing configurado

## 🏗️ Arquitectura

### Atomic Design
El proyecto sigue la metodología **Atomic Design** para organizar componentes:

- **Atoms**: Componentes básicos (Input, Button, Text)
- **Molecules**: Componentes compuestos (Header, Card, Dialog)
- **Organisms**: Componentes complejos (GenericTable, Navigation)
- **Templates**: Layouts reutilizables (AuthFormLayout)

### Gestión de Estado

- **TanStack Query**: Para datos del servidor (caché, sincronización, refetch)
- **Jotai**: Para estado global del cliente (selecciones, modales)
- **React Hook Form**: Para estado de formularios

### Tipos y Enums

El proyecto utiliza **enums TypeScript** para mayor seguridad de tipos:

```typescript
// Tipos de transacción
ENUM_TRANSACTION_TYPE: INCOME | EXPENSE

// Categorías
ENUM_TRANSACTION_CATEGORY: 
  Income: Salary, Freelance, Investment, Bonus, Rental, Dividends
  Expense: Food, Shopping, Furniture, Electronics, Clothing, 
           Transport, Utilities, Health, Entertainment, 
           Education, Travel, Other
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y está destinado para uso en demostraciones.

## 🔗 Enlaces Útiles

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [MockAPI](https://mockapi.io/)
- [shadcn/ui](https://ui.shadcn.com/)

---

**Desarrollado con ❤️ usando Next.js y TypeScript**
