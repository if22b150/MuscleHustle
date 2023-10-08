export interface Schedule {
  id: number;
  trainerId: number;
  clientId: number;
  name: string;
  exercises: string;
  client: string;
  enabledForClient: boolean;
}
