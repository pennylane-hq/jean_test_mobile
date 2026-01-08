import { XStack, Button, Text, useTheme } from 'tamagui';

type Props<T> = {
  values: T[];
  value: T;
  onChange: (unit: T) => void;
};

export function SelectableChips<T>({ values, value, onChange }: Props<T>) {
  const theme = useTheme();
  return (
    <XStack gap="$2">
      {values.map((unit) => {
        const active = unit === value;

        return (
          <Button
            key={unit}
            size="$3"
            borderRadius="$10"
            borderColor={'$accentColor'}
            backgroundColor={active ? theme?.accentBackground : theme.background}
            onPress={() => onChange(unit)}>
            <Text>{unit}</Text>
          </Button>
        );
      })}
    </XStack>
  );
}
