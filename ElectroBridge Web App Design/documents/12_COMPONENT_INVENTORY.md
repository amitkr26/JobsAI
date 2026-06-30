# Component Inventory

## Figma Design Components (from src/app/App.tsx)

### Inline Components (to be ported)

| Component | Description | Location in App.tsx |
|-----------|-------------|-------------------|
| `Badge` | Colored pill badge (cyan, blue, green, yellow, red, purple, gray) | Lines 225-241 |
| `VerifiedBadge` | Green verified check badge | Lines 243-249 |
| `AvatarCircle` | Colored circle with initials | Lines 251-257 |
| `StatCard` | Metric display card (icon, label, value, delta) | Lines 259-272 |
| `OpportunityCard` | Opportunity listing card (bookmark, share, badges, tags) | Lines 274-315 |
| `SkeletonCard` | Loading skeleton placeholder | Lines 317-337 |
| `Navbar` | Top navigation with mobile hamburger | Lines 340-390 |
| `LandingScreen` | Full landing page (hero, stats, categories, featured, news, AI CTA, testimonials, footer) | Lines 393-615 |
| `OpportunitiesScreen` | Filterable searchable listing (sidebar filters, grid/list toggle) | Lines 618-700 |
| `DetailScreen` | Opportunity detail (description, eligibility, AI insights, quick facts, related) | Lines 702-838 |
| `NewsScreen` | Tabbed news feed (8 tabs) | Lines 840-860+ |
| `AIScreen` | AI chat assistant with sidebar history | Lines 866+ |
| `DashboardScreen` | User dashboard (stats, tracker, ATS score, deadlines) | Lines 1030+ |
| `CommunityScreen` | Community posts (trending, latest, top contributors) | Lines 1080+ |
| `ResumeScreen` | Multi-step resume builder (Personal, Education, Skills, Experience, Projects, Publications) | Lines 1130+ |
| `AdminScreen` | Admin panel (stats, data table, actions) | Lines 1250+ |

### Figma/Utility Components

| Component | File | Use |
|-----------|------|-----|
| `ImageWithFallback` | src/app/components/figma/ImageWithFallback.tsx | Image with error fallback |

## shadcn/ui Components (available for use)

| Component | File | Status |
|-----------|------|--------|
| Accordion | ui/accordion.tsx | Ready |
| Alert Dialog | ui/alert-dialog.tsx | Ready |
| Alert | ui/alert.tsx | Ready |
| Aspect Ratio | ui/aspect-ratio.tsx | Ready |
| Avatar | ui/avatar.tsx | Ready |
| Badge | ui/badge.tsx | Ready |
| Breadcrumb | ui/breadcrumb.tsx | Ready |
| Button | ui/button.tsx | Ready |
| Calendar | ui/calendar.tsx | Ready |
| Card | ui/card.tsx | Ready |
| Carousel | ui/carousel.tsx | Ready |
| Chart | ui/chart.tsx | Ready |
| Checkbox | ui/checkbox.tsx | Ready |
| Collapsible | ui/collapsible.tsx | Ready |
| Command | ui/command.tsx | Ready |
| Context Menu | ui/context-menu.tsx | Ready |
| Dialog | ui/dialog.tsx | Ready |
| Drawer | ui/drawer.tsx | Ready |
| Dropdown Menu | ui/dropdown-menu.tsx | Ready |
| Form | ui/form.tsx | Ready |
| Hover Card | ui/hover-card.tsx | Ready |
| Input OTP | ui/input-otp.tsx | Ready |
| Input | ui/input.tsx | Ready |
| Label | ui/label.tsx | Ready |
| Menubar | ui/menubar.tsx | Ready |
| Navigation Menu | ui/navigation-menu.tsx | Ready |
| Pagination | ui/pagination.tsx | Ready |
| Popover | ui/popover.tsx | Ready |
| Progress | ui/progress.tsx | Ready |
| Radio Group | ui/radio-group.tsx | Ready |
| Resizable | ui/resizable.tsx | Ready |
| Scroll Area | ui/scroll-area.tsx | Ready |
| Select | ui/select.tsx | Ready |
| Separator | ui/separator.tsx | Ready |
| Sheet | ui/sheet.tsx | Ready |
| Sidebar | ui/sidebar.tsx | Ready |
| Skeleton | ui/skeleton.tsx | Ready |
| Sonner (Toast) | ui/sonner.tsx | Ready |
| Switch | ui/switch.tsx | Ready |
| Table | ui/table.tsx | Ready |
| Tabs | ui/tabs.tsx | Ready |
| Textarea | ui/textarea.tsx | Ready |
| Toggle Group | ui/toggle-group.tsx | Ready |
| Toggle | ui/toggle.tsx | Ready |
| Tooltip | ui/tooltip.tsx | Ready |
| use-mobile | ui/use-mobile.ts | Ready |
| utils (cn) | ui/utils.ts | Ready |

## Legacy Components (reference only — will not be directly copied)

| Component | File | Notes |
|-----------|------|-------|
| AIAnalyticsPanel | legacy src/components/ | Admin AI usage charts |
| AIOpportunitySummary | legacy src/components/ | AI opportunity summary display |
| ApplyButton | legacy src/components/ | Apply link with click tracking |
| CategoryBadge | legacy src/components/ | Colored category badge |
| CopyLinkButton | legacy src/components/ | Copy-to-clipboard |
| DeadlineCountdown | legacy src/components/ | Days remaining display |
| ExpiringSoon | legacy src/components/ | Expiring opportunities section |
| FilterBar | legacy src/components/ | Filtering UI |
| Footer | legacy src/components/ | Site footer |
| LinkTypeIndicator | legacy src/components/ | Link type indicator |
| LoadingSkeleton | legacy src/components/ | Skeleton loading states |
| Navbar | legacy src/components/ | Top navigation |
| NewsCard | legacy src/components/ | News article card |
| NewsImage | legacy src/components/ | News image with fallback |
| OpportunityCard | legacy src/components/ | Opportunity listing card |
| OpportunityDisclaimer | legacy src/components/ | Disclaimer for accuracy |
| ReportIssueModal | legacy src/components/ | Report broken link modal |
| SearchBar | legacy src/components/ | Search input |
| ShareButtons | legacy src/components/ | Social share buttons |
| SimilarOpportunities | legacy src/components/ | Related opportunities |
| SubscribeModal | legacy src/components/ | Subscribe popup |
| SubscribeSection | legacy src/components/ | Inline subscribe form |
| VerificationBadge | legacy src/components/ | Verification status badge |

## Component Migration Plan

Shadcn/ui components will be used as the base. Figma design components will be rebuilt on top of:
- `Button` → shadcn Button
- `Badge` → shadcn Badge + variants
- `Card` → shadcn Card
- `Skeleton` → shadcn Skeleton
- `Tabs` → shadcn Tabs
- `Sheet/Drawer` → shadcn Sheet/Drawer
- `Dialog` → shadcn Dialog
- `DropdownMenu` → shadcn Dropdown Menu
- `Avatar` → shadcn Avatar
- `Progress` → shadcn Progress
- `Form` → shadcn Form + React Hook Form
