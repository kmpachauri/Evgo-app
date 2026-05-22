import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';

export default function CongratulationsScreen() {
  const { phone, password } = useLocalSearchParams();

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Congratulations !</Text>

        <Text style={styles.body}>
          You have successfully{'\n'}
          Registration with{'\n'}
          EVgo.{'\n'}
          Here are your details{'\n'}
          Mobile No: {phone || '—'}{'\n'}
          Password: {password || '—'}{'\n'}
          -{'\n\n'}
          Eagerly awaiting your visit{'\n\n'}
          Regards, Team EVgo
        </Text>

        <TouchableOpacity style={styles.btn} onPress={() => router.replace('/login')}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF', borderRadius: 16,
    padding: 28, width: '100%', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 10, elevation: 6,
  },
  title: {
    fontSize: 26, fontWeight: '900', color: colors.primary,
    textAlign: 'center', marginBottom: 20,
  },
  body: {
    fontSize: 15, color: '#1A1A1A', textAlign: 'center',
    lineHeight: 24, marginBottom: 24,
  },
  btn: {
    width: '100%', backgroundColor: colors.primaryDark,
    borderRadius: 10, paddingVertical: 14, alignItems: 'center',
  },
  btnText: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
});
