import { XStack, Input, Button, useTheme } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

export type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
  onClear?: () => void;
};

export const SearchBar = ({ value, onChange, onClear }: SearchBarProps) => {
  const theme = useTheme();

  return (
    <XStack
      px="$3"
      py="$2"
      mb="$2"
      style={{ borderRadius: 8, alignItems: 'center' }}
      bg="$backgroundHover"
      borderWidth={1}
      borderColor="$borderColor">
      <MaterialIcons name="search" size={24} color={theme.color02.get()} />

      <Input
        flex={1}
        borderWidth={0}
        ml="$2"
        placeholder="Search"
        value={value}
        onChangeText={(text: unknown) => onChange(text as string)}
      />

      {value.length > 0 && (
        <Button unstyled onPress={onClear}>
          <MaterialIcons name="close" size={24} color={theme.color02.get()} />
        </Button>
      )}
    </XStack>
  );
};
