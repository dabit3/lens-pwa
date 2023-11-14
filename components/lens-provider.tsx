'use client'

import { LensProvider as Provider, LensConfig, production } from '@lens-protocol/react-web';
import { bindings as wagmiBindings } from '@lens-protocol/wagmi';

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: production,
};

export function LensProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider config={lensConfig}>
      {children}
    </Provider>
  );
}