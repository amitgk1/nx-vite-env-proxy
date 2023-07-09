import { loadEnv, type Plugin } from 'vite';
import { z } from 'zod';

export const ProxyURLConfig = {
  BACKEND: '/api',
} as const;

const serverOnlyEnvSchema = z.object({
  BACKEND_URL: z.string().url(),
});

export const runtimeEnvSchema = z.object({
  VITE_MY_VAR: z.string(),
});

export const proxyPlugin = (): Plugin => {
  return {
    name: 'vite-plugin-proxy',
    apply: 'serve',
    config(userConfig, envConfig) {
      // validate runtime env variables
      runtimeEnvSchema.parse(
        loadEnv(
          userConfig.mode ?? envConfig.mode,
          process.cwd(),
          userConfig.envPrefix
        )
      );

      //validate and use server only env vars
      const serverOnlyEnv = serverOnlyEnvSchema.parse(process.env);
      return {
        ...userConfig,
        server: {
          proxy: {
            [ProxyURLConfig.BACKEND]: {
              target: serverOnlyEnv.BACKEND_URL,
              rewrite: (path) => path.replace(ProxyURLConfig.BACKEND, ''),
            },
          },
        },
      };
    },
  };
};
