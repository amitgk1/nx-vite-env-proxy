/// <reference types="vite/client" />

type bla = import('zod').infer<
  typeof import('@nx-vite-env-proxy/vite-plugin-proxy').runtimeEnvSchema
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv extends bla {}
