import { XStack, Button, Text, useTheme } from 'tamagui';

type Key = {
  id: string | number;
};

type Props<T extends Key> = {
  values: T[];
  value: T;
  onChange: (unit: T) => void;
};

export function SelectableChips<T extends Key>({ values, value, onChange }: Props<T>) {
  const theme = useTheme();
  return (
    <XStack gap="$2">
      {values.map((unit) => {
        const active = unit === value;

        return (
          <Button
            key={unit.id}
            size="$3"
            style={{ borderRadius: '$10' }}
            borderColor={'$accentColor'}
            bg={active ? theme?.accentBackground : theme.background}
            onPress={() => onChange(unit)}>
            <Text>{unit}</Text>
          </Button>
        );
      })}
    </XStack>
  );
}
