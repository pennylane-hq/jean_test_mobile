import { YStack, Text } from '../ui';

type ContentSectionType = {
  title?: string;
  children: React.ReactNode;
};

export const ContentSection = ({ title, children }: ContentSectionType) => {
  return (
    <>
      {title ? <Text color="black">{title}</Text> : null}
      <YStack gap="$1" style={{ width: '100%', borderRadius: 8, overflow: 'hidden' }}>
        {children}
      </YStack>
    </>
  );
};
