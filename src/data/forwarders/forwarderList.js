export const freightForwarders = [
  {
    id: 1,
    name: "Maersk",
    type: "Global Carrier",
    specialization: ["Reefer Containers", "Full Container Load"],
    routes: ["South Africa → Middle East", "South Africa → Europe", "South Africa → Asia"],
    contact: "za.customer.service@maersk.com",
    phone: "+27 11 217 1000",
    website: "https://www.maersk.com",
    reliability: "Excellent",
    cost: "Premium"
  }
];

export const shippingRoutes = {
  "South Africa → Kuwait": {
    seaFreight: "25-35 days",
    costPerContainer: "$4,500 - $6,000",
    temperature: "0-2°C for citrus"
  }
};
