# QuickJump

A React component for quickly jumping to specific columns in a large table. This component is built with React and Ant Design, providing an efficient way to navigate through wide tables with many columns.

## Features

- Quick column navigation
- Support for nested columns
- Customizable column titles
- Compatible with Ant Design Table
- TypeScript support

## Installation

```bash
npm install @juenanfeng/quick-jump
# or
yarn add @juenanfeng/quick-jump
# or
pnpm add @juenanfeng/quick-jump
```

## Usage

```tsx
import QuickJump from '@juenanfeng/quick-jump';

const YourComponent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <QuickJump
      titleMap={{
        column1: 'Column 1',
        column2: 'Column 2',
      }}
      columns={yourTableColumns}
      scrollRef={scrollRef}
    />
  );
};
```

## Props

- `titleMap`: Record<string, string> - Mapping of column keys to display names
- `columns`: any[] - Table columns configuration
- `scrollRef`: React.RefObject<HTMLDivElement> - Reference to the scrollable container
- `hasSelection`: boolean (optional) - Whether the table has a selection column
- `renderMap`: Record<string, () => React.ReactNode> (optional) - Custom render functions for column titles
- `stickyNum`: number (optional) - Number of sticky columns

## License

MIT 