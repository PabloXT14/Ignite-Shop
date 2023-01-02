import type * as Stitches from '@stitches/react';
import { HTMLAttributes } from 'react';
import { SpinnerContainer } from "./styles";

type SpinnerLoadingProps = HTMLAttributes<HTMLDivElement> & Stitches.VariantProps<typeof SpinnerContainer>

export function SpinnerLoading(props: SpinnerLoadingProps) {
  return (
    <SpinnerContainer {...props}>
      <div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
      </div>
    </SpinnerContainer>
  )
}