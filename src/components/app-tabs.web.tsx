import {
  TabList,
  TabListProps,
  Tabs,
  TabSlot,
  TabTrigger,
  TabTriggerSlotProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { colors } from '@/constants/ui';

type IconName = 'events' | 'announcements' | 'organizations' | 'venues';

const COLUMN_WIDTH = 600;

/**
 * Same breakpoints idea as X:
 *  >= 1265px  sidebar with labels (275px)
 *  >= 700px   icons-only sidebar (88px)
 *  <  700px   bottom bar
 */
function useLayout() {
  const { width } = useWindowDimensions();
  const mobile = width < 700;
  const compact = width < 1265;
  const sidebarWidth = mobile ? 0 : compact ? 88 : 275;
  // centers [sidebar + feed] together, like X
  const left = mobile ? 0 : Math.max(0, (width - sidebarWidth - COLUMN_WIDTH) / 2);
  return { mobile, compact, sidebarWidth, left };
}

export default function AppTabs() {
  const { mobile, sidebarWidth, left } = useLayout();

  return (
    <Tabs>
      <TabSlot
        style={{
          height: '100%',
          backgroundColor: colors.background,
          paddingLeft: left + sidebarWidth,
          paddingRight: left,
          paddingBottom: mobile ? 64 : 0,
        }}
      />
      <TabList asChild>
        <Sidebar>
          <TabTrigger name="index" href="/" asChild>
            <NavButton icon="events">Events</NavButton>
          </TabTrigger>
          <TabTrigger name="announcements" href="/announcements" asChild>
            <NavButton icon="announcements">Announcements</NavButton>
          </TabTrigger>
          <TabTrigger name="organizations" href="/organizations" asChild>
            <NavButton icon="organizations">Organizations</NavButton>
          </TabTrigger>
          <TabTrigger name="venues" href="/venues" asChild>
            <NavButton icon="venues">Venues</NavButton>
          </TabTrigger>
        </Sidebar>
      </TabList>
    </Tabs>
  );
}

function Sidebar(props: TabListProps) {
  const { mobile, compact, sidebarWidth, left } = useLayout();

  return (
    <View
      {...props}
      style={[
        styles.sidebar,
        mobile
          ? styles.bottomBar
          : { left, width: sidebarWidth, top: 0, bottom: 0 },
        compact && !mobile && styles.sidebarCompact,
      ]}
    >
      {!mobile && <Brand compact={compact} />}
      {props.children}
    </View>
  );
}

function Brand({ compact }: { compact: boolean }) {
  return (
    <View style={styles.brand}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>O</Text>
      </View>
      {!compact && (
        <Text style={styles.brandName} numberOfLines={1}>
          OCC Event Notifier
        </Text>
      )}
    </View>
  );
}

export function NavButton({
  children,
  isFocused,
  icon,
  ...props
}: TabTriggerSlotProps & { icon: IconName }) {
  const { compact } = useLayout();

  return (
    <Pressable
      {...props}
      aria-label={String(children)}
      style={({ pressed, hovered }: any) => [
        styles.navItem,
        compact && styles.navItemCompact,
        (pressed || hovered) && styles.navItemActive,
      ]}
    >
      <Icon name={icon} active={!!isFocused} />
      {!compact && (
        <Text style={[styles.navLabel, isFocused && styles.navLabelActive]}>{children}</Text>
      )}
    </Pressable>
  );
}

/** Simple outline icons, drawn inline (web only). */
function Icon({ name, active }: { name: IconName; active: boolean }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: colors.text,
    strokeWidth: active ? 2.6 : 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;

  switch (name) {
    case 'events':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'announcements':
      return (
        <svg {...common}>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'organizations':
      return (
        <svg {...common}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'venues':
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
  }
}

const styles = StyleSheet.create({
  sidebar: {
    // pinned to the screen so it stays put while the feed scrolls
    position: 'fixed' as 'absolute',
    zIndex: 10,
    paddingHorizontal: 12,
    paddingTop: 4,
    backgroundColor: colors.background,
  },
  sidebarCompact: { alignItems: 'center' },
  bottomBar: {
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 0,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  brandName: { flex: 1, color: colors.text, fontSize: 18, fontWeight: '800' },

  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 20,
    padding: 12,
    borderRadius: 999,
  },
  navItemCompact: { alignSelf: 'center' },
  navItemActive: { backgroundColor: colors.navHover },
  navLabel: { color: colors.text, fontSize: 20, lineHeight: 24, fontWeight: '400', paddingRight: 16 },
  navLabelActive: { fontWeight: '700' },
});