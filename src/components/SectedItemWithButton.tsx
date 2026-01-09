import { Button } from '../ui';
import { FoundListItem } from '../components/FoundListItem';

type SelectedItemWithButtonParams = {
  selectedItemTitle?: string;
  selectedItemSubtitle?: string;
  selectBtnTitle: string;
  onSelect?: () => void;
  isEditable?: boolean;
};

export const SelectedItemWithButton = ({
  selectedItemTitle,
  selectedItemSubtitle,
  selectBtnTitle,
  onSelect,
  isEditable = true,
}: SelectedItemWithButtonParams) => {
  return (
    <>
      {selectedItemSubtitle ? (
        <FoundListItem
          title={selectedItemTitle}
          subtitle={selectedItemSubtitle}
          onPress={onSelect}
          isEditable={isEditable}
        />
      ) : (
        <Button onPress={onSelect} my="$2">
          {selectBtnTitle}
        </Button>
      )}
    </>
  );
};
