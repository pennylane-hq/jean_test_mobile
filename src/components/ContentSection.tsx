import { YStack, Text } from '../ui';

type ContentSectionType = {
  title?: string;
  children: React.ReactNode;
};

export const ContentSection = ({ title, children }: ContentSectionType) => {
  return (
    <>
      {title ? <Text color="black">{title}</Text> : null}
      <YStack gap="$1" bg="$accent12" p="$4" style={{ width: '100%', borderRadius: 8 }}>
        {children}
      </YStack>
    </>
  );
};
