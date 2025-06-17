// spinner.tsx
import styled, { keyframes } from 'styled-components';

/* === keyframes === */
const ripple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 8px;
    height: 8px;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    opacity: 0;
  }
`;

/* === visually-hidden helper === */
export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

/* === loader === */
interface SpinnerProps {
  size?: string;
  color?: string;
}

export const Spinner = styled.div<SpinnerProps>`
  display: inline-block;
  position: relative;
  width: ${props => props.size || '80px'};
  height: ${props => props.size || '80px'};

  &::before,
  &::after {
    content: '';
    position: absolute;
    border: 4px solid ${props => props.color || '#92BB8F'};
    opacity: 1;
    border-radius: 50%;
    animation: ${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  &::after {
    animation-delay: -0.5s;
  }
`;


