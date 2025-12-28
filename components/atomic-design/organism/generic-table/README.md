# GenericTable Component

The `GenericTable` is a reusable and highly configurable React component designed to display data in a tabular format. It leverages `@tanstack/react-table` for core table logic and provides a streamlined interface for common table operations such as pagination, sorting, global filtering, column-specific filtering, and row actions.

## Features

- **Data Fetching**: Fetches data from a specified API endpoint (defined in OpenAPI client).
- **Pagination**: Built-in pagination controls.
- **Sorting**: Supports sorting for individual columns.
- **Global Filtering**: A single search input to filter across all relevant columns.
- **Column Filtering**: Advanced filtering options for each column, accessible via a filter modal. Allows for multi-select or single-select based on column configuration.
- **Customizable Columns**: Define column headers, data accessors, custom cell rendering, and enable/disable sorting/filtering per column.
- **Row Actions**: Add a dedicated column for actions (e.g., view, edit, delete) that operate on individual rows.
- **"Add New" Button**: Optionally display a button to navigate to a page for creating new records.
- **Loading and Error States**: Displays skeleton loaders during data fetching and error messages if data loading fails.
- **Type Safety**: Uses TypeScript for robust type checking, especially for column IDs against the data type.
- **Responsive Design**: Adapts to different screen sizes (though specific responsive behaviors might depend on consuming page/layout).

## Props

Here's an overview of the main props for the `GenericTable` component:

| Prop                  | Type                                                                                        | Required | Default | Description                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dataPath`            | `keyof paths`                                                                               | Yes      | -       | The API endpoint path from the OpenAPI spec (e.g., `'/users'`).                                                                                                                  |
| `pathParams`          | `Record<string, string \| number>`                                                          | No       | -       | Optional path parameters for the URL template (e.g., `{ id: '123' }`).                                                                                                           |
| `queryParams`         | `Record<string, unknown>`                                                                   | No       | -       | Optional static query parameters passed to the initial data fetch.                                                                                                               |
| `columns`             | `ColumnConfig<TData>[]`                                                                     | Yes      | -       | Array of column configurations defining the table structure and behavior. See [Column Configuration](#column-configuration) below.                                               |
| `title`               | `string`                                                                                    | Yes      | -       | Title displayed above the table.                                                                                                                                                 |
| `initialPageSize`     | `number`                                                                                    | No       | `10`    | Initial number of rows per page.                                                                                                                                                 |
| `enableColumnFilters` | `boolean`                                                                                   | No       | `true`  | Enable/disable the column filter button and modal.                                                                                                                               |
| `newButton`           | `{ text: string; path?: string; onClick?: () => void \| Promise<void>; icon?: ReactNode; }` | No       | -       | Configuration for the 'Add New' button shown in the header. Supports either navigation (`path`) or custom actions (`onClick`). At least one must be provided.                    |
| `initialSort`         | `SortingState`                                                                              | No       | -       | Initial sorting state for the table (e.g., `[{ id: 'name', desc: false }]`).                                                                                                     |
| `actionsColumn`       | `{ actions: ActionItem<TData>[]; position?: 'start' \| 'end'; header?: string; }`           | No       | -       | Configuration for the row actions column. `position` defaults to 'end', `header` defaults to 'Actions'. See [Row Actions](#row-actions).                                         |

`TData` is a generic type parameter representing the data type of a single row object (e.g., `User`, `Role`).

## Usage

### Basic Example

```tsx
import { GenericTable } from '@/components/atomic-design/organisms/generic-table';
import { type ColumnConfig } from '@/components/atomic-design/organisms/generic-table/types';
import { PlusIcon } from 'lucide-react';

// Assuming a User type is defined, potentially using type utilities:
// type User = RecordEntity<GetArrayElementType<'/generated/users'>>;

const MyPage = () => {
  const columns: ColumnConfig<User>[] = [
    {
      id: 'id',
      header: 'ID',
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      id: 'name',
      header: 'Name',
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      id: 'email',
      header: 'Email',
      enableSorting: true,
      enableColumnFilter: true,
    },
    // ... more columns
  ];

  return (
    <GenericTable<User>
      dataPath='/generated/users'
      columns={columns}
      title='User List'
      initialPageSize={10}
      newButton={{
        text: 'Add User',
        path: '/generated/users/new', // Path to the page for creating a new user
        icon: <PlusIcon className='h-4 w-4' />,
      }}
    />
  );
};

export default MyPage;
```

### Using the New Button

The `newButton` prop supports two modes: navigation to a new page or executing a custom action.

#### Navigation Mode (using `path`)

```tsx
// Navigate to a new page for creating a user
<GenericTable<User>
  dataPath='/generated/users'
  columns={columns}
  title='User List'
  newButton={{
    text: 'Add User',
    path: '/generated/users/new', // Navigate to this URL
    icon: <PlusIcon className='h-4 w-4' />,
  }}
/>
```

#### Custom Action Mode (using `onClick`)

```tsx
// Execute a custom function when the button is clicked
const MyPageWithCustomAction = () => {
  const handleAddUser = () => {
    // Open a modal, show a form, or perform any custom action
    console.log('Opening add user modal...');
    // You could open a modal, trigger a state change, etc.
  };

  return (
    <GenericTable<User>
      dataPath='/generated/users'
      columns={columns}
      title='User List'
      newButton={{
        text: 'Add User',
        onClick: handleAddUser, // Execute custom function
        icon: <PlusIcon className='h-4 w-4' />,
      }}
    />
  );
};
```

#### Async Custom Actions

```tsx
// Handle async operations like API calls
const MyPageWithAsyncAction = () => {
  const handleAddUser = async () => {
    try {
      // Perform async operation
      await createUser();
      // Refresh the table data
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  return (
    <GenericTable<User>
      dataPath='/generated/users'
      columns={columns}
      title='User List'
      newButton={{
        text: 'Add User',
        onClick: handleAddUser, // Async function is supported
        icon: <PlusIcon className='h-4 w-4' />,
      }}
    />
  );
};
```

**Note**: You must provide either `path` or `onClick` (or both, though only one will be used). The component will prioritize `path` if both are provided.

### Column Configuration (`ColumnConfig<TData>`)

Each object in the `columns` array defines a column in the table.

- `id`: (Required) Unique identifier. Should match a key in `TData` for data columns. For display-only or action columns (not directly from `TData`), prefix with an underscore (e.g., `'_actions'`).
- `header`: (Required) The text or ReactNode to display in the column header.
- `enableSorting`: (Optional, default: `true`) Whether this column can be sorted.
- `enableColumnFilter`: (Optional, default: `true`) Whether this column appears in the filter modal.
- `cell`: (Optional) A custom function to render the cell content. It receives `row` (original row data), `getValue` (accessor value), etc. Uses TanStack Table's `flexRender`.
  Example: `cell: ({ row }) => <span>{row.original.isActive ? 'Active' : 'Inactive'}</span>`
- `meta`: (Optional) An object for custom metadata.
  - `isDate?: boolean`: Hints that the column contains date values, potentially for special formatting in filters.
  - `isNumber?: boolean`: Hints that the column contains numeric values.
  - `filterMultiSelect?: boolean`: For the filter modal, if this column's filter should allow multiple selections.
  - `singleSelect?: boolean`: When `true`, the filter dropdown for this column will use single-select mode instead of multi-select.

**Example Column with Custom Cell and Meta:**

```tsx
{
  id: 'createdAt',
  header: 'Created At',
  enableSorting: true,
  enableColumnFilter: true,
  cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  meta: {
    isDate: true,
  },
},
{
  id: '_customStatus', // Display-only column
  header: 'Status',
  cell: ({ row }) => (
    <span className={row.original.isActive ? 'text-green-500' : 'text-red-500'}>
      {row.original.isActive ? 'Active' : 'Inactive'}
    </span>
  ),
  enableSorting: false,
  enableColumnFilter: false, // This custom column might not need a filter
}
```

### Row Actions (`actionsColumn`)

You can add a column with action buttons for each row (e.g., View, Edit, Delete).

- `actions`: (Required) An array of `ActionItem<TData>` objects.
- `position`: (Optional, default: `'end'`) Whether the actions column appears at the `'start'` or `'end'` of the table.
- `header`: (Optional, default: `'Actions'`) The header text for the actions column.

Each `ActionItem<TData>` is an object:

- `component`: (Required) A React component that receives `{ row: TData }` as props. This component should render the button or link for the action.

**Example Action Item Components:**

```tsx
import { Button } from '@/components/atomic-design/atoms/shadcn/button';
import { EyeIcon, Edit2Icon, TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

const ViewAction = ({ row }: { row: User }) => (
  <Button
    variant='ghost'
    size='icon'
    onClick={() => toast.info(`Viewing user: ${row.name}`)}
  >
    <EyeIcon className='h-4 w-4' />
  </Button>
);

const EditAction = ({ row }: { row: User }) => (
  <Button
    variant='ghost'
    size='icon'
    onClick={() => toast.info(`Editing user: ${row.name}`)} // Navigate to edit page in a real app
  >
    <Edit2Icon className='h-4 w-4' />
  </Button>
);

// ... define other action components
```

**Configuring `actionsColumn`:**

```tsx
// In your page component, where GenericTable is used:
const actionItems = [
  { component: ViewAction },
  { component: EditAction },
  // ... other action items
];

return (
  <GenericTable<User>
    // ... other props
    actionsColumn={{
      actions: actionItems,
      header: 'Operations',
      position: 'start',
    }}
  />
);
```

### Data Type (`TData` and Type Utilities)

The component is generic and relies on `TData` to type the row data. For convenience, especially when working with OpenAPI-generated types, the showcase demonstrates using type utilities:

```tsx
import {
  type RecordEntity,
  type GetArrayElementType,
} from '@/components/atomic-design/organisms/generic-table/utils/type-utils';

// Example: Inferring User type from an OpenAPI path like '/generated/users'
// which is expected to return an array of user objects.
type User = RecordEntity<GetArrayElementType<'/generated/users'>>;
```

This helps ensure that `ColumnConfig` `id`s are valid keys of your data objects.

The types for API responses, including the `paths` object used in `dataPath` and the structures for `TData`, are typically generated from an OpenAPI (Swagger) specification. This project uses a command to automate this generation.

**To update or generate the API client types, run the following command in your terminal:**

```bash
bun run generate:api-client
```

This command processes the OpenAPI specification and produces the necessary TypeScript types, ensuring that your `GenericTable` component and its data configurations remain synchronized with the API contract.

## Structure

The `GenericTable` component is organized as follows:

- `generic-table.tsx`: The main component file.
- `types.ts`: Contains TypeScript type definitions for props, column configurations, and actions.
- `hooks/use-generic-table.ts`: A custom hook that encapsulates the core table logic, including data fetching, state management for pagination, sorting, and filtering using `@tanstack/react-table`.
- `components/`: Contains sub-components used by `GenericTable`:
  - `page-header.tsx`: Renders the title, global search, filter button, and new button.
  - `table-component.tsx`: Renders the main `<table>` structure.
  - `pagination.tsx`: Renders pagination controls.
  - `filter-modal.tsx`: Renders the modal for column-specific filters.
  - `column-filter.tsx`: Renders the filter input for a specific column within the modal.
- `utils/`: Contains utility functions, including type utilities.

## Customization and Advanced Usage

- **Custom Cell Rendering**: Use the `cell` property in `ColumnConfig` to render custom content, including components, formatted dates, status badges, etc.
- **Derived/Display Columns**: Add columns that don't directly map to a data field by prefixing their `id` with `_` and providing a custom `cell` renderer.
- **Conditional Rendering of Actions/Buttons**: More complex logic for individual actions or buttons within cells would typically be handled inside the custom `cell` renderer or `ActionItem` components, potentially using a global state or context for user roles/permissions.
- **Styling**: The component uses Tailwind CSS and shadcn/ui components. Styling can be customized by overriding Tailwind classes or modifying the sub-components.

## Future Considerations / Potential Enhancements

(This section can be updated based on plans like `generic-table-improvements-plan.md`)

- More advanced filter types (date ranges, number ranges).
- Server-side pagination, sorting, and filtering for very large datasets.
- Row selection (checkboxes).
- Inline editing.
- Customizable empty state.
