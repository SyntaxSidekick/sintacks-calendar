# Sintacks Calendar

> A modern, Google Calendar-style web application built for a senior-level portfolio

![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?logo=tailwind-css)

A fully interactive calendar application with Month, Week, and Day views. Create, edit, delete, drag, and resize events with 15-minute snap-to-grid precision. Features a clean, modern UI with a custom design system and local-first data architecture.

## ✨ Features

### 📅 Calendar Views
- **Month View**: Classic grid layout with event previews
- **Week View**: Vertical time grid with all-day event support
- **Day View**: Single-column detailed view
- Smooth transitions between views
- Intuitive navigation controls

### 🎯 Event Management
- **Create**: Click and drag on time grid to create events
- **Edit**: Click any event to modify details
- **Delete**: Remove events with confirmation
- **Visual feedback**: Ghost previews while creating
- **Smart positioning**: Automatic handling of overlapping events

### 🎨 Color System
- **12 predefined color swatches** optimized for accessibility
- **Custom color picker** for unlimited palette options
- **Consistent theming** across all views
- **Contrast-optimized** text for readability

### ⚡ UX Polish
- **"Now" indicator**: Red line showing current time in week/day views
- **15-minute snapping**: Precise event timing
- **Keyboard-friendly**: Full form accessibility
- **Responsive design**: Works on desktop and tablet
- **Local persistence**: Events saved in localStorage

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand with persistence
- **Date handling**: date-fns
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/SyntaxSidekick/sintacks-calendar.git
cd sintacks-calendar

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🏗️ Project Structure

```
sintacks-calendar/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Main calendar page
│   └── globals.css         # Global styles
├── components/
│   ├── CalendarShell.tsx   # Main container
│   ├── CalendarHeader.tsx  # Navigation & controls
│   ├── EventEditorModal.tsx # Event create/edit dialog
│   ├── ColorPicker.tsx     # Color selection UI
│   ├── TimeGrid.tsx        # Time-based grid component
│   └── views/
│       ├── MonthView.tsx   # Month calendar view
│       ├── WeekView.tsx    # Week calendar view
│       └── DayView.tsx     # Day calendar view
├── store/
│   └── calendar-store.ts   # Zustand state management
├── lib/
│   ├── colors.ts           # Color palette & utilities
│   └── date-utils.ts       # Date manipulation helpers
└── types/
    └── calendar.ts         # TypeScript interfaces
```

## 🎨 Architecture Highlights

### State Management
- **Zustand** for reactive, minimal-boilerplate state
- **localStorage persistence** for data durability
- **Optimistic updates** for instant UI feedback

### Component Design
- **Composable architecture**: Small, focused components
- **Separation of concerns**: Logic decoupled from rendering
- **Type-safe props**: Full TypeScript coverage
- **Accessibility-first**: ARIA labels and keyboard navigation

### Date Utilities
- Comprehensive helpers in `date-utils.ts`
- 15-minute interval snapping
- Overlap detection and positioning
- Multi-timezone ready (ISO 8601)

### Performance
- Client-side rendering for interactivity
- Optimized re-renders with proper memoization
- Minimal bundle size with tree-shaking

## 🎯 Key Features Implementation

### Creating Events
1. Click and drag on the time grid
2. Ghost preview shows during creation
3. Release to open editor modal
4. Events snap to 15-minute intervals

### Editing Events
- Click any event to open editor
- Modify title, times, color, and description
- Real-time validation
- Delete with confirmation

### Color System
- 12 carefully selected colors
- Each with optimized background, border, and text variants
- Custom color picker for unlimited options
- Color persisted with event data

### Overlapping Events
- Automatic detection of overlaps
- Smart column-based positioning
- Prevents visual collisions
- Maintains clickability

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel

# Or connect your GitHub repo in Vercel dashboard
```

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing Locally

1. Create an event by dragging in week/day view
2. Click an event to edit it
3. Try different colors
4. Navigate between views
5. Refresh the page - events persist!

## 📝 Future Enhancements

Potential improvements for V2:
- [ ] Recurring events
- [ ] Event categories/tags
- [ ] Search and filtering
- [ ] Import/export (iCal format)
- [ ] Backend API integration
- [ ] Multi-user support
- [ ] Real-time sync
- [ ] Mobile responsive improvements
- [ ] Dark mode
- [ ] Keyboard shortcuts

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this project as a learning resource or portfolio inspiration.

## 👤 Author

**SyntaxSidekick**
- GitHub: [@SyntaxSidekick](https://github.com/SyntaxSidekick)
- Portfolio Project

---

Built with ❤️ using Next.js, React, and TypeScript
