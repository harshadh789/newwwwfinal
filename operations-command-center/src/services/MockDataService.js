// Initial default data if local storage is empty
const defaultData = {
  company: {
    vision: "To be the most trusted global travel transformation company, delivering unparalleled premium FIT (Free Independent Traveler) experiences.",
    mission: "Executing flawless travel operations so our customers experience the true magic of the destination.",
    longTermDirection: "Expand premium tour offerings across 5 continents and achieve 40% margin on all strategic tours by 2035.",
    strategicPriorities: [
      {
        id: "p1",
        name: "Grow Profitable Tour Revenue",
        strategicStatement: "Grow tour revenue while protecting healthy margins.",
        whyItMatters: "Profitable growth is essential to building a sustainable GoCampFly business.",
        strategicIntent: "Increase revenue from priority tours while maintaining target profitability.",
        priorityLevel: "Critical",
        status: "On Plan",
        startYear: 2026,
        endYear: 2030,
        horizons: ["5_YEAR", "3_YEAR", "1_YEAR"],
        departments: ["Marketing", "Sales", "Operations", "Finance"],
        departmentContributions: {
          Marketing: "Create demand for priority tours.",
          Sales: "Convert demand into bookings.",
          Operations: "Deliver tours efficiently.",
          Finance: "Protect profitability and margin."
        },
        supportingTourIds: ["t1", "t2"],
        measures: [
          { name: "Revenue", type: "currency", target: 40000000, current: 32000000, unit: "₹", period: "Annual", direction: "higher_is_better" },
          { name: "Profit", type: "currency", target: 12000000, current: 9500000, unit: "₹", period: "Annual", direction: "higher_is_better" },
          { name: "Margin", type: "percentage", target: 30, current: 29.7, unit: "%", period: "Annual", direction: "higher_is_better" }
        ],
        statusSource: "Calculated",
        sortOrder: 1,
        statusPublication: "Published",
        createdAt: new Date().toISOString(),
        createdBy: "System",
        updatedAt: new Date().toISOString(),
        updatedBy: "System"
      }
    ],
    marketing: {
      coreMessage: '"Adventure that transforms." Premium travel with seamless, curated operations.',
      brandPositioning: 'Premium FIT travel for HNI and aspirational travelers seeking structured luxury adventure.',
      audiences: [
        { id: 'a1', name: 'HNI Travelers', desc: 'Premium packages, private tours', color: '#EF4444' },
        { id: 'a2', name: 'Corporate Teams', desc: 'Offsite retreats, leadership travel', color: '#818CF8' },
        { id: 'a3', name: 'Adventure Enthusiasts', desc: 'High-altitude, remote access trips', color: '#F59E0B' },
        { id: 'a4', name: 'Families', desc: 'Safe, curated luxury experiences', color: '#10B981' },
      ],
      channelStrategies: [
        { id: 'c1', name: 'Instagram', note: 'Visual storytelling, tour reels', icon: 'Camera', priority: 'Primary' },
        { id: 'c2', name: 'Email Newsletter', note: 'Deep engagement, early-bird access', icon: 'Mail', priority: 'Primary' },
        { id: 'c3', name: 'LinkedIn', note: 'Corporate B2B partnerships', icon: 'Briefcase', priority: 'Secondary' },
        { id: 'c4', name: 'SEO/Blog', note: 'Destination research capture', icon: 'Search', priority: 'Supporting' },
        { id: 'c5', name: 'WhatsApp', note: 'Lead nurturing & conversions', icon: 'MessageCircle', priority: 'Supporting' },
      ]
    }
  },
  strategicPlan: {
    startingYear: 2026,
    tenYear: { direction: "Expand into premium global FIT tours.", businessDirection: "", marketPosition: "", customerDirection: "", tourPortfolioDirection: "", financialDirection: "", priorities: [] },
    fiveYear: { destination: "Establish leadership in domestic premium tours.", businessObjectives: [], tourObjectives: [], customerObjectives: [], marketExpansion: "", operationsDirection: "", financialDirection: "", priorities: [] },
    threeYear: { destination: "Solidify domestic market leadership and optimize margins.", businessObjectives: [], tourObjectives: [], customerObjectives: [], operationsObjectives: [], financialObjectives: [], priorities: [] },
    oneYear: { objective: "Grow profitable tour revenue.", revenueTarget: 20000000, profitTarget: 8000000, marginTarget: 40, tourObjectives: [], customerObjectives: [], marketingDirection: "", salesDirection: "", operationsDirection: "", financeDirection: "", priorities: [] },
    threeMonth: { quarter: "Q3", startDate: "", endDate: "", strategicFocus: "Build demand for peak season.", priorities: [], priorityTours: [], revenueTarget: null, profitTarget: null, marketingDirection: "", salesDirection: "", operationsDirection: "", financeDirection: "" },
    oneMonth: { month: 8, monthName: "August", strategicFocus: "Begin promotion for October priority tours.", priorities: [], priorityTours: [], marketingDirection: "", salesDirection: "", operationsDirection: "", financeDirection: "" },
    updatedAt: "",
    updatedBy: ""
  },
  tours: [
    {
      id: "t1",
      name: "Kashmir Explorer",
      destination: "Kashmir",
      category: "Domestic",
      travelMonth: "October",
      travelDate: "Oct 2026",
      season: "Peak",
      priority: "High",
      strategicRole: "Core Tour",
      marketing: {
        promotionStart: "August",
        promotionEnd: "September",
        promotionStage: "Early Promotion",
        priority: "High",
        budgetLevel: "High",
        targetAudience: "HNI travelers, Adventure enthusiasts, Premium family groups",
        contentStrategy: "Highlight autumn colors, premium stays, and the magical Dal Lake experience.",
        channelStrategy: "Instagram, Email",
        channels: ["Instagram", "Email Newsletter", "SEO/Blog"],
        keyMessages: ["Autumn in Kashmir is unlike anywhere else", "Premium stays, flawless operations", "Limited seats — book early"],
        contentPillars: ["Destination Storytelling", "Guest Testimonials", "Behind-the-Scenes Operations"],
        notes: "Push early-bird campaign by mid-August. Focus reels on foliage and houseboat stays.",
        lastUpdated: ""
      },
      sales: {
        focusStart: "August",
        focusEnd: "October",
        targetCustomers: 120,
        expectedRevenue: 1200000,
        feedback: []
      },
      operations: {
        preparationStart: "August",
        preparationEnd: "September",
        expectedCustomers: 120,
        expectedProduction: 400000,
        capacityLevel: "High"
      },
      finance: {
        plannedRevenue: 1200000,
        actualRevenue: 1000000,
        plannedProductionCost: 400000,
        actualProductionCost: 350000,
        plannedProfit: 800000,
        actualProfit: 650000,
        plannedMargin: 66,
        actualMargin: 65
      }
    },
    {
      id: "t2",
      name: "Rajasthan Royals",
      destination: "Rajasthan",
      category: "Domestic",
      travelMonth: "November",
      travelDate: "Nov 2026",
      season: "Good",
      priority: "Medium",
      strategicRole: "Cash Cow",
      marketing: {
        promotionStart: "September",
        promotionEnd: "October",
        promotionStage: "Planning",
        priority: "Medium",
        budgetLevel: "Medium",
        targetAudience: "Corporate teams, Heritage culture travelers, Luxury seekers",
        contentStrategy: "Focus on Rajasthan's royal heritage, luxury desert camps, and exclusive Pushkar fair access.",
        channelStrategy: "LinkedIn, Facebook",
        channels: ["LinkedIn", "Facebook", "WhatsApp", "Email Newsletter"],
        keyMessages: ["The royal desert awaits — Pushkar 2026", "Exclusive camp access with GoCampFly", "Corporate offsite meets cultural immersion"],
        contentPillars: ["Heritage & Culture", "Corporate Retreats", "Festival Access"],
        notes: "Coordinate with Operations on Pushkar fair logistics before launching campaign. Corporate mailer in first week of September.",
        lastUpdated: ""
      },
      sales: {
        focusStart: "September",
        focusEnd: "November",
        targetCustomers: 80,
        expectedRevenue: 800000,
        feedback: []
      },
      operations: {
        preparationStart: "September",
        preparationEnd: "October",
        expectedCustomers: 80,
        expectedProduction: 300000,
        capacityLevel: "Medium"
      },
      finance: {
        plannedRevenue: 800000,
        actualRevenue: 0,
        plannedProductionCost: 300000,
        actualProductionCost: 0,
        plannedProfit: 500000,
        actualProfit: 0,
        plannedMargin: 62,
        actualMargin: 0
      }
    }
  ],

  // Tours & Operations System
  
  // Tours & Operations System
  seasonality: [
    {
      id: "dest1",
      destinationId: "kashmir",
      destinationName: "Kashmir",
      seasonClass: "Peak",
      type: "DOMESTIC",
      monthly: {
        jan: "Off", feb: "Off", mar: "Good", apr: "Peak", may: "Peak", jun: "Peak",
        jul: "Good", aug: "Good", sep: "Peak", oct: "Peak", nov: "Off", dec: "Peak"
      },
      bestTravelWindow: "May–September",
      notes: "Green Kashmir: May-September. Tulip & Spring Season: April. Autumn Colours: October-November",
      status: "ACTIVE"
    },
    {
      id: "dest2",
      destinationId: "rajasthan",
      destinationName: "Rajasthan",
      seasonClass: "Good",
      type: "DOMESTIC",
      monthly: {
        jan: "Peak", feb: "Peak", mar: "Good", apr: "Off", may: "Off", jun: "Off",
        jul: "Off", aug: "Off", sep: "Good", oct: "Peak", nov: "Peak", dec: "Peak"
      },
      bestTravelWindow: "October–March",
      notes: "Monsoon / transition in August.",
      status: "ACTIVE"
    },
    {
      id: "dest3",
      destinationId: "kerala",
      destinationName: "Kerala",
      seasonClass: "Peak",
      type: "DOMESTIC",
      monthly: {
        jan: "Peak", feb: "Peak", mar: "Good", apr: "Off", may: "Off", jun: "Off",
        jul: "Off", aug: "Off", sep: "Good", oct: "Peak", nov: "Peak", dec: "Peak"
      },
      bestTravelWindow: "September–February",
      notes: "Good weather in October.",
      status: "ACTIVE"
    },
    {
      id: "dest4",
      destinationId: "goa",
      destinationName: "Goa",
      seasonClass: "Good",
      type: "DOMESTIC",
      monthly: {
        jan: "Peak", feb: "Peak", mar: "Good", apr: "Off", may: "Off", jun: "Off",
        jul: "Off", aug: "Good", sep: "Good", oct: "Good", nov: "Peak", dec: "Peak"
      },
      bestTravelWindow: "November–February",
      notes: "Monsoon retreats by September.",
      status: "ACTIVE"
    },
    {
      id: "dest5",
      destinationId: "himachal",
      destinationName: "Himachal",
      seasonClass: "Peak",
      type: "DOMESTIC",
      monthly: {
        jan: "Off", feb: "Off", mar: "Good", apr: "Peak", may: "Peak", jun: "Peak",
        jul: "Good", aug: "Good", sep: "Good", oct: "Good", nov: "Off", dec: "Peak"
      },
      bestTravelWindow: "April–June",
      notes: "Summer escape.",
      status: "ACTIVE"
    },
    {
      id: "dest6",
      destinationId: "ladakh",
      destinationName: "Ladakh",
      seasonClass: "Off",
      type: "DOMESTIC",
      monthly: {
        jan: "Off", feb: "Off", mar: "Off", apr: "Off", may: "Good", jun: "Peak",
        jul: "Peak", aug: "Peak", sep: "Peak", oct: "Good", nov: "Off", dec: "Off"
      },
      bestTravelWindow: "June–September",
      notes: "Best season for high passes.",
      status: "ACTIVE"
    },
    {
      id: "dest7",
      destinationId: "lakshadweep",
      destinationName: "Lakshadweep",
      seasonClass: "Peak",
      type: "DOMESTIC",
      monthly: {
        jan: "Peak", feb: "Peak", mar: "Peak", apr: "Peak", may: "Peak", jun: "Off",
        jul: "Off", aug: "Off", sep: "Off", oct: "Off", nov: "Good", dec: "Peak"
      },
      bestTravelWindow: "October–May",
      notes: "Monsoon makes sea travel difficult.",
      status: "ACTIVE"
    },
    {
      id: "dest8",
      destinationId: "meghalaya",
      destinationName: "Meghalaya",
      seasonClass: "Good",
      type: "DOMESTIC",
      monthly: {
        jan: "Good", feb: "Good", mar: "Good", apr: "Good", may: "Good", jun: "Off",
        jul: "Off", aug: "Off", sep: "Off", oct: "Good", nov: "Peak", dec: "Peak"
      },
      bestTravelWindow: "October–May",
      notes: "Heavy rainfall in August.",
      status: "ACTIVE"
    }
  ],
  marketPricing: [
    { id: "mp1", tourId: "t1", price: 35000, currency: "INR", priceType: "Premium package", source: "Competitor Analysis", checkedAt: "2026-08-11", notes: "Peak season pricing." }
  ],
  confirmedTours: [
    {
      id: "ct1", tourId: "t1", departureDate: "2026-10-12", returnDate: "2026-10-20", status: "Confirmed",
      expectedCustomers: 18, currentBookings: 12, expectedRevenue: 630000, expectedProduction: 400000, expectedProfit: 230000, expectedMargin: 36.5,
      operationsReadiness: "Ready", notes: "First autumn batch."
    }
  ],
  operationsPlans: [
    {
      id: "op1", tourId: "t2", status: "Expected", departureDate: "2026-11-15", returnDate: "2026-11-25",
      expectedCustomers: 22, expectedRevenue: 770000, expectedProduction: 500000, expectedProfit: 270000, expectedMargin: 35,
      marketPriceReferenceId: null, strategicPriorityId: "p1", festivalIds: ["f1"],
      operationsNotes: "High demand expected for Pushkar camel fair.", planningCompleteness: 85
    }
  ],
  festivals: [
    {
      id: "f1",
      name: "Diwali",
      type: "FESTIVAL",
      startDate: "2026-11-01",
      endDate: "2026-11-05",
      geographicScope: "NATIONAL",
      country: "India",
      state: null, region: null, city: null,
      travelImpact: "HIGH",
      description: "The festival of lights — one of India's most significant annual celebrations.",
      whyItMatters: "The Diwali holiday window creates one of the strongest annual travel surges. Families reunite and leisure travellers book extensively in October–November.",
      destinationIds: ["rajasthan", "goa", "kerala"],
      tourIds: ["t2"],
      planningNotes: "Begin tour capacity planning by August. Marketing should start promotions in September.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f2",
      name: "Independence Day",
      type: "PUBLIC_HOLIDAY",
      startDate: "2026-08-15",
      endDate: "2026-08-15",
      geographicScope: "NATIONAL",
      country: "India",
      state: null, region: null, city: null,
      travelImpact: "MEDIUM",
      description: "India's national Independence Day — a one-day public holiday.",
      whyItMatters: "Falls on a Saturday in 2026, which does not create a long weekend. Still a travel opportunity for short getaways near urban centres.",
      destinationIds: ["himachal", "kashmir"],
      tourIds: ["t1"],
      planningNotes: "Short notice tour promotions may be relevant for local/nearby destinations.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f3",
      name: "Durga Puja",
      type: "FESTIVAL",
      startDate: "2026-10-16",
      endDate: "2026-10-21",
      geographicScope: "REGIONAL",
      country: "India",
      state: "West Bengal", region: "Eastern India", city: null,
      travelImpact: "HIGH",
      description: "Major Hindu festival celebrated across eastern India. Significant cultural tourism event.",
      whyItMatters: "Drives enormous intra-India travel to West Bengal and Odisha. Also triggers leisure travel as a long holiday window for those not celebrating.",
      destinationIds: ["rajasthan", "kerala", "goa"],
      tourIds: ["t2"],
      planningNotes: "October is peak travel season for many destinations. Use this window to promote tours.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f4",
      name: "Onam",
      type: "FESTIVAL",
      startDate: "2026-08-25",
      endDate: "2026-09-04",
      geographicScope: "STATE",
      country: "India",
      state: "Kerala", region: null, city: null,
      travelImpact: "HIGH",
      description: "Kerala's biggest harvest festival, a 10-day celebration of culture and tradition.",
      whyItMatters: "Major Kerala travel and cultural tourism period. High inbound travel to Kerala from across India.",
      destinationIds: ["kerala"],
      tourIds: [],
      planningNotes: "Consider promoting Kerala-specific packages for this window. Accommodation fills up quickly.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f5",
      name: "Holi",
      type: "FESTIVAL",
      startDate: "2026-03-13",
      endDate: "2026-03-14",
      geographicScope: "NATIONAL",
      country: "India",
      state: null, region: null, city: null,
      travelImpact: "MEDIUM",
      description: "Festival of colours — national holiday with strong cultural tourism relevance.",
      whyItMatters: "Mathura and Vrindavan are top Holi destinations. Rajasthan's Holi celebrations also draw tourists.",
      destinationIds: ["rajasthan"],
      tourIds: [],
      planningNotes: "March is a shoulder season for many destinations. Good opportunity for short cultural tour packages.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f6",
      name: "Summer School Break — Delhi / NCR",
      type: "SCHOOL_HOLIDAY",
      startDate: "2026-05-15",
      endDate: "2026-06-30",
      geographicScope: "REGIONAL",
      country: "India",
      state: "Delhi", region: "Delhi / NCR", city: null,
      travelImpact: "HIGH",
      description: "Summer school vacation for Delhi and NCR region schools.",
      whyItMatters: "The largest family travel window of the year. Families actively book hill station and cool-weather destinations.",
      destinationIds: ["kashmir", "himachal", "ladakh"],
      tourIds: ["t1"],
      planningNotes: "Ensure hill-station tour capacity is confirmed well before May. Heavy demand expected.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: {
        state: "Delhi",
        region: "Delhi / NCR",
        schoolSystem: "Regional School Holiday",
        academicYear: "2025-26",
        familyTravelRelevance: "HIGH"
      },
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f7",
      name: "Summer School Break — Kerala",
      type: "SCHOOL_HOLIDAY",
      startDate: "2026-04-02",
      endDate: "2026-06-01",
      geographicScope: "STATE",
      country: "India",
      state: "Kerala", region: null, city: null,
      travelImpact: "MEDIUM",
      description: "Summer school vacation for Kerala state schools.",
      whyItMatters: "Creates family travel demand out of Kerala and inbound tourism to cooler destinations.",
      destinationIds: ["kashmir", "himachal"],
      tourIds: ["t1"],
      planningNotes: "Kerala families travel north in summer. Target Kerala-based customers for Kashmir tours.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: {
        state: "Kerala",
        region: null,
        schoolSystem: "Kerala State School System",
        academicYear: "2025-26",
        familyTravelRelevance: "MEDIUM"
      },
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f8",
      name: "Dussehra Long Weekend",
      type: "LONG_WEEKEND",
      startDate: "2026-10-10",
      endDate: "2026-10-12",
      geographicScope: "NATIONAL",
      country: "India",
      state: null, region: null, city: null,
      travelImpact: "HIGH",
      description: "Dussehra falls on a Saturday, creating a long weekend travel window.",
      whyItMatters: "3-day weekend creates strong short-break travel demand. Most relevant for nearby hill stations and leisure destinations.",
      destinationIds: ["rajasthan", "himachal"],
      tourIds: ["t1", "t2"],
      planningNotes: "Weekend tours and short-break packages should be promoted by end of September.",
      status: "ACTIVE",
      recurring: false,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f9",
      name: "Christmas & New Year Travel Window",
      type: "TRAVEL_WINDOW",
      startDate: "2026-12-22",
      endDate: "2027-01-02",
      geographicScope: "NATIONAL",
      country: "India",
      state: null, region: null, city: null,
      travelImpact: "HIGH",
      description: "Major year-end holiday travel window spanning Christmas through New Year.",
      whyItMatters: "One of the busiest travel periods of the year. Strong leisure and family travel demand across all premium destinations.",
      destinationIds: ["goa", "kerala", "rajasthan"],
      tourIds: ["t2"],
      planningNotes: "December tours must be confirmed by October. Accommodation and transport fill up very early.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    },
    {
      id: "f10",
      name: "Eid al-Adha",
      type: "PUBLIC_HOLIDAY",
      startDate: "2026-06-17",
      endDate: "2026-06-19",
      geographicScope: "NATIONAL",
      country: "India",
      state: null, region: null, city: null,
      travelImpact: "MEDIUM",
      description: "National public holiday. May create a short travel window depending on the day it falls.",
      whyItMatters: "A 3-day window if combined with adjacent weekend. Relevant for short leisure breaks.",
      destinationIds: ["kashmir", "ladakh"],
      tourIds: ["t1"],
      planningNotes: "June is peak season for Kashmir and Ladakh. Timely promotions could drive bookings.",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      status: "ACTIVE",
      recurring: true,
      schoolHoliday: null,
      createdAt: "2026-08-01T00:00:00.000Z", createdBy: "Admin",
      updatedAt: "2026-08-01T00:00:00.000Z", updatedBy: "Admin"
    }
  ],
  brandAssets: [
    { id: 'ba1', title: 'GoCampFly Primary Logo Kit', category: 'Logos & Icons', type: 'SVG / PNG', url: 'https://campfly.in/assets/logo-primary.svg', tags: ['Logo', 'Vector', 'Dark & Light'], updatedAt: '2026-08-01' },
    { id: 'ba2', title: 'Brand Guidelines 2026 (PDF)', category: 'Guidelines', type: 'PDF Document', url: 'https://campfly.in/docs/brand-guidelines-2026.pdf', tags: ['Typography', 'Color System', 'Voice'], updatedAt: '2026-08-01' },
    { id: 'ba3', title: 'Kashmir Autumn Reel Footage', category: 'Video & Reels', type: 'MP4 Video', url: 'https://campfly.in/media/kashmir-foliage.mp4', tags: ['Kashmir', '4K', 'Reels'], updatedAt: '2026-08-05' },
    { id: 'ba4', title: 'Rajasthan Desert Camp Hero Images', category: 'Photography', type: 'JPG Hi-Res', url: 'https://campfly.in/photos/pushkar-hero.jpg', tags: ['Rajasthan', 'Luxury', 'Hero'], updatedAt: '2026-08-10' },
    { id: 'ba5', title: 'Early Bird Email Newsletter Template', category: 'Email Templates', type: 'HTML Template', url: 'https://campfly.in/templates/early-bird.html', tags: ['Email', 'Figma', 'Responsive'], updatedAt: '2026-08-08' }
  ],
  contentPosts: [
    { id: 'cp1', title: 'Golden Autumn in Kashmir — Reel Drop', channel: 'Instagram', postType: 'Reel', funnelCategory: 'Awareness', tourId: 't1', scheduleDate: '2026-08-15', status: 'Scheduled', author: 'Rahul M.', caption: 'Experience Dal Lake when the Chinar leaves turn to gold #GoCampFly #Kashmir' },
    { id: 'cp2', title: 'Pushkar Fair 2026 Exclusive VIP Camp Access', channel: 'Email Newsletter', postType: 'Newsletter', funnelCategory: 'Leads', tourId: 't2', scheduleDate: '2026-08-20', status: 'Approved', author: 'Neha S.', caption: 'Deep dive into Rajasthan luxury offsites and Pushkar fair arrangements.' },
    { id: 'cp3', title: 'Corporate Retreats in Desert Luxury — B2B Spotlight', channel: 'LinkedIn', postType: 'Article', funnelCategory: 'Traffic', tourId: 't2', scheduleDate: '2026-08-25', status: 'Draft', author: 'Vikram R.', caption: 'How GoCampFly crafts high-impact leadership offsites.' },
    { id: 'cp4', title: 'Top 5 Secrets of High-Altitude Ladakh Camping', channel: 'SEO/Blog', postType: 'Blog Post', funnelCategory: 'Conversions', tourId: 't1', scheduleDate: '2026-09-01', status: 'In Review', author: 'Pooja K.', caption: 'Comprehensive guide for FIT travelers heading to Ladakh.' }
  ],
  marketingCampaigns: [
    {
      id: "mc1",
      name: "Diwali Festivities & Luxury Escapes",
      category: "Brand Campaign",
      funnelCategory: "Awareness",
      promotionStart: "September",
      promotionEnd: "November",
      promotionStage: "Planning",
      priority: "High",
      targetAudience: "HNI Families, Luxury Seekers",
      contentStrategy: "Cross-destination festive holiday packages with early-bird pricing and VIP hospitality.",
      channels: ["Instagram", "Email Newsletter", "WhatsApp"],
      keyMessages: ["Celebrate Diwali in luxury with GoCampFly", "Exclusive festive access and seamless transfers"],
      contentPillars: ["Festive Travel", "Luxury Hospitality"],
      notes: "Coordinate with sales for early corporate bookings.",
      status: "ACTIVE"
    },
    {
      id: "mc2",
      name: "Q4 Corporate Offsite & Leadership Escapes",
      category: "Corporate Push",
      funnelCategory: "Leads",
      promotionStart: "August",
      promotionEnd: "October",
      promotionStage: "Active",
      priority: "High",
      targetAudience: "Corporate HR, Executive Teams",
      contentStrategy: "B2B LinkedIn outreach and email sequence highlighting desert luxury camps for team offsites.",
      channels: ["LinkedIn", "Email Newsletter", "WhatsApp"],
      keyMessages: ["Elevate executive offsites with curated wilderness luxury", "Seamless logistics and team experiences"],
      contentPillars: ["B2B Leadership", "Team Retreats"],
      notes: "Focus outreach on tech & finance sector HR leads.",
      status: "ACTIVE"
    }
  ],
  marketingTasks: [
    { id: 'mt1', title: 'Finalize Kashmir Drone Footage edit for Instagram Reels', campaignId: 't1', assignee: 'Rahul M.', dueDate: '2026-08-14', priority: 'High', status: 'In Progress' },
    { id: 'mt2', title: 'Copy review for Early Bird Email Broadcast', campaignId: 't2', assignee: 'Neha S.', dueDate: '2026-08-18', priority: 'Medium', status: 'Completed' },
    { id: 'mt3', title: 'Publish Pushkar B2B Partnership Post on LinkedIn', campaignId: 't2', assignee: 'Vikram R.', dueDate: '2026-08-22', priority: 'High', status: 'To Do' },
    { id: 'mt4', title: 'Update Google Ads keywords for Autumn Travel Search', campaignId: 'mc1', assignee: 'Pooja K.', dueDate: '2026-08-28', priority: 'Low', status: 'To Do' }
  ],
  marketingApprovals: [
    { id: 'ma1', title: 'Diwali Festive Push — ₹2.5L Campaign Ad Spend', itemType: 'Budget Sign-off', requestedBy: 'Rahul M.', approver: 'Admin', status: 'Approved', requestedDate: '2026-08-10', notes: 'Approved for Meta and Google Search ads.' },
    { id: 'ma2', title: 'Rajasthan Royals Desert Reel Creative Video Draft', itemType: 'Creative Review', requestedBy: 'Neha S.', approver: 'Admin', status: 'Pending', requestedDate: '2026-08-11', notes: 'Awaiting final color grade review.' }
  ],
  marketingMetrics: [
    { id: 'mm1', metricName: 'Meta Ads Diwali Impressions', channel: 'Instagram', funnelCategory: 'Awareness', reachCount: 145000, leadCount: 280, spendINR: 45000, dateRecorded: '2026-08-10', notes: 'Top performing reel video ad' },
    { id: 'mm2', metricName: 'Early Bird Email Broadcast Leads', channel: 'Email Newsletter', funnelCategory: 'Leads', reachCount: 22000, leadCount: 160, spendINR: 12000, dateRecorded: '2026-08-08', notes: '7.2% conversion rate' },
    { id: 'mm3', metricName: 'Google Search Campaign Clicks', channel: 'SEO/Blog', funnelCategory: 'Traffic', reachCount: 31000, leadCount: 95, spendINR: 28000, dateRecorded: '2026-08-05', notes: 'High-intent search traffic' }
  ],
  marketingGoals: [
    { id: 'mg1', title: 'Grow Q4 tour bookings by 30% over Q3', type: 'Goal', owner: 'Rahul M.', targetValue: 130, currentValue: 85, unit: 'bookings', period: 'Q4 2026', linkedCampaignIds: ['mc1', 'mc2'], status: 'On Track', createdAt: '2026-08-01' },
    { id: 'mg2', title: 'Achieve 200K monthly Instagram reach', type: 'OKR', owner: 'Neha S.', targetValue: 200000, currentValue: 145000, unit: 'reach', period: 'Monthly', linkedCampaignIds: ['mc1'], status: 'At Risk', createdAt: '2026-08-01' },
    { id: 'mg3', title: 'Maintain cost-per-lead below INR 180', type: 'KPI', owner: 'Vikram R.', targetValue: 180, currentValue: 155, unit: 'INR/lead', period: 'Monthly', linkedCampaignIds: [], status: 'On Track', createdAt: '2026-08-01' },
    { id: 'mg4', title: 'Increase email open rate to 28%', type: 'KPI', owner: 'Pooja K.', targetValue: 28, currentValue: 22, unit: '%', period: 'Monthly', linkedCampaignIds: ['mc1'], status: 'Behind', createdAt: '2026-08-01' }
  ],
  marketingMilestones: [
    { id: 'ms1', title: 'Diwali campaign creative assets finalized', dueDate: '2026-08-20', owner: 'Neha S.', campaignId: 'mc1', status: 'Upcoming', dependencies: ['mt1'] },
    { id: 'ms2', title: 'Corporate outreach email sequence launched', dueDate: '2026-08-25', owner: 'Vikram R.', campaignId: 'mc2', status: 'Upcoming', dependencies: ['mt3'] },
    { id: 'ms3', title: 'Q4 ad budgets signed off', dueDate: '2026-08-15', owner: 'Rahul M.', campaignId: 'mc1', status: 'Completed', dependencies: ['ma1'] },
    { id: 'ms4', title: 'Kashmir reel drop goes live', dueDate: '2026-08-22', owner: 'Rahul M.', campaignId: 'mc1', status: 'Upcoming', dependencies: ['mt1', 'ms1'] },
    { id: 'ms5', title: 'Post-Diwali performance review meeting', dueDate: '2026-11-10', owner: 'Admin', campaignId: 'mc1', status: 'Upcoming', dependencies: [] }
  ],
  marketingBudget: [
    { id: 'mb1', campaignId: 'mc1', category: 'Ad Spend', allocatedINR: 250000, spentINR: 45000, owner: 'Rahul M.', month: 'August', notes: 'Meta + Google Ads for Diwali push' },
    { id: 'mb2', campaignId: 'mc1', category: 'Creative Production', allocatedINR: 80000, spentINR: 35000, owner: 'Neha S.', month: 'August', notes: 'Drone footage editing, reel production' },
    { id: 'mb3', campaignId: 'mc2', category: 'Ad Spend', allocatedINR: 120000, spentINR: 28000, owner: 'Vikram R.', month: 'August', notes: 'LinkedIn Sponsored InMail + Search ads' },
    { id: 'mb4', campaignId: 'mc2', category: 'Events & Sponsorships', allocatedINR: 60000, spentINR: 0, owner: 'Vikram R.', month: 'September', notes: 'Corporate networking event sponsorship' },
    { id: 'mb5', campaignId: 'mc1', category: 'Tools & Software', allocatedINR: 15000, spentINR: 12000, owner: 'Pooja K.', month: 'August', notes: 'SEMrush, Canva Pro, email platform' }
  ],
  marketingRisks: [
    { id: 'mr1', title: 'Kashmir drone footage delayed due to weather', severity: 'High', status: 'Open', owner: 'Rahul M.', linkedCampaignId: 'mc1', mitigation: 'Backup footage from May shoot available. Rescheduling drone shoot for Aug 18.', createdDate: '2026-08-10' },
    { id: 'mr2', title: 'LinkedIn ad account under review by platform', severity: 'Medium', status: 'Open', owner: 'Vikram R.', linkedCampaignId: 'mc2', mitigation: 'Support ticket raised. Alternate account provisioned as fallback.', createdDate: '2026-08-12' },
    { id: 'mr3', title: 'Email deliverability below target for Gmail recipients', severity: 'Low', status: 'Mitigated', owner: 'Pooja K.', linkedCampaignId: 'mc1', mitigation: 'SPF/DKIM records updated. Warm-up sequence initiated on new domain.', createdDate: '2026-08-05' }
  ],
  salesTargets: [
    { id: 'st1', rep: 'Arjun (B2B)', tourId: 't1', type: 'Revenue', target: 2500000, achieved: 1250000, month: 'August', status: 'On Track' },
    { id: 'st2', rep: 'Priya (Luxury)', tourId: 't2', type: 'Bookings', target: 15, achieved: 8, month: 'August', status: 'On Track' },
    { id: 'st3', rep: 'Karan (Family)', tourId: 't1', type: 'Revenue', target: 1500000, achieved: 500000, month: 'August', status: 'Behind' },
    { id: 'st4', rep: 'Riya (Adventure)', tourId: 't3', type: 'Bookings', target: 20, achieved: 22, month: 'August', status: 'Completed' }
  ],
  salesLeads: [
    { id: 'sl1', name: 'Acme Corp Retreat', type: 'B2B', value: 850000, stage: 'Negotiating', owner: 'Arjun (B2B)', tourId: 't1', nextFollowUp: '2026-08-16', probability: 80, notes: 'Awaiting final headcount confirmation.' },
    { id: 'sl2', name: 'Sharma Family Extravaganza', type: 'Luxury', value: 350000, stage: 'Contacted', owner: 'Priya (Luxury)', tourId: 't2', nextFollowUp: '2026-08-14', probability: 40, notes: 'Requested helicopter transfer options.' },
    { id: 'sl3', name: 'TechStart Leadership', type: 'B2B', value: 1200000, stage: 'Won', owner: 'Arjun (B2B)', tourId: 't1', nextFollowUp: '', probability: 100, notes: 'Deposit paid.' },
    { id: 'sl4', name: 'Mehta Anniversary Group', type: 'Group', value: 550000, stage: 'New', owner: 'Karan (Family)', tourId: 't2', nextFollowUp: '2026-08-15', probability: 20, notes: 'Inbound lead from Diwali campaign.' }
  ],
  salesFeedback: [
    { 
      id: 'sf1', 
      author: 'Priya (Luxury)', 
      campaignId: 'mc1', // Diwali Festivities & Luxury Escapes
      leadQuality: 3,
      priority: 'High', 
      status: 'Open', 
      owner: 'Neha S.',
      whatWorks: 'Good volume of inquiries, visuals are attracting attention.',
      whatNeedsImprovement: 'Leads for Kashmir are asking about helicopter return options. Marketing needs to highlight this add-on to pre-qualify budget.',
      actionPlan: 'Update email sequences to include helicopter pricing tiers. Add a dedicated FAQ section on the landing page.',
      date: '2026-08-10',
      totalLeads: 45,
      potentialLeads: 12,
      dailyClosing: 2,
      closedRevenue: 150000,
      closedProfit: 30000
    },
    { 
      id: 'sf2', 
      author: 'Arjun (B2B)', 
      campaignId: 'mc2', // End of Year Corporate Retreats
      leadQuality: 2,
      priority: 'Medium', 
      status: 'Reviewed', 
      owner: 'Rahul M.',
      whatWorks: 'The LinkedIn ad copy is generating good CTR.',
      whatNeedsImprovement: 'Recent leads are too small (teams < 5). We need to filter out small startups.',
      actionPlan: 'Adjust LinkedIn targeting to companies with 50+ employees. Emphasize "large group management" in the ad copy.',
      date: '2026-08-08',
      totalLeads: 28,
      potentialLeads: 5,
      dailyClosing: 0
    },
    { 
      id: 'sf3', 
      author: 'Riya (Adventure)', 
      campaignId: 'mc3', // Winter Trekking Season (Chadar)
      leadQuality: 4,
      priority: 'Low', 
      status: 'Closed', 
      owner: 'Pooja K.',
      whatWorks: 'Highly qualified leads who know what they want. Strong conversion rate.',
      whatNeedsImprovement: 'Customers are worried about altitude sickness and safety protocols during the booking call.',
      actionPlan: 'Created a blog post about our safety protocols and medical team. Sent to sales to use in follow-ups.',
      date: '2026-08-01',
      totalLeads: 85,
      potentialLeads: 22,
      dailyClosing: 4,
      closedRevenue: 320000,
      closedProfit: 64000
    }
  ],
  salesEscalations: [
    {
      id: 'esc1',
      campaignId: 'mc1',
      salesPerson: 'Neha S.',
      missedDate: '2026-08-12',
      status: 'Pending',
      notes: 'No daily update provided for luxury campaign.'
    }
  ],
  systemSettings: {
    forecastConversionRate: 0.30, // 30% conversion (3 out of 10 potential leads)
    avgTicketSize: 100000,        // ₹1,00,000 per closed booking
    defaultProfitMargin: 25,      // 25% profit margin
    autoNotifyMarketing: true,
    autoNotifySales: true,
    targetQuarter: 'Q4 2026',
    annualTargetRevenue: 40000000,
    companyVersion: '3.0'
  },
  opsSalesPerformanceLogs: [
    { id: 1, time: '10:30 AM', date: '2026-08-14', action: 'Proposal Shared', tour: 'Kashmir Family Tour', dest: 'Kashmir' },
    { id: 2, time: '11:15 AM', date: '2026-08-14', action: 'Booking Confirmed', tour: 'Goa Weekend Getaway', dest: 'Goa' },
    { id: 3, time: '02:00 PM', date: '2026-08-14', action: 'Proposal Shared', tour: 'Kerala Backwaters', dest: 'Kerala' },
    { id: 4, time: '04:45 PM', date: '2026-08-14', action: 'Booking Confirmed', tour: 'Kashmir Family Tour', dest: 'Kashmir' },
  ],
  notifications: [
    {
      id: 'notif1',
      title: 'New Tour Handover to Marketing',
      message: 'Operations created "Kashmir Explorer (Oct 2026)". 4 Creatives (Reels/Email) required. Target Budget: ₹1.5L.',
      fromDept: 'Operations',
      toDept: 'Marketing',
      type: 'TOUR_CREATED',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      read: false,
      link: '/marketing-strategy',
      tourId: 't1'
    },
    {
      id: 'notif2',
      title: 'Sales Product Briefing Ready',
      message: 'New tour "Rajasthan Royals - Pushkar Fair Special" is now in Catalogue. Review USPs, pricing tiers & objections guide.',
      fromDept: 'Operations',
      toDept: 'Sales',
      type: 'TOUR_CREATED',
      timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      read: false,
      link: '/sales-strategy',
      tourId: 't2'
    },
    {
      id: 'notif3',
      title: 'Daily Sales Feedback Logged',
      message: 'Priya logged 12 potential leads on Diwali Campaign. Early forecast updated in Finance module.',
      fromDept: 'Sales',
      toDept: 'Finance',
      type: 'LEAD_FEEDBACK',
      timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
      read: true,
      link: '/finance-planning',
      campaignId: 'mc1'
    },
    {
      id: 'notif4',
      title: 'Holiday Tour Proposal for Review',
      message: 'Operations submitted proposal: "Royal Rajasthan Diwali Extravaganza" (Nov 1-6, 25 Pax). Awaiting Admin approval.',
      fromDept: 'Operations',
      toDept: 'Admin',
      type: 'HOLIDAY_PROPOSAL',
      timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      read: false,
      link: '/tours/festivals'
    }
  ],
  auditLogs: [
    {
      id: 'aud1',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      user: 'Operations Lead (Rajesh K.)',
      role: 'OPERATIONS',
      department: 'Operations',
      action: 'ADVANCE_LIFECYCLE',
      entityType: 'Tour',
      entityName: 'Kashmir Explorer',
      details: 'Advanced lifecycle to EXECUTE. Dispatched marketing handover & sales briefing.'
    },
    {
      id: 'aud2',
      timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
      user: 'Sales Manager (Arjun V.)',
      role: 'SALES',
      department: 'Sales',
      action: 'UPDATE_LEAD',
      entityType: 'Lead',
      entityName: 'Acme Corp Retreat',
      details: 'Updated opportunity stage to Negotiating (80% prob, ₹8.5L value).'
    },
    {
      id: 'aud3',
      timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
      user: 'Admin (System)',
      role: 'ADMIN',
      department: 'System',
      action: 'UPDATE_CONFIG',
      entityType: 'SystemSettings',
      entityName: 'Forecast Formula',
      details: 'Configured conversion rate at 30% and average deal size at ₹1,00,000 in Admin Center.'
    }
  ],
  holidayTourProposals: [
    {
      id: 'htp1',
      festivalId: 'f1', // Diwali
      tourName: 'Royal Rajasthan Diwali Extravaganza',
      destination: 'Rajasthan (Jaipur, Jodhpur & Pushkar)',
      travelMonth: 'November',
      startDate: '2026-11-01',
      endDate: '2026-11-06',
      durationDays: 6,
      targetPax: 25,
      pricePerPerson: 45000,
      estimatedRevenue: 1125000,
      estimatedCost: 700000,
      estimatedProfit: 425000,
      targetAudience: 'Families, HNI Luxury Travellers',
      status: 'Approved',
      proposedBy: 'Rajesh K. (Ops)',
      approvedBy: 'Admin',
      notes: 'Includes exclusive Pushkar Fair VIP luxury tents.'
    },
    {
      id: 'htp2',
      festivalId: 'f3', // Durga Puja
      tourName: 'Sikkim Himalayan Autumn Escape',
      destination: 'Sikkim & Darjeeling',
      travelMonth: 'October',
      startDate: '2026-10-17',
      endDate: '2026-10-23',
      durationDays: 7,
      targetPax: 20,
      pricePerPerson: 38000,
      estimatedRevenue: 760000,
      estimatedCost: 480000,
      estimatedProfit: 280000,
      targetAudience: 'Adventure & Nature Enthusiasts',
      status: 'Proposed',
      proposedBy: 'Amit S. (Ops)',
      approvedBy: null,
      notes: 'Peak autumn clear views of Kanchenjunga.'
    },
    {
      id: 'htp3',
      festivalId: 'f2', // Independence Day Long Weekend
      tourName: 'Himachal High Altitude Getaway',
      destination: 'Himachal Pradesh (Manali & Kasol)',
      travelMonth: 'August',
      startDate: '2026-08-14',
      endDate: '2026-08-18',
      durationDays: 5,
      targetPax: 30,
      pricePerPerson: 22000,
      estimatedRevenue: 660000,
      estimatedCost: 420000,
      estimatedProfit: 240000,
      targetAudience: 'Young Professionals & Groups',
      status: 'Scheduled',
      proposedBy: 'Rajesh K. (Ops)',
      approvedBy: 'Admin',
      notes: 'Scheduled into August Operations Tour Calendar.'
    }
  ]
}; // End of defaultData


// Initialize or get data from Local Storage
const getStorageData = () => {
  const stored = localStorage.getItem('campfly_v2_data');
  if (stored) {
    const data = JSON.parse(stored);
    
    // Auto-migrate old schemas
    let migrated = false;
    if (data.strategicPlan && data.strategicPlan.startingYear === undefined) {
      data.strategicPlan = defaultData.strategicPlan;
      migrated = true;
    }
    

    // Auto-migrate priorities
    if (data.company && data.company.strategicPriorities && data.company.strategicPriorities.length > 0 && !data.company.strategicPriorities[0].strategicStatement) {
      data.company.strategicPriorities = defaultData.company.strategicPriorities;
      migrated = true;
    }


    if (!data.seasonality) { data.seasonality = defaultData.seasonality; migrated = true; }
    if (!data.marketPricing) { data.marketPricing = defaultData.marketPricing; migrated = true; }
    if (!data.confirmedTours) { data.confirmedTours = defaultData.confirmedTours; migrated = true; }
    if (!data.operationsPlans) { data.operationsPlans = defaultData.operationsPlans; migrated = true; }
    if (!data.auditLog) { data.auditLog = defaultData.auditLogs || []; migrated = true; }
    if (!data.systemSettings) { data.systemSettings = defaultData.systemSettings; migrated = true; }
    if (!data.notifications) { data.notifications = defaultData.notifications; migrated = true; }
    if (!data.auditLogs) { data.auditLogs = defaultData.auditLogs; migrated = true; }
    if (!data.holidayTourProposals) { data.holidayTourProposals = defaultData.holidayTourProposals; migrated = true; }

    if (data.company && !data.company.marketing) {
      data.company.marketing = defaultData.company.marketing;
      migrated = true;
    }
    if (!data.marketingCampaigns) {
      data.marketingCampaigns = defaultData.marketingCampaigns;
      migrated = true;
    }
    if (!data.brandAssets) { data.brandAssets = defaultData.brandAssets; migrated = true; }
    if (!data.contentPosts) { data.contentPosts = defaultData.contentPosts; migrated = true; }
    if (!data.marketingTasks) { data.marketingTasks = defaultData.marketingTasks; migrated = true; }
    if (!data.marketingApprovals) { data.marketingApprovals = defaultData.marketingApprovals; migrated = true; }
    if (!data.marketingGoals) { data.marketingGoals = defaultData.marketingGoals; migrated = true; }
    if (!data.marketingMilestones) { data.marketingMilestones = defaultData.marketingMilestones; migrated = true; }
    if (!data.marketingBudget) { data.marketingBudget = defaultData.marketingBudget; migrated = true; }
    if (!data.marketingRisks) { data.marketingRisks = defaultData.marketingRisks; migrated = true; }
    if (!data.salesTargets) { data.salesTargets = defaultData.salesTargets; migrated = true; }
    if (!data.salesLeads) { data.salesLeads = defaultData.salesLeads; migrated = true; }
    if (!data.salesFeedback || (data.salesFeedback.length > 0 && (!data.salesFeedback[0].campaignId || data.salesFeedback[0].potentialLeads === undefined))) { 
      data.salesFeedback = defaultData.salesFeedback; 
      migrated = true; 
    }
    if (!data.salesEscalations) {
      data.salesEscalations = defaultData.salesEscalations;
      migrated = true;
    }

    // Migrate tour marketing data & lifecycle if missing
    if (data.tours && Array.isArray(data.tours)) {
      data.tours.forEach((t, i) => {
        const def = defaultData.tours.find(dt => dt.id === t.id);
        if (def && def.marketing && (!t.marketing || !t.marketing.targetAudience)) {
          t.marketing = { ...def.marketing, ...(t.marketing || {}) };
          migrated = true;
        }
        if (!t.lifecycleStage || ['EXECUTE', 'CREATE', 'POST', 'UPDATE', 'PLAN', 'REVIEW'].includes(t.lifecycleStage)) {
          t.lifecycleStage = i === 0 ? 'SCHEDULED' : (i === 1 ? 'REVIEWING' : 'PLANNING');
          migrated = true;
        }
        if (!t.marketingNeeds) {
          t.marketingNeeds = {
            creativesRequired: 4,
            estimatedBudget: t.finance?.plannedRevenue ? Math.round(t.finance.plannedRevenue * 0.12) : 100000,
            targetLaunchMonth: t.travelMonth || 'August',
            channels: ['Instagram', 'Email Newsletter', 'WhatsApp'],
            campaignStatus: 'Active'
          };
          migrated = true;
        }
        if (!t.salesBriefing) {
          t.salesBriefing = {
            usps: ['Curated luxury stays', 'Expert local guides', 'Seamless private transport', 'Exclusive access'],
            targetPersona: t.marketing?.targetAudience || 'HNIs and Luxury Travellers',
            minPrice: t.finance?.plannedRevenue ? Math.round(t.finance.plannedRevenue / 20) : 35000,
            availableSeats: 20,
            bookingWindow: `${t.marketing?.promotionStart || 'Aug'} - ${t.travelMonth || 'Oct'} 2026`
          };
          migrated = true;
        }
      });
    }

    // Migrate festivals to new schema
    if (!data.festivals) {
      data.festivals = defaultData.festivals;
      migrated = true;
    } else {
      // Check if any festival still uses the old schema (has eventType but no type)
      const needsFestivalMigration = data.festivals.some(f => f.eventType && !f.type);
      if (needsFestivalMigration) {
        data.festivals = data.festivals.map(f => {
          if (f.type) return f; // already migrated
          return {
            id: f.id,
            name: f.name,
            type: 'FESTIVAL',
            startDate: f.startDate,
            endDate: f.endDate || f.startDate,
            geographicScope: 'NATIONAL',
            country: 'India',
            state: null, region: null, city: null,
            travelImpact: f.expectedTravelImpact?.toUpperCase() || 'MEDIUM',
            description: f.notes || '',
            whyItMatters: '',
            destinationIds: (f.relevantDestinations || []).map(d => d.toLowerCase()),
            tourIds: [],
            planningNotes: '',
            status: 'ACTIVE',
            recurring: false,
            schoolHoliday: null,
            createdAt: new Date().toISOString(), createdBy: 'Admin',
            updatedAt: new Date().toISOString(), updatedBy: 'Admin'
          };
        });
        migrated = true;
      }
    }

    if (migrated) {
      localStorage.setItem('campfly_v2_data', JSON.stringify(data));
    }
    
    return data;
  }
  // Initialize if empty
  localStorage.setItem('campfly_v2_data', JSON.stringify(defaultData));
  return defaultData;
};

const saveStorageData = (data) => {
  localStorage.setItem('campfly_v2_data', JSON.stringify(data));
};

export const dataService = {
  getCompanyStrategy: async () => {
    return getStorageData().company;
  },
  
  getStrategicPlan: async () => {
    return getStorageData().strategicPlan;
  },
  
  getTours: async () => {
    return getStorageData().tours;
  },

  // ---- CRUD METHODS ---- //

  updateVisionMission: async (vision, mission) => {
    // 1. Simulate server-side authentication check
    const storedSession = localStorage.getItem('mockSession');
    if (!storedSession) throw new Error('Not authenticated');
    const session = JSON.parse(storedSession);
    
    // 2. Check ADMIN permission
    if (session.role !== 'ADMIN') {
      throw new Error('Unauthorized: Only Admin users can edit Vision & Mission.');
    }

    const data = getStorageData();
    
    // Check if there are actual changes
    const visionChanged = data.company.vision !== vision;
    const missionChanged = data.company.mission !== mission;
    
    if (visionChanged || missionChanged) {
      // 3 & 4. Save new values
      data.company.vision = vision;
      data.company.mission = mission;
      
      // 5 & 6. Store updated timestamp and user name
      data.company.updatedAt = new Date().toISOString();
      data.company.updatedBy = session.name;
      
      // 7. Audit log (simulated console log since there is no persistent audit log UI yet)
      console.log(`[AUDIT LOG] ${data.company.updatedAt} - ${session.name} Updated Vision & Mission.`);
      
      saveStorageData(data);
    }
    
    return data.company;
  },


  updateStrategicPlan: async (newPlanData) => {
    const storedSession = localStorage.getItem('mockSession');
    if (!storedSession) throw new Error('Not authenticated');
    const session = JSON.parse(storedSession);
    
    if (session.role !== 'ADMIN') {
      throw new Error('Unauthorized: Only Admin users can edit the Strategic Plan.');
    }

    const data = getStorageData();
    data.strategicPlan = { ...data.strategicPlan, ...newPlanData };
    data.strategicPlan.updatedAt = new Date().toISOString();
    data.strategicPlan.updatedBy = session.name;
    
    console.log(`[AUDIT LOG] ${data.strategicPlan.updatedAt} - ${session.name} Updated Strategic Plan.`);
    
    saveStorageData(data);
    return data.strategicPlan;
  },


  // Strategic Priorities CRUD
  getStrategicPriorities: async () => {
    return getStorageData().company.strategicPriorities || [];
  },

  saveStrategicPriority: async (priorityData) => {
    const storedSession = localStorage.getItem('mockSession');
    if (!storedSession) throw new Error('Not authenticated');
    const session = JSON.parse(storedSession);
    if (session.role !== 'ADMIN') throw new Error('Unauthorized');

    const data = getStorageData();
    if (!data.company.strategicPriorities) data.company.strategicPriorities = [];

    const existingIndex = data.company.strategicPriorities.findIndex(p => p.id === priorityData.id);
    
    if (existingIndex >= 0) {
      data.company.strategicPriorities[existingIndex] = {
        ...priorityData,
        updatedAt: new Date().toISOString(),
        updatedBy: session.name
      };
      console.log(`[AUDIT LOG] ${session.name} Updated Priority: ${priorityData.name}`);
    } else {
      const newPriority = {
        ...priorityData,
        id: `p${Date.now()}`,
        createdAt: new Date().toISOString(),
        createdBy: session.name,
        updatedAt: new Date().toISOString(),
        updatedBy: session.name
      };
      data.company.strategicPriorities.push(newPriority);
      console.log(`[AUDIT LOG] ${session.name} Created Priority: ${newPriority.name}`);
    }

    saveStorageData(data);
    return data.company.strategicPriorities;
  },

  deleteStrategicPriority: async (id) => {
    const storedSession = localStorage.getItem('mockSession');
    if (!storedSession) throw new Error('Not authenticated');
    const session = JSON.parse(storedSession);
    if (session.role !== 'ADMIN') throw new Error('Unauthorized');

    const data = getStorageData();
    data.company.strategicPriorities = (data.company.strategicPriorities || []).filter(p => p.id !== id);
    console.log(`[AUDIT LOG] ${session.name} Deleted Priority: ${id}`);
    
    saveStorageData(data);
    return data.company.strategicPriorities;
  },

  addTour: async (newTour) => {
    const data = getStorageData();
    // Auto-generate ID
    const tourWithId = { ...newTour, id: `t${Date.now()}` };
    data.tours.push(tourWithId);
    saveStorageData(data);
    return tourWithId;
  },


  // --- TOURS & OPERATIONS METHODS ---

  getSeasonality: async () => getStorageData().seasonality || [],
  saveSeasonality: async (sData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN' && session?.role !== 'OPERATIONS') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.seasonality) data.seasonality = [];
    const idx = data.seasonality.findIndex(s => s.id === sData.id);
    if (idx >= 0) data.seasonality[idx] = { ...sData, updatedAt: new Date().toISOString() };
    else data.seasonality.push({ ...sData, id: `dest${Date.now()}`, createdAt: new Date().toISOString() });
    
    // Add to audit log
    if (!data.auditLog) data.auditLog = [];
    data.auditLog.unshift({
      id: `log${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      user: 'Admin',
      action: idx >= 0 ? 'Destination edited' : 'Destination added',
      details: `${sData.destinationName} seasonality updated.`
    });
    
    saveStorageData(data);
    return data.seasonality;
  },

  getMarketPricing: async () => getStorageData().marketPricing || [],
  getConfirmedTours: async () => getStorageData().confirmedTours || [],
  getOperationsPlans: async () => getStorageData().operationsPlans || [],
  saveOperationsPlan: async (opData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (!['ADMIN', 'OPERATIONS'].includes(session?.role)) throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.operationsPlans) data.operationsPlans = [];
    const idx = data.operationsPlans.findIndex(p => p.id === opData.id);
    if (idx >= 0) {
      data.operationsPlans[idx] = { ...opData, updatedAt: new Date().toISOString() };
    } else {
      data.operationsPlans.push({ ...opData, id: `op${Date.now()}`, createdAt: new Date().toISOString() });
    }
    saveStorageData(data);
    return data.operationsPlans;
  },
  getFestivals: async () => {
    return getStorageData().festivals || [];
  },
  addFestival: async (festData) => {
    const data = getStorageData();
    const newFest = {
      id: `f${Date.now()}`,
      name: festData.name,
      type: festData.type || 'FESTIVAL',
      startDate: festData.startDate,
      endDate: festData.endDate || festData.startDate,
      destinationIds: festData.destinationIds || []
    };
    data.festivals = data.festivals || [];
    data.festivals.push(newFest);
    saveStorageData(data);
    return newFest;
  },
  getAllFestivals: async () => getStorageData().festivals || [],

  saveFestival: async (fData) => {
    const storedSession = localStorage.getItem('mockSession');
    if (!storedSession) throw new Error('Not authenticated');
    const session = JSON.parse(storedSession);
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized: Only Admin can manage travel events.');

    const data = getStorageData();
    if (!data.festivals) data.festivals = [];
    if (!data.auditLog) data.auditLog = [];

    const isNew = !fData.id;
    let logDetails = '';
    let savedEvent;

    if (!isNew) {
      const idx = data.festivals.findIndex(f => f.id === fData.id);
      if (idx >= 0) {
        const old = data.festivals[idx];
        const changes = [];
        if (old.travelImpact !== fData.travelImpact) changes.push(`Travel Impact: ${old.travelImpact} → ${fData.travelImpact}`);
        if (old.startDate !== fData.startDate || old.endDate !== fData.endDate) changes.push(`Dates updated`);
        if (JSON.stringify(old.destinationIds) !== JSON.stringify(fData.destinationIds)) changes.push(`Destinations updated`);
        if (JSON.stringify(old.tourIds) !== JSON.stringify(fData.tourIds)) changes.push(`Tours updated`);
        logDetails = changes.length > 0 ? changes.join('; ') : 'Minor update';
        savedEvent = { ...old, ...fData, updatedAt: new Date().toISOString(), updatedBy: session.name };
        data.festivals[idx] = savedEvent;
      } else {
        throw new Error('Festival not found');
      }
    } else {
      savedEvent = { ...fData, id: `f${Date.now()}`, status: 'ACTIVE', createdAt: new Date().toISOString(), createdBy: session.name, updatedAt: new Date().toISOString(), updatedBy: session.name };
      data.festivals.push(savedEvent);
      logDetails = `Created: ${savedEvent.name}`;
    }

    data.auditLog.unshift({
      id: `log${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      user: session.name,
      action: isNew ? 'Event created' : 'Event updated',
      details: `${fData.name} — ${logDetails}`
    });

    saveStorageData(data);
    return savedEvent;
  },

  archiveFestival: async (id) => {
    const storedSession = localStorage.getItem('mockSession');
    if (!storedSession) throw new Error('Not authenticated');
    const session = JSON.parse(storedSession);
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');

    const data = getStorageData();
    const idx = data.festivals.findIndex(f => f.id === id);
    if (idx < 0) throw new Error('Event not found');
    const eventName = data.festivals[idx].name;
    data.festivals[idx].status = 'ARCHIVED';
    data.festivals[idx].updatedAt = new Date().toISOString();
    data.festivals[idx].updatedBy = session.name;

    if (!data.auditLog) data.auditLog = [];
    data.auditLog.unshift({ id: `log${Date.now()}`, date: new Date().toISOString().split('T')[0], user: session.name, action: 'Event archived', details: eventName });
    saveStorageData(data);
    return true;
  },

  deleteFestival: async (id) => {
    const storedSession = localStorage.getItem('mockSession');
    if (!storedSession) throw new Error('Not authenticated');
    const session = JSON.parse(storedSession);
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');

    const data = getStorageData();
    const event = data.festivals.find(f => f.id === id);
    if (!event) throw new Error('Event not found');
    data.festivals = data.festivals.filter(f => f.id !== id);

    if (!data.auditLog) data.auditLog = [];
    data.auditLog.unshift({ id: `log${Date.now()}`, date: new Date().toISOString().split('T')[0], user: session.name, action: 'Event deleted', details: event.name });
    saveStorageData(data);
    return true;
  },

  getAuditLog: async () => getStorageData().auditLog || [],

  saveTour: async (tourData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    const idx = data.tours.findIndex(t => t.id === tourData.id);
    if (idx >= 0) data.tours[idx] = { ...tourData };
    else data.tours.push({ ...tourData, id: `t${Date.now()}` });
    saveStorageData(data);
    return data.tours;
  },

  saveConfirmedTour: async (ctData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (!['ADMIN', 'OPERATIONS'].includes(session?.role)) throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.confirmedTours) data.confirmedTours = [];
    const idx = data.confirmedTours.findIndex(t => t.id === ctData.id);
    if (idx >= 0) data.confirmedTours[idx] = { ...ctData };
    else data.confirmedTours.push({ ...ctData, id: `ct${Date.now()}` });
    saveStorageData(data);
    return data.confirmedTours;
  },

  updateTour: async (id, updates) => {
    const data = getStorageData();
    const index = data.tours.findIndex(t => t.id === id);
    if (index !== -1) {
      data.tours[index] = { ...data.tours[index], ...updates };
      saveStorageData(data);
      return data.tours[index];
    }
    throw new Error('Tour not found');
  },

  deleteTour: async (id) => {
    const data = getStorageData();
    data.tours = data.tours.filter(t => t.id !== id);
    saveStorageData(data);
    return true;
  },

  addPriority: async (priority) => {
    const data = getStorageData();
    const newPriority = { ...priority, id: `p${Date.now()}` };
    data.company.strategicPriorities.push(newPriority);
    saveStorageData(data);
    return newPriority;
  },

  deletePriority: async (id) => {
    const data = getStorageData();
    data.company.strategicPriorities = data.company.strategicPriorities.filter(p => p.id !== id);
    saveStorageData(data);
    return true;
  },

  saveMarketingData: async (tourId, marketingUpdate) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized: Only Admin can update marketing data.');
    const data = getStorageData();
    const idx = data.tours.findIndex(t => t.id === tourId);
    if (idx < 0) throw new Error('Tour not found');
    data.tours[idx] = {
      ...data.tours[idx],
      marketing: {
        ...data.tours[idx].marketing,
        ...marketingUpdate,
        lastUpdated: new Date().toISOString()
      }
    };
    if (!data.auditLog) data.auditLog = [];
    data.auditLog.unshift({
      id: `log${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      user: session.name,
      action: 'Marketing data updated',
      details: `${data.tours[idx].name} — marketing fields updated`
    });
    saveStorageData(data);
    return data.tours[idx];
  },

  saveCompanyMarketing: async (marketingData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized: Only Admin can edit brand direction.');
    const data = getStorageData();
    if (!data.company) data.company = {};
    data.company.marketing = { ...data.company.marketing, ...marketingData };
    
    if (!data.auditLog) data.auditLog = [];
    data.auditLog.unshift({
      id: `log${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      user: session.name,
      action: 'Brand direction updated',
      details: 'Updated company marketing positioning and channel strategies'
    });

    saveStorageData(data);
    return data.company.marketing;
  },

  getMarketingCampaigns: async () => getStorageData().marketingCampaigns || [],

  saveMarketingCampaign: async (cData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized: Only Admin can manage campaigns.');
    const data = getStorageData();
    if (!data.marketingCampaigns) data.marketingCampaigns = [];
    
    const isNew = !cData.id;
    let saved;
    if (isNew) {
      saved = { ...cData, id: `mc${Date.now()}`, createdAt: new Date().toISOString() };
      data.marketingCampaigns.push(saved);
    } else {
      const idx = data.marketingCampaigns.findIndex(c => c.id === cData.id);
      if (idx >= 0) {
        saved = { ...data.marketingCampaigns[idx], ...cData, updatedAt: new Date().toISOString() };
        data.marketingCampaigns[idx] = saved;
      } else {
        throw new Error('Campaign not found');
      }
    }

    if (!data.auditLog) data.auditLog = [];
    data.auditLog.unshift({
      id: `log${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      user: session.name,
      action: isNew ? 'Marketing campaign created' : 'Marketing campaign updated',
      details: cData.name
    });

    saveStorageData(data);
    return saved;
  },

  deleteMarketingCampaign: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized: Only Admin can delete campaigns.');
    const data = getStorageData();
    const camp = (data.marketingCampaigns || []).find(c => c.id === id);
    data.marketingCampaigns = (data.marketingCampaigns || []).filter(c => c.id !== id);

    if (!data.auditLog) data.auditLog = [];
    data.auditLog.unshift({
      id: `log${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      user: session.name,
      action: 'Marketing campaign deleted',
      details: camp?.name || id
    });

    saveStorageData(data);
    return true;
  },

  // ── BRAND ASSETS METHODS ──
  getBrandAssets: async () => getStorageData().brandAssets || [],
  saveBrandAsset: async (assetData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized: Only Admin can add/edit brand assets.');
    const data = getStorageData();
    if (!data.brandAssets) data.brandAssets = [];
    
    const isNew = !assetData.id;
    let saved;
    if (isNew) {
      saved = { ...assetData, id: `ba${Date.now()}`, updatedAt: new Date().toISOString().split('T')[0] };
      data.brandAssets.unshift(saved);
    } else {
      const idx = data.brandAssets.findIndex(a => a.id === assetData.id);
      if (idx >= 0) {
        saved = { ...data.brandAssets[idx], ...assetData, updatedAt: new Date().toISOString().split('T')[0] };
        data.brandAssets[idx] = saved;
      } else throw new Error('Asset not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteBrandAsset: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.brandAssets = (data.brandAssets || []).filter(a => a.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── CONTENT POSTS METHODS ──
  getContentPosts: async () => getStorageData().contentPosts || [],
  saveContentPost: async (postData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.contentPosts) data.contentPosts = [];

    const isNew = !postData.id;
    let saved;
    if (isNew) {
      saved = { ...postData, id: `cp${Date.now()}` };
      data.contentPosts.unshift(saved);
    } else {
      const idx = data.contentPosts.findIndex(p => p.id === postData.id);
      if (idx >= 0) {
        saved = { ...data.contentPosts[idx], ...postData };
        data.contentPosts[idx] = saved;
      } else throw new Error('Post not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteContentPost: async (id) => {
    const data = getStorageData();
    data.contentPosts = (data.contentPosts || []).filter(p => p.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── MARKETING TASKS METHODS ──
  getMarketingTasks: async () => getStorageData().marketingTasks || [],
  saveMarketingTask: async (taskData) => {
    const data = getStorageData();
    if (!data.marketingTasks) data.marketingTasks = [];

    const isNew = !taskData.id;
    let saved;
    if (isNew) {
      saved = { ...taskData, id: `mt${Date.now()}` };
      data.marketingTasks.unshift(saved);
    } else {
      const idx = data.marketingTasks.findIndex(t => t.id === taskData.id);
      if (idx >= 0) {
        saved = { ...data.marketingTasks[idx], ...taskData };
        data.marketingTasks[idx] = saved;
      } else throw new Error('Task not found');
    }
    saveStorageData(data);
    return saved;
  },
  toggleMarketingTask: async (id) => {
    const data = getStorageData();
    const task = (data.marketingTasks || []).find(t => t.id === id);
    if (task) {
      task.status = task.status === 'Completed' ? 'To Do' : 'Completed';
      saveStorageData(data);
    }
    return task;
  },
  deleteMarketingTask: async (id) => {
    const data = getStorageData();
    data.marketingTasks = (data.marketingTasks || []).filter(t => t.id !== id);
    saveStorageData(data);
    return true;
  },
  deleteSalesFeedback: async (id) => {
    let data = getStorageData();
    if (!data.salesFeedback) return;
    data.salesFeedback = (data.salesFeedback || []).filter(f => f.id !== id);
    localStorage.setItem('campfly_v2_data', JSON.stringify(data));
  },

  getSalesEscalations: async () => getStorageData().salesEscalations || [],
  resolveEscalation: async (id) => {
    let data = getStorageData();
    if (!data.salesEscalations) return;
    const idx = data.salesEscalations.findIndex(e => e.id === id);
    if (idx >= 0) {
      data.salesEscalations[idx].status = 'Resolved';
      localStorage.setItem('campfly_v2_data', JSON.stringify(data));
    }
  },

  // ── MARKETING APPROVALS METHODS ──
  getMarketingApprovals: async () => getStorageData().marketingApprovals || [],
  saveMarketingApproval: async (appData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.marketingApprovals) data.marketingApprovals = [];

    const isNew = !appData.id;
    let saved;
    if (isNew) {
      saved = { ...appData, id: `ma${Date.now()}`, requestedDate: new Date().toISOString().split('T')[0] };
      data.marketingApprovals.unshift(saved);
    } else {
      const idx = data.marketingApprovals.findIndex(a => a.id === appData.id);
      if (idx >= 0) {
        saved = { ...data.marketingApprovals[idx], ...appData };
        data.marketingApprovals[idx] = saved;
      } else throw new Error('Approval not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteMarketingApproval: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.marketingApprovals = (data.marketingApprovals || []).filter(a => a.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── MARKETING CUSTOM METRICS CRUD ──
  getMarketingMetrics: async () => getStorageData().marketingMetrics || [],
  saveMarketingMetric: async (mMetric) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.marketingMetrics) data.marketingMetrics = [];
    const isNew = !mMetric.id;
    let saved;
    if (isNew) {
      saved = { ...mMetric, id: `mm${Date.now()}`, dateRecorded: new Date().toISOString().split('T')[0] };
      data.marketingMetrics.unshift(saved);
    } else {
      const idx = data.marketingMetrics.findIndex(m => m.id === mMetric.id);
      if (idx !== -1) {
        saved = { ...data.marketingMetrics[idx], ...mMetric, updatedAt: new Date().toISOString() };
        data.marketingMetrics[idx] = saved;
      }
    }
    saveStorageData(data);
    return saved;
  },
  deleteMarketingMetric: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.marketingMetrics = (data.marketingMetrics || []).filter(m => m.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── DYNAMIC INSIGHTS & CROSS-MODULE OPS INTEGRATION ──
  getMarketingPerformanceInsights: async () => {
    const data = getStorageData();
    const tours = data.tours || [];
    const confirmed = data.confirmedTours || [];
    const opsPlans = data.operationsPlans || [];
    const campaigns = data.marketingCampaigns || [];
    const posts = data.contentPosts || [];

    // Financial calculations from live tour & confirmed ops data
    let totalTargetRevenue = 0;
    let totalConfirmedRevenue = 0;
    let totalTargetPax = 0;
    let totalConfirmedPax = 0;

    tours.forEach(t => {
      const price = t.price || 0;
      const targetPax = t.sales?.targetCustomers || 0;
      const confirmedPax = t.sales?.confirmedBookings || 0;
      totalTargetRevenue += price * targetPax;
      totalConfirmedRevenue += price * confirmedPax;
      totalTargetPax += targetPax;
      totalConfirmedPax += confirmedPax;
    });

    // Funnel stage counts from campaigns & posts
    const funnelCounts = {
      Awareness: posts.filter(p => p.funnelCategory === 'Awareness').length + campaigns.filter(c => c.funnelCategory === 'Awareness').length + 12,
      Engagement: posts.filter(p => p.funnelCategory === 'Engagement').length + 8,
      Traffic: posts.filter(p => p.funnelCategory === 'Traffic').length + 15,
      Leads: posts.filter(p => p.funnelCategory === 'Leads').length + campaigns.filter(c => c.funnelCategory === 'Leads').length + 24,
      Conversions: totalConfirmedPax,
      Retention: 18
    };

    // Channel funnel breakdown
    const channels = [
      { name: 'Instagram Reels', funnelCategory: 'Awareness', reach: 145000, leads: 280, conv: '4.8%', revenue: Math.round(totalConfirmedRevenue * 0.45) },
      { name: 'Email Broadcasts', funnelCategory: 'Leads', reach: 22000, leads: 160, conv: '7.2%', revenue: Math.round(totalConfirmedRevenue * 0.30) },
      { name: 'Google SEO & Search', funnelCategory: 'Traffic', reach: 31000, leads: 95, conv: '3.5%', revenue: Math.round(totalConfirmedRevenue * 0.15) },
      { name: 'LinkedIn B2B Outreach', funnelCategory: 'Conversions', reach: 5500, leads: 42, conv: '8.1%', revenue: Math.round(totalConfirmedRevenue * 0.10) }
    ];

    // Ops alignment readiness
    const opsAlignment = tours.map(t => {
      const ops = opsPlans.find(o => o.tourId === t.id);
      const conf = confirmed.filter(c => c.tourId === t.id);
      return {
        tourId: t.id,
        tourName: t.name,
        travelMonth: t.travelMonth,
        promoWindow: `${t.marketing?.promotionStart} – ${t.marketing?.promotionEnd}`,
        targetPax: t.sales?.targetCustomers || 0,
        confirmedPax: t.sales?.confirmedBookings || conf.length || 0,
        opsReadiness: ops?.overallReadinessScore || 85,
        bookingLockCutoff: `${t.marketing?.promotionEnd} 15`,
        status: t.marketing?.promotionStage || 'Active'
      };
    });

    return {
      totalTargetRevenue,
      totalConfirmedRevenue,
      totalTargetPax,
      totalConfirmedPax,
      overallBookingProgress: totalTargetPax ? Math.round((totalConfirmedPax / totalTargetPax) * 100) : 0,
      funnelCounts,
      channels,
      opsAlignment
    };
  },

  // ── MARKETING GOALS CRUD ──
  getMarketingGoals: async () => getStorageData().marketingGoals || [],
  saveMarketingGoal: async (gData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.marketingGoals) data.marketingGoals = [];
    const isNew = !gData.id;
    let saved;
    if (isNew) {
      saved = { ...gData, id: `mg${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] };
      data.marketingGoals.unshift(saved);
    } else {
      const idx = data.marketingGoals.findIndex(g => g.id === gData.id);
      if (idx >= 0) {
        saved = { ...data.marketingGoals[idx], ...gData };
        data.marketingGoals[idx] = saved;
      } else throw new Error('Goal not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteMarketingGoal: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.marketingGoals = (data.marketingGoals || []).filter(g => g.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── MARKETING MILESTONES CRUD ──
  getMarketingMilestones: async () => getStorageData().marketingMilestones || [],
  saveMarketingMilestone: async (mData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.marketingMilestones) data.marketingMilestones = [];
    const isNew = !mData.id;
    let saved;
    if (isNew) {
      saved = { ...mData, id: `ms${Date.now()}` };
      data.marketingMilestones.unshift(saved);
    } else {
      const idx = data.marketingMilestones.findIndex(m => m.id === mData.id);
      if (idx >= 0) {
        saved = { ...data.marketingMilestones[idx], ...mData };
        data.marketingMilestones[idx] = saved;
      } else throw new Error('Milestone not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteMarketingMilestone: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.marketingMilestones = (data.marketingMilestones || []).filter(m => m.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── MARKETING BUDGET CRUD ──
  getMarketingBudget: async () => getStorageData().marketingBudget || [],
  saveMarketingBudgetItem: async (bData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.marketingBudget) data.marketingBudget = [];
    const isNew = !bData.id;
    let saved;
    if (isNew) {
      saved = { ...bData, id: `mb${Date.now()}` };
      data.marketingBudget.unshift(saved);
    } else {
      const idx = data.marketingBudget.findIndex(b => b.id === bData.id);
      if (idx >= 0) {
        saved = { ...data.marketingBudget[idx], ...bData };
        data.marketingBudget[idx] = saved;
      } else throw new Error('Budget item not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteMarketingBudgetItem: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.marketingBudget = (data.marketingBudget || []).filter(b => b.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── MARKETING RISKS CRUD ──
  getMarketingRisks: async () => getStorageData().marketingRisks || [],
  saveMarketingRisk: async (rData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.marketingRisks) data.marketingRisks = [];
    const isNew = !rData.id;
    let saved;
    if (isNew) {
      saved = { ...rData, id: `mr${Date.now()}`, createdDate: new Date().toISOString().split('T')[0] };
      data.marketingRisks.unshift(saved);
    } else {
      const idx = data.marketingRisks.findIndex(r => r.id === rData.id);
      if (idx >= 0) {
        saved = { ...data.marketingRisks[idx], ...rData };
        data.marketingRisks[idx] = saved;
      } else throw new Error('Risk not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteMarketingRisk: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.marketingRisks = (data.marketingRisks || []).filter(r => r.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── SALES TARGETS CRUD ──
  getSalesTargets: async () => getStorageData().salesTargets || [],
  saveSalesTarget: async (sData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.salesTargets) data.salesTargets = [];
    const isNew = !sData.id;
    let saved;
    if (isNew) {
      saved = { ...sData, id: `st${Date.now()}` };
      data.salesTargets.unshift(saved);
    } else {
      const idx = data.salesTargets.findIndex(t => t.id === sData.id);
      if (idx >= 0) {
        saved = { ...data.salesTargets[idx], ...sData };
        data.salesTargets[idx] = saved;
      } else throw new Error('Target not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteSalesTarget: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.salesTargets = (data.salesTargets || []).filter(t => t.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── SALES LEADS CRUD ──
  getSalesLeads: async () => getStorageData().salesLeads || [],
  saveSalesLead: async (lData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.salesLeads) data.salesLeads = [];
    const isNew = !lData.id;
    let saved;
    if (isNew) {
      saved = { ...lData, id: `sl${Date.now()}` };
      data.salesLeads.unshift(saved);
    } else {
      const idx = data.salesLeads.findIndex(l => l.id === lData.id);
      if (idx >= 0) {
        saved = { ...data.salesLeads[idx], ...lData };
        data.salesLeads[idx] = saved;
      } else throw new Error('Lead not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteSalesLead: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.salesLeads = (data.salesLeads || []).filter(l => l.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── SALES FEEDBACK CRUD ──
  getSalesFeedback: async () => getStorageData().salesFeedback || [],
  saveSalesFeedback: async (fData) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    if (!data.salesFeedback) data.salesFeedback = [];
    const isNew = !fData.id;
    let saved;
    if (isNew) {
      saved = { ...fData, id: `sf${Date.now()}`, date: new Date().toISOString().split('T')[0] };
      data.salesFeedback.unshift(saved);
    } else {
      const idx = data.salesFeedback.findIndex(f => f.id === fData.id);
      if (idx >= 0) {
        saved = { ...data.salesFeedback[idx], ...fData };
        data.salesFeedback[idx] = saved;
      } else throw new Error('Feedback not found');
    }
    saveStorageData(data);
    return saved;
  },
  deleteSalesFeedback: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession'));
    if (session?.role !== 'ADMIN') throw new Error('Unauthorized');
    const data = getStorageData();
    data.salesFeedback = (data.salesFeedback || []).filter(f => f.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── SYSTEM SETTINGS CRUD ──
  getSystemSettings: async () => getStorageData().systemSettings || defaultData.systemSettings,
  saveSystemSettings: async (settings) => {
    const data = getStorageData();
    data.systemSettings = { ...(data.systemSettings || defaultData.systemSettings), ...settings };
    saveStorageData(data);
    
    // Log audit
    const session = JSON.parse(localStorage.getItem('mockSession') || '{}');
    data.auditLogs = data.auditLogs || [];
    data.auditLogs.unshift({
      id: `aud${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: session?.name || 'Admin',
      role: session?.role || 'ADMIN',
      department: session?.department || 'System',
      action: 'UPDATE_SYSTEM_SETTINGS',
      entityType: 'SystemSettings',
      entityName: 'Finance & Workflow Settings',
      details: `Updated settings: Conversion Rate = ${Math.round((settings.forecastConversionRate || 0.3) * 100)}%, Ticket = ₹${settings.avgTicketSize || 100000}, Margin = ${settings.defaultProfitMargin || 25}%.`
    });
    saveStorageData(data);
    return data.systemSettings;
  },

  // ── NOTIFICATIONS CRUD ──
  getNotifications: async () => getStorageData().notifications || [],
  addNotification: async (notif) => {
    const data = getStorageData();
    if (!data.notifications) data.notifications = [];
    const newNotif = {
      ...notif,
      id: `notif${Date.now()}`,
      timestamp: notif.timestamp || new Date().toISOString(),
      read: false
    };
    data.notifications.unshift(newNotif);
    saveStorageData(data);
    return newNotif;
  },
  markNotificationRead: async (id) => {
    const data = getStorageData();
    if (data.notifications) {
      const target = data.notifications.find(n => n.id === id);
      if (target) target.read = true;
      saveStorageData(data);
    }
    return true;
  },
  markAllNotificationsRead: async () => {
    const data = getStorageData();
    if (data.notifications) {
      data.notifications.forEach(n => { n.read = true; });
      saveStorageData(data);
    }
    return true;
  },
  deleteNotification: async (id) => {
    const data = getStorageData();
    if (data.notifications) {
      data.notifications = data.notifications.filter(n => n.id !== id);
      saveStorageData(data);
    }
    return true;
  },

  // ── AUDIT LOGS CRUD ──
  getAuditLogs: async () => getStorageData().auditLogs || [],
  addAuditLog: async (log) => {
    const data = getStorageData();
    if (!data.auditLogs) data.auditLogs = [];
    const newLog = {
      ...log,
      id: `aud${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    data.auditLogs.unshift(newLog);
    saveStorageData(data);
    return newLog;
  },

  // ── HOLIDAY TOUR PROPOSALS CRUD (Festival & School Holiday Calendar+) ──
  getHolidayTourProposals: async () => getStorageData().holidayTourProposals || [],
  saveHolidayTourProposal: async (pData) => {
    const data = getStorageData();
    if (!data.holidayTourProposals) data.holidayTourProposals = [];
    const isNew = !pData.id;
    let saved;
    if (isNew) {
      saved = {
        ...pData,
        id: `htp${Date.now()}`,
        status: pData.status || 'Proposed',
        createdAt: new Date().toISOString()
      };
      data.holidayTourProposals.unshift(saved);

      // Auto-notify Admin
      if (!data.notifications) data.notifications = [];
      data.notifications.unshift({
        id: `notif${Date.now()}`,
        title: 'New Holiday Tour Proposed',
        message: `Operations proposed "${saved.tourName}" for festival/holiday. Awaiting approval.`,
        fromDept: 'Operations',
        toDept: 'Admin',
        type: 'HOLIDAY_PROPOSAL',
        timestamp: new Date().toISOString(),
        read: false,
        link: '/tours/festivals'
      });
    } else {
      const idx = data.holidayTourProposals.findIndex(p => p.id === pData.id);
      if (idx >= 0) {
        saved = { ...data.holidayTourProposals[idx], ...pData, updatedAt: new Date().toISOString() };
        data.holidayTourProposals[idx] = saved;
      } else throw new Error('Proposal not found');
    }
    saveStorageData(data);
    return saved;
  },
  approveHolidayTourProposal: async (id) => {
    const session = JSON.parse(localStorage.getItem('mockSession') || '{}');
    const data = getStorageData();
    const prop = (data.holidayTourProposals || []).find(p => p.id === id);
    if (!prop) throw new Error('Proposal not found');

    prop.status = 'Approved';
    prop.approvedBy = session?.name || 'Admin';

    // Auto-create tour into Tour Catalogue & Operations Planning
    const newTourId = `t${Date.now()}`;
    const newTour = {
      id: newTourId,
      name: prop.tourName,
      destination: prop.destination,
      category: 'Holiday Special',
      travelMonth: prop.travelMonth,
      travelDate: prop.startDate,
      season: 'Peak',
      priority: 'High',
      strategicRole: 'Holiday Special',
      lifecycleStage: 'PLANNING',
      marketing: {
        promotionStart: prop.travelMonth,
        promotionEnd: prop.travelMonth,
        promotionStage: 'Planning',
        priority: 'High',
        budgetLevel: 'High',
        targetAudience: prop.targetAudience || 'Festival Travelers',
        contentStrategy: `Festive campaign for ${prop.tourName}`,
        channels: ['Instagram', 'Email Newsletter', 'WhatsApp'],
        keyMessages: [`Celebrate with GoCampFly - ${prop.tourName}`],
        contentPillars: ['Festival Escape', 'Curated Travel']
      },
      marketingNeeds: {
        creativesRequired: 4,
        estimatedBudget: Math.round((prop.estimatedRevenue || 500000) * 0.12),
        targetLaunchMonth: prop.travelMonth,
        channels: ['Instagram', 'Email Newsletter', 'WhatsApp'],
        campaignStatus: 'Pending'
      },
      sales: {
        focusStart: prop.travelMonth,
        focusEnd: prop.travelMonth,
        targetCustomers: prop.targetPax || 20,
        expectedRevenue: prop.estimatedRevenue || 500000,
        feedback: []
      },
      salesBriefing: {
        usps: ['Curated holiday special', 'Confirmed premium stays', 'Special festival activities'],
        targetPersona: prop.targetAudience,
        minPrice: prop.pricePerPerson || 30000,
        availableSeats: prop.targetPax || 20,
        bookingWindow: `Next 30-45 days`
      },
      operations: {
        preparationStart: prop.travelMonth,
        preparationEnd: prop.travelMonth,
        expectedCustomers: prop.targetPax || 20,
        expectedProduction: prop.estimatedCost || 300000,
        capacityLevel: 'High'
      },
      finance: {
        plannedRevenue: prop.estimatedRevenue || 500000,
        actualRevenue: 0,
        plannedProductionCost: prop.estimatedCost || 300000,
        actualProductionCost: 0,
        plannedProfit: prop.estimatedProfit || 200000,
        actualProfit: 0,
        plannedMargin: 35,
        actualMargin: 0
      }
    };

    data.tours = data.tours || [];
    data.tours.unshift(newTour);

    // Auto-notify Marketing and Sales
    
    // Auto-notifications on stage transitions
    // Auto-notifications on stage transitions
    data.notifications = data.notifications || [];

    data.notifications.unshift({
      id: `notif_mkt_${Date.now()}`,
      title: 'Approved Holiday Tour Ready for Marketing',
      message: `"${prop.tourName}" has been approved. Marketing campaign planning required (${newTour.marketingNeeds.creativesRequired} creatives, budget: ₹${(newTour.marketingNeeds.estimatedBudget / 100000).toFixed(1)}L).`,
      fromDept: 'Operations',
      toDept: 'Marketing',
      type: 'TOUR_CREATED',
      timestamp: new Date().toISOString(),
      read: false,
      link: '/marketing-strategy',
      tourId: newTourId
    });

    data.notifications.unshift({
      id: `notif_sls_${Date.now()}`,
      title: 'New Holiday Tour Added to Catalogue',
      message: `"${prop.tourName}" is approved for ${prop.travelMonth}. Sales product briefing available.`,
      fromDept: 'Operations',
      toDept: 'Sales',
      type: 'TOUR_CREATED',
      timestamp: new Date().toISOString(),
      read: false,
      link: '/sales-strategy',
      tourId: newTourId
    });

    // Log audit
    data.auditLogs = data.auditLogs || [];
    data.auditLogs.unshift({
      id: `aud${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: session?.name || 'Admin',
      role: session?.role || 'ADMIN',
      department: 'Management',
      action: 'APPROVE_HOLIDAY_TOUR',
      entityType: 'HolidayProposal',
      entityName: prop.tourName,
      details: `Approved holiday tour proposal. Created tour in catalogue and scheduled notifications.`
    });

    saveStorageData(data);
    return prop;
  },
  deleteHolidayTourProposal: async (id) => {
    const data = getStorageData();
    data.holidayTourProposals = (data.holidayTourProposals || []).filter(p => p.id !== id);
    saveStorageData(data);
    return true;
  },

  // ── OPERATIONS LIFECYCLE MANAGEMENT (Plan → Create → Execute → Post) ──
  advanceTourLifecycle: async (tourId, newStage, updates = {}) => {
    const session = JSON.parse(localStorage.getItem('mockSession') || '{}');
    const data = getStorageData();
    const tour = (data.tours || []).find(t => t.id === tourId);
    if (!tour) throw new Error('Tour not found');

    const prevStage = tour.lifecycleStage || 'PLANNING';
    tour.lifecycleStage = newStage;
    if (updates) {
      Object.assign(tour, updates);
    }

    // Auto-notifications on stage transitions
    data.notifications = data.notifications || [];
    if (newStage === 'SCHEDULED' && prevStage === 'PLANNING') {
      data.notifications.unshift({
        id: `notif_adv_${Date.now()}`,
        title: 'Tour Moved to SCHEDULED Phase',
        message: `Operations is building the product for "${tour.name}". Marketing creatives needed: ${tour.marketingNeeds?.creativesRequired || 4}.`,
        fromDept: 'Operations',
        toDept: 'Marketing',
        type: 'TOUR_CREATED',
        timestamp: new Date().toISOString(),
        read: false,
        link: '/marketing-strategy',
        tourId: tour.id
      });
      data.notifications.unshift({
        id: `notif_sls_adv_${Date.now()}`,
        title: 'New Product Briefing Available',
        message: `Sales briefing ready for "${tour.name}". Destination: ${tour.destination}.`,
        fromDept: 'Operations',
        toDept: 'Sales',
        type: 'TOUR_CREATED',
        timestamp: new Date().toISOString(),
        read: false,
        link: '/sales-strategy',
        tourId: tour.id
      });
    } else if (newStage === 'POST') {
      data.notifications.unshift({
        id: `notif_post_${Date.now()}`,
        title: 'Tour Completed — Financial Actuals Updated',
        message: `"${tour.name}" has completed execution. Actual costs and final revenue reconciled in Finance.`,
        fromDept: 'Operations',
        toDept: 'Finance',
        type: 'P&L_ALERT',
        timestamp: new Date().toISOString(),
        read: false,
        link: '/finance-planning',
        tourId: tour.id
      });
    }

    // Log Audit
    data.auditLogs = data.auditLogs || [];
    data.auditLogs.unshift({
      id: `aud${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: session?.name || 'Operations Lead',
      role: session?.role || 'OPERATIONS',
      department: 'Operations',
      action: 'ADVANCE_LIFECYCLE',
      entityType: 'Tour',
      entityName: tour.name,
      details: `Advanced lifecycle stage from ${prevStage} → ${newStage}.`
    });

    saveStorageData(data);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('tourUpdated'));
    }
    return tour;
  },

  // ── DATA QUALITY AUTOMATED SCANNER ──
  runDataQualityScan: async () => {
    const data = getStorageData();
    const issues = [];
    const tours = data.tours || [];
    const campaigns = data.marketingCampaigns || [];
    const leads = data.salesLeads || [];
    const feedback = data.salesFeedback || [];
    const plans = data.operationsPlans || [];

    // 1. Tour Data Checks
    tours.forEach(t => {
      if (!t.finance?.plannedRevenue || t.finance.plannedRevenue === 0) {
        issues.push({
          id: `dq_t_rev_${t.id}`,
          module: 'Tour Catalogue',
          severity: 'CRITICAL',
          title: `Tour missing planned revenue`,
          description: `Tour "${t.name}" does not have target revenue defined.`,
          entityId: t.id,
          link: '/tours/portfolio'
        });
      }
      if (!t.salesBriefing || !t.salesBriefing.usps || t.salesBriefing.usps.length === 0) {
        issues.push({
          id: `dq_t_usp_${t.id}`,
          module: 'Sales Strategy',
          severity: 'WARNING',
          title: `Missing sales briefing / USPs`,
          description: `Tour "${t.name}" does not have USPs or target customer persona for sales team.`,
          entityId: t.id,
          link: '/sales-strategy'
        });
      }
    });

    // 2. Marketing Campaigns Checks
    campaigns.forEach(c => {
      if (!c.targetAudience) {
        issues.push({
          id: `dq_m_aud_${c.id}`,
          module: 'Marketing Strategy',
          severity: 'WARNING',
          title: `Campaign missing target audience`,
          description: `Campaign "${c.name}" has no target audience configured.`,
          entityId: c.id,
          link: '/marketing-strategy'
        });
      }
      const hasFeedback = feedback.some(f => f.campaignId === c.id);
      if (!hasFeedback) {
        issues.push({
          id: `dq_m_fb_${c.id}`,
          module: 'Sales Feedback',
          severity: 'INFO',
          title: `No sales feedback recorded`,
          description: `Campaign "${c.name}" has not received any sales feedback logs yet.`,
          entityId: c.id,
          link: '/sales-strategy'
        });
      }
    });

    // 3. Sales Leads Checks
    leads.forEach(l => {
      if (!l.nextFollowUp && l.stage !== 'Won' && l.stage !== 'Lost') {
        issues.push({
          id: `dq_s_fol_${l.id}`,
          module: 'Sales Strategy',
          severity: 'WARNING',
          title: `Lead without follow-up date`,
          description: `Active opportunity "${l.name}" has no next follow-up date set.`,
          entityId: l.id,
          link: '/sales-strategy'
        });
      }
    });

    // 4. Operations Plans Checks
    plans.forEach(p => {
      if (!p.departureDate) {
        issues.push({
          id: `dq_o_date_${p.id}`,
          module: 'Operations Planning',
          severity: 'CRITICAL',
          title: `Operations plan missing departure date`,
          description: `Plan #${p.id} has no departure date assigned.`,
          entityId: p.id,
          link: '/tours/planning'
        });
      }
    });

    // Calculate score
    const totalChecks = tours.length * 2 + campaigns.length * 2 + leads.length + plans.length + 10;
    const criticalPenalty = issues.filter(i => i.severity === 'CRITICAL').length * 8;
    const warningPenalty = issues.filter(i => i.severity === 'WARNING').length * 4;
    const infoPenalty = issues.filter(i => i.severity === 'INFO').length * 1;
    const rawScore = Math.max(0, 100 - criticalPenalty - warningPenalty - infoPenalty);

    return {
      overallScore: rawScore,
      scannedAt: new Date().toISOString(),
      stats: {
        totalIssues: issues.length,
        critical: issues.filter(i => i.severity === 'CRITICAL').length,
        warning: issues.filter(i => i.severity === 'WARNING').length,
        info: issues.filter(i => i.severity === 'INFO').length
      },
      moduleScores: {
        operations: Math.max(70, 100 - (issues.filter(i => i.module.includes('Operations') || i.module.includes('Catalogue')).length * 6)),
        marketing: Math.max(75, 100 - (issues.filter(i => i.module.includes('Marketing')).length * 8)),
        sales: Math.max(80, 100 - (issues.filter(i => i.module.includes('Sales')).length * 6)),
        finance: 98
      },
      issues
    };
  },

  // ── OPERATIONS HANDOVER TO MARKETING API ──
  getMarketingOperationsHandover: async () => {
    const data = getStorageData();
    const tours = data.tours || [];
    return tours.map(t => ({
      tourId: t.id,
      tourName: t.name,
      destination: t.destination,
      travelMonth: t.travelMonth,
      lifecycleStage: t.lifecycleStage || 'PLANNING',
      creativesRequired: t.marketingNeeds?.creativesRequired || 4,
      estimatedBudget: t.marketingNeeds?.estimatedBudget || 100000,
      channels: t.marketingNeeds?.channels || ['Instagram', 'Email Newsletter', 'WhatsApp'],
      targetLaunchMonth: t.marketingNeeds?.targetLaunchMonth || t.travelMonth,
      campaignStatus: t.marketingNeeds?.campaignStatus || 'Pending',
      targetAudience: t.marketing?.targetAudience || 'HNIs and Luxury Travellers',
      contentStrategy: t.marketing?.contentStrategy || ''
    }));
  },

  // ── SALES PRODUCT KNOWLEDGE BRIEFING API ──
  getSalesProductKnowledge: async () => {
    const data = getStorageData();
    const tours = data.tours || [];
    return tours.map(t => ({
      tourId: t.id,
      tourName: t.name,
      destination: t.destination,
      travelMonth: t.travelMonth,
      season: t.season,
      category: t.category,
      minPrice: t.salesBriefing?.minPrice || 35000,
      availableSeats: t.salesBriefing?.availableSeats || 18,
      bookingWindow: t.salesBriefing?.bookingWindow || `${t.travelMonth} 2026`,
      usps: t.salesBriefing?.usps || ['Curated luxury experience', 'Private local transport'],
      targetPersona: t.salesBriefing?.targetPersona || t.marketing?.targetAudience || 'HNIs & Families',
      keyMessages: t.marketing?.keyMessages || []
    }));
  },

  // ── OPS TO SALES PERFORMANCE API ──
  getOpsSalesPerformanceLogs: async () => {
    const data = getStorageData();
    return data.opsSalesPerformanceLogs || [];
  },

  addOpsSalesPerformanceLog: async (log) => {
    const data = getStorageData();
    const newLog = { ...log, id: Date.now() };
    data.opsSalesPerformanceLogs = [newLog, ...(data.opsSalesPerformanceLogs || [])];
    saveStorageData(data);
    return newLog;
  },

  // Method to completely reset the database to defaults
  resetToDefaults: async () => {
    saveStorageData(defaultData);
    return true;
  }
};
