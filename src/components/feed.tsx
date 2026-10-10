import { ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '@/constants/ui';

/**
 * Page wrapper styled like X's timeline:
 * bordered 600px column, sticky header with a tab-style title,
 * or a back arrow + title when onBack is passed (like a post page).
 */
export function Feed({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack?: () => void;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  // phones: keep the sticky header below the status bar
  const headerTop = Platform.OS === 'web' ? 0 : insets.top;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.column}
      stickyHeaderIndices={[0]}
    >
      <View style={[styles.header, { paddingTop: headerTop }]}>
        {onBack ? (
          <View style={styles.backRow}>
            <Pressable
              onPress={onBack}
              accessibilityLabel="Back"
              style={({ pressed, hovered }: any) => [
                styles.backButton,
                (pressed || hovered) && styles.backButtonActive,
              ]}
            >
              <Text style={styles.backIcon}>←</Text>
            </Pressable>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        ) : (
          <View style={styles.tab}>
            <View style={styles.tabInner}>
              <Text style={styles.tabText}>{title}</Text>
              <View style={styles.tabUnderline} />
            </View>
          </View>
        )}
      </View>
      {children}
    </ScrollView>
  );
}

/** Round avatar showing the first letter of a name. */
export function Avatar({ name, size = 40 }: { name?: string; size?: number }) {
  const initial = String(name ?? '?').trim().charAt(0).toUpperCase();
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[styles.avatarText, { fontSize: size * 0.42 }]}>{initial}</Text>
    </View>
  );
}

/** One row in the feed (like a post). Pass onPress to make it tappable. */
export function FeedItem({
  title,
  body,
  onPress,
}: {
  title: string;
  body?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed, hovered }: any) => [
        styles.item,
        (pressed || hovered) && styles.itemActive,
      ]}
    >
      <Avatar name={title} />
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        {!!body && <Text style={styles.itemBody}>{body}</Text>}
      </View>
    </Pressable>
  );
}

/** Loading / empty text. */
export function Message({ children }: { children: ReactNode }) {
  return <Text style={styles.message}>{children}</Text>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  column: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    paddingBottom: 40,
    ...Platform.select({
      web: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.border,
      },
    }),
  },

  // ---- sticky header ----
  header: {
    backgroundColor: Platform.select({
      web: colors.backgroundBlur,
      default: colors.background,
    }),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...Platform.select({ web: { backdropFilter: 'blur(12px)' } as any }),
  },
  tab: { height: 53, alignItems: 'center', justifyContent: 'center' },
  tabInner: { height: 53, justifyContent: 'center', paddingHorizontal: 16 },
  tabText: { fontSize: 15, fontWeight: '700', color: colors.text },
  tabUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    borderRadius: 9999,
    backgroundColor: colors.accent,
  },
  backRow: {
    height: 53,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.text },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    marginLeft: -8,
  },
  backButtonActive: { backgroundColor: colors.navHover },
  backIcon: { fontSize: 20, color: colors.text },

  // ---- rows ----
  avatar: {
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.accent, fontWeight: '700' },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemActive: { backgroundColor: colors.rowHover },
  itemContent: { flex: 1, marginLeft: 12 },
  itemTitle: { fontSize: 15, lineHeight: 20, fontWeight: '700', color: colors.text },
  itemBody: { fontSize: 15, lineHeight: 20, color: colors.text, marginTop: 2 },

  message: { padding: 24, fontSize: 15, color: colors.textMuted, textAlign: 'center' },
});