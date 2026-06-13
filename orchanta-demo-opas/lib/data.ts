// Sample data for the Opa's Smoked Meats wholesale-nav concept. All fictional, demo mode.

export type PersonaId = "guest" | "retail" | "b2b-new";
export type LogicMode = "broken" | "fixed";

export interface Persona {
  id: PersonaId;
  label: string;
  sub: string;
  /** What the Dawn theme's `customer.b2b?` check returns for this shopper —
   *  only true once a company-location B2B session is active. */
  b2bSessionFlag: boolean;
  /** What `customer.company_available_locations_count` returns — assigned
   *  company locations, set the moment the B2B customer is created. */
  companyLocationCount: number;
}

export const PERSONAS: Persona[] = [
  {
    id: "guest",
    label: "Guest",
    sub: "Not signed in",
    b2bSessionFlag: false,
    companyLocationCount: 0,
  },
  {
    id: "retail",
    label: "Retail customer",
    sub: "Hannah P. · shopping since 2024",
    b2bSessionFlag: false,
    companyLocationCount: 0,
  },
  {
    id: "b2b-new",
    label: "New B2B customer",
    sub: "Walnut Creek General Store · company account created today",
    b2bSessionFlag: false,
    companyLocationCount: 1,
  },
];

/** Mirrors the real opassmokedmeats.com main menu. */
export const BASE_NAV = ["Our Products", "Recipes", "Our Story", "Deli & Retail Store"];

export function showsWholesaleNav(p: Persona, mode: LogicMode): boolean {
  return mode === "broken" ? p.b2bSessionFlag : p.companyLocationCount > 0;
}

export interface WholesaleSku {
  name: string;
  category: string;
  pack: string;
  retailEach: string; // "—" when wholesale-only
  wholesaleEach: string;
  casePrice: string;
  wholesaleOnly: boolean;
}

export const WHOLESALE_SKUS: WholesaleSku[] = [
  {
    name: "Original Smoked Sausage Rings",
    category: "Sausage",
    pack: "Case of 12 · 14 oz rings",
    retailEach: "$9.49",
    wholesaleEach: "$6.85",
    casePrice: "$82.20",
    wholesaleOnly: false,
  },
  {
    name: "Jalapeño Cheddar Smoked Sausage",
    category: "Sausage",
    pack: "Case of 12 · 14 oz rings",
    retailEach: "$9.99",
    wholesaleEach: "$7.25",
    casePrice: "$87.00",
    wholesaleOnly: false,
  },
  {
    name: "Peppered Beef Jerky",
    category: "Jerky & Cured Meat",
    pack: "Case of 24 · 3 oz bags",
    retailEach: "$8.99",
    wholesaleEach: "$6.10",
    casePrice: "$146.40",
    wholesaleOnly: false,
  },
  {
    name: "Smoked Sausage Slices, Foodservice",
    category: "Foodservice",
    pack: "Case of 4 · 5 lb bulk bags",
    retailEach: "—",
    wholesaleEach: "$31.50",
    casePrice: "$126.00",
    wholesaleOnly: true,
  },
];
