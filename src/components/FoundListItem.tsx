import React from 'react';
import { ListItem, useTheme } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

type CustomerSearchSheetType = {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  isEditable?: boolean;
};

export const FoundListItem = ({
  title,
  subtitle,
  isEditable = true,
  onPress,
}: CustomerSearchSheetType) => {
  const theme = useTheme();

  return (
    <ListItem
      title={title}
      subTitle={subtitle}
      bg={'transparent'}
      borderColor={'$accent1'}
      borderWidth={'$1'}
      style={{ borderRadius: 8 }}
      icon={
        isEditable ? (
          <MaterialIcons name="find-replace" size={22} color={theme.accent1.get()} />
        ) : (
          <MaterialIcons name="person" size={22} color={theme.accent1.get()} />
        )
      }
      onPress={onPress}
    />
  );
};
