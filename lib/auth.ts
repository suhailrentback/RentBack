// Demo build-safe stub for legacy auth helpers.
// Left here so any accidental imports don't break builds.

export type DemoUser = {
  id: string;
  role: "TENANT" | "LANDLORD" | "ADMIN";
};

export function demoAuthenticate(_username: string, _password: string): DemoUser | null {
  // Always returns a demo tenant. Real auth is out of scope for this demo.
  return { id: "demo", role: "TENANT" };
}
