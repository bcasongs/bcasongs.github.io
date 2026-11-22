import { h, type Component } from 'vue';
import type { IconAliases, IconProps, IconSet } from 'vuetify';
import {
  ALargeSmall,
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsLeft,
  ChevronsRight,
  Circle,
  CircleAlert,
  CircleCheck,
  CircleDot,
  CircleUserRound,
  GripVertical,
  Info,
  ListEnd,
  ListMusic,
  ListPlus,
  ListStart,
  ListX,
  LoaderCircle,
  Menu,
  Moon,
  Music,
  Paperclip,
  Pencil,
  Plus,
  Search,
  Share2,
  Square,
  SquareCheck,
  SquareMinus,
  Star,
  Sun,
  Trash2,
  TriangleAlert,
  Upload,
  X,
  Calendar
} from '@lucide/vue';

export const ICON_MAP: Record<string, Component> = {
  // App icons
  search: Search,
  close: X,
  queue_music: ListMusic,
  account_circle: CircleUserRound,
  add: Plus,
  playlist_add: ListPlus,
  playlist_remove: ListX,
  share: Share2,
  chevron_left: ChevronLeft,
  format_size: ALargeSmall,
  music_note: Music,
  edit: Pencil,
  check: Check,
  add_row_above: ListStart,
  add_row_below: ListEnd,
  delete: Trash2,
  drag_indicator: GripVertical,
  arrow_drop_down: ChevronDown,
  light_mode: Sun,
  dark_mode: Moon,

  // Additional Vuetify alias targets
  chevron_down: ChevronDown,
  chevron_right: ChevronRight,
  chevron_up: ChevronUp,
  chevrons_left: ChevronsLeft,
  chevrons_right: ChevronsRight,
  arrow_up: ArrowUp,
  arrow_down: ArrowDown,
  alert_circle: CircleAlert,
  check_circle: CircleCheck,
  info: Info,
  warning: TriangleAlert,
  menu: Menu,
  circle: Circle,
  circle_dot: CircleDot,
  square: Square,
  square_check: SquareCheck,
  square_minus: SquareMinus,
  star: Star,
  loading: LoaderCircle,
  paperclip: Paperclip,
  calendar: Calendar,
  upload: Upload
};

export const lucideAliases: Partial<IconAliases> = {
  collapse: 'chevron_up',
  complete: 'check',
  cancel: 'close',
  close: 'close',
  delete: 'close',
  clear: 'close',
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'alert_circle',
  prev: 'chevron_left',
  next: 'chevron_right',
  checkboxOn: 'square_check',
  checkboxOff: 'square',
  checkboxIndeterminate: 'square_minus',
  delimiter: 'circle',
  sortAsc: 'arrow_up',
  sortDesc: 'arrow_down',
  expand: 'chevron_down',
  menu: 'menu',
  subgroup: 'arrow_drop_down',
  dropdown: 'arrow_drop_down',
  radioOn: 'circle_dot',
  radioOff: 'circle',
  edit: 'edit',
  ratingEmpty: 'star',
  ratingFull: 'star',
  ratingHalf: 'star',
  loading: 'loading',
  first: 'chevrons_left',
  last: 'chevrons_right',
  unfold: 'arrow_drop_down',
  file: 'paperclip',
  plus: 'add',
  minus: 'square_minus',
  calendar: 'calendar',
  upload: 'upload'
};

export const lucideIconSet: IconSet = {
  component: (props: IconProps) => {
    const iconName = typeof props.icon === 'string'
      ? props.icon
      : (props.icon as { icon?: string })?.icon;
    const IconComponent = iconName ? ICON_MAP[iconName] : undefined;

    if (!IconComponent) {
      return null;
    }

    return h(IconComponent, {
      size: '1em',
      strokeWidth: 1.85,
      style: { flexShrink: 0 }
    });
  }
};
