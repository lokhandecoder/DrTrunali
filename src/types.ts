export type ThemeId = 'rose-champagne' | 'midnight-starlight' | 'sunset-amber' | 'lavender-mist';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  badge: string;
  icon: string;
  bgClass: string;
  cardBgClass: string;
  cardBorderClass: string;
  textHeadingGradient: string;
  textSubheading: string;
  badgeBgClass: string;
  badgeTextClass: string;
  yesBtnGradient: string;
  yesBtnShadow: string;
  noBtnClass: string;
  accentColor: string;
}

export interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  speed: number;
  drift: number;
  opacity: number;
  color: string;
  shape: 'rose' | 'cherry' | 'heart' | 'sparkle' | 'blossom';
}

export interface DateActivity {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  tag: string;
  badgeColor: string;
}

export interface CelebrationState {
  isAccepted: boolean;
  acceptedAt: Date | null;
  selectedActivity?: string;
  customNote?: string;
  friendName?: string;
}

export type GreetingFontStyle = 'pinyon' | 'alex' | 'parisienne' | 'italiana' | 'cormorant';

export interface FontStyleOption {
  id: GreetingFontStyle;
  name: string;
  fontClass: string;
  previewClass: string;
}

