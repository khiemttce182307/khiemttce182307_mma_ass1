import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ActivityItem({ item, onToggleFavorite }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* Icon danh muc */}
      <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>

      {/* Noi dung chi tiet */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={[styles.badge, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              {item.category}
            </Text>
          </View>
        </View>

        <Text style={[styles.description, { color: colors.subText }]} numberOfLines={2}>
          {item.description}
        </Text>
      </View>

      {/* Nut tuong tac: Toggle Favorite */}
      <TouchableOpacity
        style={[
          styles.favoriteButton,
          {
            backgroundColor: item.isFavorite ? '#FFF3CD' : colors.background,
            borderColor: item.isFavorite ? '#FFEBAA' : colors.border,
          },
        ]}
        onPress={() => onToggleFavorite(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.favoriteIcon}>
          {item.isFavorite ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  favoriteButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 18,
    color: '#E0A800',
  },
});
