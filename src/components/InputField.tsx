import React, { ComponentProps } from 'react';
import { Input } from '../ui';

type InputProps = ComponentProps<typeof Input>;

export const InputField = (props: InputProps) => {
  return (
    <Input
      bg="$background"
      color="black"
      placeholderTextColor="black"
      borderColor={'$accent9'}
      {...props}
    />
  );
};
