export const demoData = {
  company: {
    vision: "To be the most trusted global travel transformation company, delivering unparalleled premium FIT (Free Independent Traveler) experiences.",
    mission: "Executing flawless travel operations so our customers can focus purely on the joy of exploration, while maintaining sustainable profitability.",
    annualPlan: {
      year: 2026,
      goal: "Grow profitable tour revenue while maintaining excellent customer experience.",
      revenueTarget: "₹4 Crore",
      profitTarget: "₹1.2 Crore",
      strategicPriorities: [
        "Grow priority tour categories",
        "Improve repeat customer business",
        "Improve operational reliability",
        "Protect profit margins",
        "Build predictable monthly tour demand"
      ]
    }
  },
  quarters: [
    {
      id: "Q3-2026",
      name: "August — September — October",
      focus: "Grow sales of priority tours while preparing operational capacity for the peak season.",
      months: [
        { name: "August", focus: "Build demand", priorityTours: "Kerala / Goa", revenueTarget: "₹30L", profitTarget: "₹9L" },
        { name: "September", focus: "Convert demand", priorityTours: "Rajasthan / Kashmir", revenueTarget: "₹38L", profitTarget: "₹12L" },
        { name: "October", focus: "Peak preparation", priorityTours: "Himachal / Rajasthan", revenueTarget: "₹52L", profitTarget: "₹17L" }
      ]
    }
  ],
  currentMonth: {
    id: "august-2026",
    name: "August 2026",
    focus: "Build demand ahead of the autumn peak season.",
    toursToPromote: ["Kashmir Explorer", "Rajasthan Heritage", "Himachal Adventure"],
    toursToPrepare: ["Kerala Escape", "Goa Weekend"],
    toursSalesFocus: ["Kerala Escape", "Goa Weekend", "Kashmir Explorer"],
    financials: {
      revenue: "₹30L",
      productionCost: "₹21L",
      expectedProfit: "₹9L",
      margin: "30%"
    }
  },
  tours: [
    {
      id: "t1",
      name: "Kerala Escape",
      destination: "Kerala",
      travelMonth: "August",
      priority: "High",
      category: "Nature / Wellness",
      expectedCustomers: 45,
      marketing: { promotionMonth: "July", priority: "Secondary", reason: "Sustain steady demand" },
      sales: { focusMonth: "August", expectedCustomers: 45, expectedRevenue: "₹9L" },
      operations: { preparationMonth: "August", expectedProduction: "Medium" },
      finance: { revenue: "₹9L", productionCost: "₹6L", profit: "₹3L", margin: "33%" },
      alignment: { marketing: "Monitor", sales: "Upcoming", operations: "Prepare", finance: "₹9L Revenue" }
    },
    {
      id: "t2",
      name: "Goa Weekend",
      destination: "Goa",
      travelMonth: "September",
      priority: "Medium",
      category: "Leisure",
      expectedCustomers: 60,
      marketing: { promotionMonth: "August", priority: "Medium", reason: "Seasonal demand" },
      sales: { focusMonth: "August", expectedCustomers: 60, expectedRevenue: "₹12L" },
      operations: { preparationMonth: "August", expectedProduction: "Medium" },
      finance: { revenue: "₹12L", productionCost: "₹8L", profit: "₹4L", margin: "33%" },
      alignment: { marketing: "Promote", sales: "Upcoming", operations: "Prepare", finance: "₹12L Revenue" }
    },
    {
      id: "t3",
      name: "Kashmir Explorer",
      destination: "Kashmir",
      travelMonth: "October",
      priority: "High",
      category: "Adventure / Scenic",
      expectedCustomers: 80,
      marketing: { promotionMonth: "August", priority: "High", reason: "Build early demand" },
      sales: { focusMonth: "September", expectedCustomers: 80, expectedRevenue: "₹18L" },
      operations: { preparationMonth: "September", expectedProduction: "High" },
      finance: { revenue: "₹18L", productionCost: "₹11L", profit: "₹7L", margin: "38%" },
      alignment: { marketing: "Promote", sales: "Upcoming", operations: "Prepare", finance: "₹18L Revenue" }
    },
    {
      id: "t4",
      name: "Rajasthan Heritage",
      destination: "Rajasthan",
      travelMonth: "October",
      priority: "High",
      category: "Culture / History",
      expectedCustomers: 75,
      marketing: { promotionMonth: "September", priority: "High", reason: "Upcoming peak" },
      sales: { focusMonth: "September", expectedCustomers: 75, expectedRevenue: "₹22L" },
      operations: { preparationMonth: "September", expectedProduction: "Very High" },
      finance: { revenue: "₹22L", productionCost: "₹15L", profit: "₹7L", margin: "31%" },
      alignment: { marketing: "Promote", sales: "Upcoming", operations: "Prepare", finance: "₹22L Revenue" }
    },
    {
      id: "t5",
      name: "Himachal Adventure",
      destination: "Himachal",
      travelMonth: "November",
      priority: "Medium",
      category: "Adventure",
      expectedCustomers: 50,
      marketing: { promotionMonth: "October", priority: "High", reason: "Build early demand" },
      sales: { focusMonth: "October", expectedCustomers: 50, expectedRevenue: "₹15L" },
      operations: { preparationMonth: "October", expectedProduction: "High" },
      finance: { revenue: "₹15L", productionCost: "₹10L", profit: "₹5L", margin: "33%" },
      alignment: { marketing: "Promote", sales: "Upcoming", operations: "Prepare", finance: "₹15L Revenue" }
    }
  ],
  monthlyFinancials: [
    { month: "August", tours: 8, revenue: "₹30L", productionCost: "₹21L", profit: "₹9L", margin: "30%" },
    { month: "September", tours: 10, revenue: "₹38L", productionCost: "₹26L", profit: "₹12L", margin: "32%" },
    { month: "October", tours: 14, revenue: "₹52L", productionCost: "₹35L", profit: "₹17L", margin: "33%" }
  ]
};
