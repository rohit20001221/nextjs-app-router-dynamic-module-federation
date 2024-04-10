"use client";

import React, { Suspense } from "react";
import useDynamicScript from "../../hooks/mfe.hooks";

globalThis.React = React;

async function loadComponent(scope: string, module: any) {
  // @ts-ignore
  const container = global[scope]; // or get the container somewhere else
  // Initialize the container, it may provide shared modules

  // await container.init(__webpack_share_scopes__.default);
  // @ts-ignore
  await container.init(
    Object.assign(
      {
        react: {
          default: {
            get: () => Promise.resolve(() => require("react")),
            loaded: true,
          },
        },
      },
      // @ts-ignore
      __webpack_share_scopes__.default
    )
  );

  // @ts-ignore
  const factory = await global[scope].get(module);
  const Module = factory();
  return Module;
}

function RemoteComponent(props: {
  module: string;
  url: string;
  scope: string;
  children?: any;
}) {
  const { children } = props;
  const { ready, failed } = useDynamicScript({
    url: props.module && props.url,
  });

  if (!props.module) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <h2>Loading dynamic script: {props.url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  if (!global) return null;

  const Component = React.lazy(async () => {
    const m = await loadComponent(props.scope, props.module);
    return m;
  });

  return (
    <Suspense fallback="Loading Module">
      <Component>{children}</Component>
    </Suspense>
  );
}

export default RemoteComponent;
