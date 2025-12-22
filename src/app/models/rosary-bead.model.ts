// Rosary Bead model for Witchfire Hub
export interface RosaryBead {
  id: string;
  name: string;
  type: string;
  tier: string | null;
  effect: string;
  requirement: RosaryBeadRequirement;
  location: string;
  image?: string;
}

export interface RosaryBeadRequirement {
  flesh?: number | null;
  blood?: number | null;
  mind?: number | null;
  witchery?: number | null;
  arsenal?: number | null;
  faith?: number | null;
}
