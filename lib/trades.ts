export interface Trade {
  id: string;
  name: string;
  blurb: string;
  medianPay: string;
}

export const TRADES: Trade[] = [
  {
    id: "electrical",
    name: "Electrical",
    blurb: "Wire buildings, troubleshoot systems, and work toward a licensed electrician career.",
    medianPay: "$61k/yr median",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    blurb: "Install and repair the systems every building depends on. Steady, in-demand work.",
    medianPay: "$62k/yr median",
  },
  {
    id: "carpentry",
    name: "Carpentry",
    blurb: "Build and frame structures from the ground up. Hands-on, visible results every day.",
    medianPay: "$58k/yr median",
  },
  {
    id: "hvac",
    name: "HVAC",
    blurb: "Heating, cooling, and ventilation — one of the fastest-growing trades right now.",
    medianPay: "$59k/yr median",
  },
  {
    id: "welding",
    name: "Welding",
    blurb: "Precision, fabrication, and problem solving. In demand across construction and manufacturing.",
    medianPay: "$60k/yr median",
  },
];

export function getTrade(id: string | null | undefined): Trade | undefined {
  return TRADES.find((t) => t.id === id);
}
