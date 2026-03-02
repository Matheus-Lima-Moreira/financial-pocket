export type SessionProfileDTO = {
  id: string;
  name: string;
  avatar: string;
  position: string;
  registerFrom: string;
  requirements: {
    email: boolean;
    password: boolean;
  }
}