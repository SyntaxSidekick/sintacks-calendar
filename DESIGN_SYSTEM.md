# Sintacks Design System Integration

This project now uses the [Sintacks Design System](https://github.com/SyntaxSidekick/sintacks-design-system) for consistent UI components and styling.

## What's Integrated

### Design System Components Used
- **Button** - Used in Sidebar, CalendarHeader for actions
- **Input** - Search input in Sidebar
- **Label** - Form labels in EventEditorModal
- **Textarea** - Event description field
- **Dialog** - Event creation/editing modal

### Theme System
The design system's theme tokens are integrated in [app/globals.css](app/globals.css):

- **Primary Color**: Sintacks Orange (#CE5815)
- **Secondary Color**: Sintacks Teal (#44B0B9)
- **Full dark mode support** via the `.dark` class
- **Consistent spacing, borders, and radius** using design tokens

### Files Updated

1. **[app/globals.css](app/globals.css)** - Added design system theme variables
2. **[lib/utils.ts](lib/utils.ts)** - Added `cn()` utility for className merging
3. **[components/Sidebar.tsx](components/Sidebar.tsx)** - Updated with Button and Input components
4. **[components/CalendarHeader.tsx](components/CalendarHeader.tsx)** - Updated with Button components
5. **[components/EventEditorModal.tsx](components/EventEditorModal.tsx)** - Updated with Dialog, Input, Label, Textarea
6. **[types/sintacks-design-system.d.ts](types/sintacks-design-system.d.ts)** - Type definitions for design system

## Installation Details

The design system is installed directly from GitHub:

```bash
npm install git+https://github.com/SyntaxSidekick/sintacks-design-system.git --legacy-peer-deps
```

**Note**: `--legacy-peer-deps` is used because the design system requires React 18.3.1, while this project uses React 19.2.3. The components work fine with React 19.

## Using Design System Components

### Import Pattern
```tsx
import { Button, Input, Dialog } from 'sintacks-design-system'
import { cn } from '@/lib/utils'
```

### Button Variants
```tsx
<Button variant="default">Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
```

### Button Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
```

### Using Theme Colors
The design system provides semantic color classes:
- `bg-primary` / `text-primary-foreground`
- `bg-secondary` / `text-secondary-foreground`
- `bg-accent` / `text-accent-foreground`
- `bg-muted` / `text-muted-foreground`
- `bg-destructive` / `text-destructive-foreground`
- `bg-card` / `text-card-foreground`
- `border` - Uses `--border` color

### Example: Custom Component
```tsx
import { Button } from 'sintacks-design-system'
import { cn } from '@/lib/utils'

export function MyComponent() {
  return (
    <div className="bg-card border rounded-lg p-4">
      <h2 className="text-foreground">Title</h2>
      <p className="text-muted-foreground">Description</p>
      <Button variant="default" className={cn('mt-4')}>
        Action
      </Button>
    </div>
  )
}
```

## Theme Toggle

The calendar includes a theme toggle in the header. The design system automatically adapts when the `.dark` class is added to the root element via the ThemeProvider.

## Updating the Design System

To update to the latest version of the design system:

```bash
npm install git+https://github.com/SyntaxSidekick/sintacks-design-system.git --legacy-peer-deps --force
```

## Available Components

From the Sintacks Design System, you can use:
- Accordion
- Alert & Alert Dialog
- Avatar
- Badge
- Button ✅ (Already in use)
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Command
- Context Menu
- Dialog ✅ (Already in use)
- Dropdown Menu
- Form
- Input ✅ (Already in use)
- Label ✅ (Already in use)
- Menu & Menubar
- Navigation Menu
- Popover
- Progress
- Radio Group
- Select
- Slider
- Switch
- Table
- Tabs
- Textarea ✅ (Already in use)
- Toast (Sonner)
- Tooltip
- And more...

## Resources

- [Design System Repository](https://github.com/SyntaxSidekick/sintacks-design-system)
- [Design System Documentation](https://github.com/SyntaxSidekick/sintacks-design-system#readme)

## Support

For issues with the design system components, please refer to the [design system repository](https://github.com/SyntaxSidekick/sintacks-design-system).
