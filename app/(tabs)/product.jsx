import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import PlanCard from '../../components/PlanCard';
import { colors } from '../../constants/colors';
import { useApp } from '../../context/AppContext';

export default function ProductScreen() {
  const { devices, loading, error, refreshAppData } = useApp();

  useEffect(() => {
    refreshAppData();
  }, [refreshAppData]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={devices}
        keyExtractor={(item, index) => String(item?.id ?? item?.name ?? index)}
        renderItem={({ item }) => <PlanCard plan={item} />}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>EVgo-EARN</Text>
            <Text style={styles.subtitle}>Choose a plan and view the live earning details below.</Text>
          </View>
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No plans available</Text>
              <Text style={styles.emptyText}>Plans will appear here once they are loaded from the backend.</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          <>
            {loading ? <Text style={styles.statusText}>Loading plans...</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 28,
    paddingBottom: 28,
  },
  header: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 18,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.deepGreen,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.deepGreen,
  },
  emptyText: {
    marginTop: 6,
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
  },
  statusText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF2F2',
    textAlign: 'center',
  },
});
