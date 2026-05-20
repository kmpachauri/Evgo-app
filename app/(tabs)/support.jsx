import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Header } from '../../components/evgo/Header';
import { colors } from '../../constants/colors';
import { getSocialLinks } from '../../services/userService';

export default function SupportScreen() {
  const [links, setLinks] = useState(null);

  useEffect(() => {
    getSocialLinks()
      .then((res) => setLinks(res.data || {}))
      .catch(() => setLinks({}));
  }, []);

  const support = [
    { label: 'Telegram Channel', icon: 'telegram', color: '#35A9E1', url: links?.telegram },
    { label: 'Whatsapp Support', icon: 'whatsapp', color: '#0BAA20', url: links?.whatsapp },
    { label: 'Deposit Support', icon: 'telegram', color: '#35A9E1', url: links?.depositSupport },
    { label: 'Withdrawal Support', icon: 'telegram', color: '#35A9E1', url: links?.withdrawalSupport },
  ];

  const handlePress = (url) => {
    if (!url) {
      Toast.show({ type: 'info', text1: 'Coming Soon', text2: 'Link not configured yet.' });
      return;
    }
    Linking.openURL(url).catch(() => {
      Toast.show({ type: 'error', text1: 'Cannot open link', text2: url });
    });
  };

  return (
    <View style={styles.screen}>
      <Header title="Customer Service" />
      {links === null ? (
        <View style={styles.loader}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      ) : (
        <View style={styles.grid}>
          {support.map(({ label, icon, color, url }) => (
            <TouchableOpacity
              key={label}
              activeOpacity={0.84}
              style={styles.card}
              onPress={() => handlePress(url)}
            >
              <View style={styles.circle}>
                <FontAwesome name={icon} size={50} color={color} />
              </View>
              <Text style={styles.label}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.bottomIcon}>
        <Ionicons name="chatbubbles" size={72} color="rgba(255,255,255,0.16)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 19,
  },
  card: {
    width: '46%',
    height: 128,
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 7,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#7DCA59',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
    marginTop: 10,
    textAlign: 'center',
  },
  bottomIcon: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 44,
  },
});
