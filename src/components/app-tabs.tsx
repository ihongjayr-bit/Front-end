import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Events</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="announcements">
        <NativeTabs.Trigger.Label>Announcements</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/announcements.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="organizations">
      <NativeTabs.Trigger.Label>Organizations</NativeTabs.Trigger.Label>
      <NativeTabs.Trigger.Icon
        src={require('@/assets/images/tabIcons/home.png')}
        renderingMode="template"
      />
    </NativeTabs.Trigger>

    <NativeTabs.Trigger name="venues">
      <NativeTabs.Trigger.Label>Venues</NativeTabs.Trigger.Label>
      <NativeTabs.Trigger.Icon
        src={require('@/assets/images/tabIcons/home.png')}
        renderingMode="template"
      />
    </NativeTabs.Trigger>
    
    </NativeTabs>

  );
}
