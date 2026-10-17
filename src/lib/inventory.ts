export type BodyType = "suv" | "sedan" | "pickup" | "hatchback" | "sport";
export type Transmission = "automatic" | "manual";
export type Fuel = "gasoline" | "hybrid" | "diesel" | "electric";
export type Badge = "new" | "deal" | "lowKm" | "certified";

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  km: number;
  price: number;
  type: BodyType;
  transmission: Transmission;
  fuel: Fuel;
  badge: Badge;
  image: string;
  /** CSS object-position, to keep the car centred inside the card crop. */
  focus?: string;
};

/** Sample inventory — replace with the client's real stock or a CMS/API feed. */
export const vehicles: Vehicle[] = [
  {
    id: "jetta-gli-2022",
    brand: "Volkswagen",
    model: "Jetta",
    version: "GLI 2.0T DSG",
    year: 2022,
    km: 28400,
    price: 469900,
    type: "sedan",
    transmission: "automatic",
    fuel: "gasoline",
    badge: "new",
    image: "/media/images/car-4.jpg",
    focus: "50% 60%",
  },
  {
    id: "tucson-2022",
    brand: "Hyundai",
    model: "Tucson",
    version: "Limited Tech",
    year: 2022,
    km: 36900,
    price: 489900,
    type: "suv",
    transmission: "automatic",
    fuel: "gasoline",
    badge: "certified",
    image: "/media/images/car-8.jpg",
    focus: "50% 55%",
  },
  {
    id: "tacoma-2021",
    brand: "Toyota",
    model: "Tacoma",
    version: "TRD Off-Road 4x4",
    year: 2021,
    km: 54200,
    price: 789000,
    type: "pickup",
    transmission: "automatic",
    fuel: "gasoline",
    badge: "deal",
    image: "/media/images/car-5.jpg",
    focus: "50% 55%",
  },
  {
    id: "golf-r-2019",
    brand: "Volkswagen",
    model: "Golf",
    version: "R 2.0T 4Motion",
    year: 2019,
    km: 41800,
    price: 549000,
    type: "hatchback",
    transmission: "automatic",
    fuel: "gasoline",
    badge: "lowKm",
    image: "/media/images/car-6.jpg",
    focus: "50% 60%",
  },
  {
    id: "bmw-330i-2020",
    brand: "BMW",
    model: "Serie 3",
    version: "330i Sport Line",
    year: 2020,
    km: 47300,
    price: 589000,
    type: "sedan",
    transmission: "automatic",
    fuel: "gasoline",
    badge: "certified",
    image: "/media/images/car-3.jpg",
    focus: "50% 60%",
  },
  {
    id: "haval-h9-2024",
    brand: "GWM",
    model: "Haval H9",
    version: "2.0T 4WD Premium",
    year: 2024,
    km: 12600,
    price: 829000,
    type: "suv",
    transmission: "automatic",
    fuel: "diesel",
    badge: "lowKm",
    image: "/media/images/car-1.jpg",
    focus: "50% 72%",
  },
  {
    id: "cayman-2019",
    brand: "Porsche",
    model: "718 Cayman",
    version: "S PDK",
    year: 2019,
    km: 23100,
    price: 1389000,
    type: "sport",
    transmission: "automatic",
    fuel: "gasoline",
    badge: "new",
    image: "/media/images/car-7.jpg",
    focus: "50% 58%",
  },
  {
    id: "audi-q8-2021",
    brand: "Audi",
    model: "Q8",
    version: "55 TFSI S line",
    year: 2021,
    km: 39800,
    price: 1249000,
    type: "suv",
    transmission: "automatic",
    fuel: "hybrid",
    badge: "deal",
    image: "/media/images/car-2.jpg",
    focus: "50% 55%",
  },
];

export const bodyTypes: BodyType[] = ["suv", "sedan", "pickup", "hatchback", "sport"];

export const budgets = [400000, 600000, 900000, 1500000];

/** Brands shown in the marquee / search select (logos from simple-icons). */
export const brandNames = [
  "Nissan",
  "Volkswagen",
  "Chevrolet",
  "Toyota",
  "Kia",
  "Mazda",
  "Honda",
  "Hyundai",
  "Ford",
  "SEAT",
  "Suzuki",
  "MG",
  "Jeep",
  "BMW",
  "Audi",
  "Porsche",
  "Renault",
  "Mitsubishi",
  "GWM",
] as const;

/** Estimated monthly payment for the vehicle card ("desde $X/mes"). */
export function estimateMonthly(price: number, downRatio = 0.2, months = 60, annualRate = 0.139) {
  const principal = price * (1 - downRatio);
  const r = annualRate / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}
