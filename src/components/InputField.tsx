import React, { ComponentProps } from 'react';
import { Input } from '../ui';

type InputProps = ComponentProps<typeof Input> & { isOutlined?: boolean };

export const InputField = (props: InputProps) => {
  return (
    <Input
      bg={props?.isOutlined ? 'transparent' : '$background'}
      color="black"
      placeholderTextColor="black"
      borderColor={'$accent9'}
      {...props}
    />
  );
};
