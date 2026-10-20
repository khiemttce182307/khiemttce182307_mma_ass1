import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { INITIAL_ACTIVITIES } from '../constants/activities';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { getItem, setItem } from '../storage/storage';
import { useTheme } from '../context/ThemeContext';
import ActivityItem from '../components/ActivityItem';

const CATEGORIES = ['All', 'Favorites', 'Technology', 'Sports', 'Design', 'Music', 'Reading'];

export default function ActivityScreen() {
  const { colors } = useTheme();

  // 1. State danh sach activities
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 2. Hydrate danh sach tu AsyncStorage khi vao man hinh
  useEffect(() => {
    async function hydrateActivities() {
      const savedActivities = await getItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
      if (Array.isArray(savedActivities)) {
        setActivities(savedActivities);
      }
    }
    hydrateActivities();
  }, []);

  // 3. Ham tuong tac: Toggle Favorite & luu AsyncStorage
  const handleToggleFavorite = async (id) => {
    const updatedList = activities.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setActivities(updatedList);
    await setItem(STORAGE_KEYS.ACTIVITIES, updatedList);
  };

  // 4. Loc danh sach theo category dang chon
  const filteredActivities = activities.filter((item) => {
    if (selectedCategory === 'Favorites') return item.isFavorite;
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const favoriteCount = activities.filter((item) => item.isFavorite).length;

  // 5. Giao dien khi danh sach trong (Empty State)
  const renderEmptyComponent = () => (
    <View style={[styles.emptyContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={styles.emptyIcon}>📭</Text>
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No Activities Found</Text>
      <Text style={[styles.emptyDescription, { color: colors.subText }]}>
        {selectedCategory === 'Favorites'
          ? "You haven't marked any activities as favorite yet. Tap the star icon on any activity to add it here!"
          : activities.length === 0
          ? "All activities have been cleared."
          : `No activities found under the "${selectedCategory}" category.`}
      </Text>

      {/* Nut Reset du lieu mau & cap nhat storage */}
      {activities.length === 0 || selectedCategory !== 'All' ? (
        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: colors.primary }]}
          onPress={async () => {
            setActivities(INITIAL_ACTIVITIES);
            setSelectedCategory('All');
            await setItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
          }}
        >
          <Text style={[styles.resetButtonText, { color: colors.primaryText }]}>Reset All Activities</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header thong ke & Nut Clear List */}
      <View style={styles.statsRow}>
        <Text style={[styles.statsText, { color: colors.text }]}>
          Showing <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{filteredActivities.length}</Text> / {activities.length} activities
        </Text>
        <View style={styles.headerActions}>
          <Text style={[styles.favoriteCounter, { color: colors.subText }]}>
            ★ {favoriteCount}
          </Text>
          {activities.length > 0 && (
            <TouchableOpacity
              onPress={async () => {
                setActivities([]);
                await setItem(STORAGE_KEYS.ACTIVITIES, []);
              }}
              style={[styles.clearBtn, { borderColor: colors.danger }]}
            >
              <Text style={{ color: colors.danger, fontSize: 12, fontWeight: '600' }}>Clear List</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: isSelected ? colors.primary : colors.card,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[styles.filterChipText, { color: isSelected ? colors.primaryText : colors.text }]}>
                  {category}
                  {category === 'Favorites' ? ` (${favoriteCount})` : ''}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* FlatList */}
      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityItem item={item} onToggleFavorite={handleToggleFavorite} />
        )}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={[
          styles.listContent,
          filteredActivities.length === 0 && styles.listContentEmpty,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  statsText: { fontSize: 14 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  favoriteCounter: { fontSize: 14, fontWeight: 'bold' },
  clearBtn: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  filterSection: { paddingVertical: 8 },
  filterList: { paddingHorizontal: 16, gap: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  filterChipText: { fontSize: 13, fontWeight: '600' },
  listContent: { padding: 16, paddingBottom: 24 },
  listContentEmpty: { flexGrow: 1, justifyContent: 'center' },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', padding: 28, borderRadius: 16, borderWidth: 1, gap: 10 },
  emptyIcon: { fontSize: 48, marginBottom: 4 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold' },
  emptyDescription: { fontSize: 14, textAlign: 'center', lineHeight: 20, paddingHorizontal: 10 },
  resetButton: { marginTop: 12, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  resetButtonText: { fontSize: 14, fontWeight: '600' },
});
