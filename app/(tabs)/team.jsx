import * as Clipboard from 'expo-clipboard';
import { Alert, Platform, RefreshControl, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Card } from '../../components/evgo/Card';
import { colors } from '../../constants/colors';
import { useApp } from '../../context/AppContext';

export default function TeamScreen() {
  const { team, user, loading, error, refreshAppData } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const levels = team?.levels ?? [];
  const members = team?.members ?? [];

  useEffect(() => {
    refreshAppData();
  }, [refreshAppData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshAppData();
    setRefreshing(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <Card style={styles.inviteCard}>
        <View style={styles.codeBlock}>
          <Text style={styles.label}>Invite Code</Text>
          <Text style={styles.code}>{user?.inviteCode}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={async () => {
            const url = `https://evgo.site/register?ref=${user?.inviteCode || ''}`;
            await Clipboard.setStringAsync(url);
            Alert.alert('Copied', 'Invite link copied to clipboard.');
          }}>
            <Text style={styles.copyText}>Copy Invite Link</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.copyButton, styles.shareButton]} onPress={() => {
            const url = `https://evgo.site/register?ref=${user?.inviteCode || ''}`;
            if (Platform.OS === 'web') {
              if (navigator.share) {
                navigator.share({ title: 'Join EVgo', url });
              } else {
                Clipboard.setStringAsync(url);
                Alert.alert('Copied', 'Invite link copied (share not supported in this browser).');
              }
            } else {
              Share.share({ message: url });
            }
          }}>
            <Text style={styles.copyText}>Share Invite Link</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <View style={styles.stats}>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{team?.inviteCount ?? 0}</Text>
          <Text style={styles.statLabel}>Invite</Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{team?.validCount ?? 0}</Text>
          <Text style={styles.statLabel}>Valid</Text>
        </Card>
      </View>

      <View style={styles.levels}>
        {levels.map((level) => (
          <Text key={level.id} style={styles.level}>
            {level.label} ({level.count})
          </Text>
        ))}
      </View>

      {/* Beautiful Table */}
      <View style={styles.tableWrap}>
        {/* Header */}
        <View style={styles.tableHead}>
          {['ID', 'Mobile', 'DOJ', 'Status', 'DOA'].map((h) => (
            <Text key={h} style={styles.headCell}>{h}</Text>
          ))}
        </View>
        {/* Rows */}
        {members.map((member, i) => (
          <View key={member.id} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
            <Text style={styles.cell}>{member.id}</Text>
            <Text style={styles.cell}>{member.mobile}</Text>
            <Text style={styles.cell}>{member.joinedAt}</Text>
            <View style={styles.cellWrap}>
              <Text style={[
                styles.statusPill,
                member.status === 'Active' ? styles.statusGreen : styles.statusGray
              ]}>{member.status}</Text>
            </View>
            <Text style={styles.cell}>{member.activeAt}</Text>
          </View>
        ))}
        {members.length === 0 && !loading && (
          <Text style={styles.emptyText}>No members yet</Text>
        )}
      </View>
      {loading ? <Text style={styles.statusText}>Loading...</Text> : null}
      {error   ? <Text style={styles.statusText}>{error}</Text>   : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primary },
  content: { padding: 12, paddingBottom: 24 },
  inviteCard: { padding: 12, marginTop: 10 },
  codeBlock: { flex: 1 },
  label: { color: '#67707A', fontSize: 15 },
  code: {
    backgroundColor: '#F0F0F0', color: '#888888',
    fontSize: 18, fontWeight: '900', padding: 13,
    marginTop: 10, marginRight: 12,
  },
  copyButton: {
    marginTop: 11, marginRight: 12, height: 48,
    backgroundColor: colors.primary, alignItems: 'center',
    justifyContent: 'center', borderRadius: 3,
  },
  shareButton: {
    backgroundColor: colors.primaryDark ?? '#2a6000',
  },
  copyText: { color: '#FFFFFF', fontWeight: '800' },
  stats: { flexDirection: 'row', gap: 8, marginTop: 10 },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 11 },
  statValue: { color: colors.primary, fontSize: 29, fontWeight: '900' },
  statLabel: { color: colors.primary, fontSize: 14 },
  levels: { flexDirection: 'row', marginTop: 11 },
  level: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderWidth: 1, borderColor: '#E5E5E5',
    textAlign: 'center', color: colors.primary,
    paddingVertical: 12, fontWeight: '900',
  },
  sectionTitle: {
    color: '#FFFFFF', fontSize: 16, fontWeight: '900',
    marginTop: 16, marginBottom: 8, marginLeft: 4,
  },
  tableWrap: {
    marginTop: 14,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tableHead: {
    flexDirection: 'row',
    backgroundColor: colors.primaryDark,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  headCell: {
    flex: 1, color: '#FFFFFF', fontWeight: '900',
    fontSize: 11, textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10, paddingHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
  },
  tableRowAlt: {
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  cell: {
    flex: 1, fontSize: 11, color: '#1A1A1A',
    textAlign: 'center', fontWeight: '600',
  },
  cellWrap: { flex: 1, alignItems: 'center' },
  statusPill: {
    fontSize: 10, fontWeight: '800', paddingHorizontal: 7,
    paddingVertical: 3, borderRadius: 10, overflow: 'hidden',
    textAlign: 'center',
  },
  statusGreen: { backgroundColor: '#D4EDDA', color: '#1A6B35' },
  statusGray:  { backgroundColor: '#E0E0E0', color: '#555555' },
  emptyText: {
    color: 'rgba(255,255,255,0.7)', fontSize: 13,
    textAlign: 'center', padding: 16, fontStyle: 'italic',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  statusText: {
    color: '#FFFFFF', fontSize: 12, fontWeight: '800',
    textAlign: 'center', marginTop: 10,
  },
});
