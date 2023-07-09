// eslint-disable-next-line @nx/enforce-module-boundaries
import {ProxyURLConfig} from "@nx-vite-env-proxy/vite-plugin-proxy"; // need the dynamic import in client.d.ts for import.meta.env

export function App() {
  console.log(import.meta.env.VITE_MY_VAR === "bla")
  
  // imagine using react-query with a fetch to ProxyURLConfig.BACKEND (type safety is everything)
  console.log(ProxyURLConfig.BACKEND)
  
  return (
    <div>
      <h1>
        <span> Hello there, </span>
        Welcome test-app 👋
      </h1>
    </div>
  );
}

export default App;

if (import.meta.vitest) {
  // add tests related to your file here
  // For more information please visit the Vitest docs site here: https://vitest.dev/guide/in-source.html

  const { it, expect, beforeEach } = import.meta.vitest;
  let render: any;

  beforeEach(async () => {
    render = (await import('@testing-library/react')).render;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Welcome test-app/gi)).toBeTruthy();
  });
}
