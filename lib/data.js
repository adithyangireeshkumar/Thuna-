export const analytics = [
  {
    labelEn: "Total FIRs Registered",
    value: "124,592",
    subEn: "Public aggregate across participating districts",
    subMl: "പങ്കെടുക്കുന്ന ജില്ലകളിലെ പൊതു മൊത്തം എണ്ണം",
    tone: "text-police dark:text-copperSoft",
    icon: "📘"
  },
  {
    labelEn: "Active Cases",
    value: "32,104",
    subEn: "Cases currently visible in investigation or court stages",
    subMl: "അന്വേഷണത്തിലോ കോടതിയിലോ ഉള്ള കേസുകൾ",
    tone: "text-ink dark:text-white",
    icon: "🕘"
  },
  {
    labelEn: "Closed / Resolved",
    value: "89,450",
    subEn: "Read-only closed outcomes published this year",
    subMl: "ഈ വർഷം പ്രസിദ്ധീകരിച്ച പരിഹരിച്ച കേസുകൾ",
    tone: "text-copper dark:text-copperSoft",
    icon: "✅"
  }
];

export const quickActions = [
  {
    href: "/public-data",
    kicker: "Search Cases",
    titleEn: "Find FIR summaries and track public-safe case progress",
    titleMl: "എഫ്‌.ഐ‌.ആർ സാരാംശങ്ങളും കേസ് പുരോഗതിയും കാണുക"
  },
  {
    href: "/crime-map",
    kicker: "Crime Map",
    titleEn: "Review district-level hotspots and category patterns",
    titleMl: "ജില്ലാതല ഹോട്ട്‌സ്‌പോട്ടുകളും വിഭാഗങ്ങളും പരിശോധിക്കുക"
  },
  {
    href: "/news",
    kicker: "Verify News",
    titleEn: "Read official alerts and fact-checked public notices",
    titleMl: "ഔദ്യോഗിക അറിയിപ്പുകളും വസ്തുത പരിശോധിച്ച വാർത്തകളും വായിക്കുക"
  }
];

export const caseRecords = [
  {
    id: "fir-482-2023",
    firNumber: "FIR 482/2023",
    date: "20 Oct 2023",
    reportedAt: "14 Oct 2023, 10:45 AM",
    district: "Thiruvananthapuram",
    station: "Thampanoor Police Station",
    categoryEn: "Financial Fraud / Cyber Crime",
    categoryMl: "സാമ്പത്തിക തട്ടിപ്പ് / സൈബർ കുറ്റകൃത്യം",
    status: "under-investigation",
    statusLabelEn: "Under Investigation",
    summaryEn:
      "Complaint concerns a phishing ring targeting senior citizens through spoofed cooperative bank alerts.",
    summaryMl: "സഹകരണ ബാങ്ക് സന്ദേശങ്ങൾ വ്യാജമായി അയച്ചു മുതിർന്നവരെ ലക്ഷ്യമിട്ട തട്ടിപ്പ്.",
    descriptionEn:
      "The complaint alleges a coordinated phishing scheme that redirected victims to fake cooperative banking pages and triggered unauthorized transfers. Public details have been redacted to preserve investigation integrity.",
    sections: ["420", "406", "120B"],
    location: {
      primary: "Thampanoor Central Junction, Ward 12",
      secondary: "Thiruvananthapuram District"
    },
    officer: {
      name: "P. R. Rajesh Kumar",
      rank: "Inspector of Police (SHO)",
      contact: "0471-2326541"
    },
    timeline: [
      {
        date: "20 Oct 2023",
        type: "completed",
        detailEn: "Suspect-linked accounts were frozen after the preliminary cyber forensic report."
      },
      {
        date: "16 Oct 2023",
        type: "completed",
        detailEn: "Statements were recorded from primary complainants under CrPC 161."
      },
      {
        date: "14 Oct 2023",
        type: "registered",
        detailEn: "FIR registered at Thampanoor Police Station and routed to cyber support staff."
      }
    ],
    map: { x: 62, y: 42, intensity: 42 }
  },
  {
    id: "trv-0892-2024",
    firNumber: "FIR 2024/TRV/0892",
    date: "24 Oct 2024",
    reportedAt: "24 Oct 2024, 09:10 AM",
    district: "Thiruvananthapuram",
    station: "Palayam Police Station",
    categoryEn: "Financial Fraud",
    categoryMl: "സാമ്പത്തിക തട്ടിപ്പ്",
    status: "under-investigation",
    statusLabelEn: "Under Investigation",
    summaryEn: "Fraudulent investment messages reportedly induced multiple digital wallet transfers.",
    summaryMl: "വ്യാജ നിക്ഷേപ സന്ദേശങ്ങൾ വഴി ഡിജിറ്റൽ വാലറ്റുകളിൽ നിന്ന് പണം കൈമാറ്റം ചെയ്തു.",
    descriptionEn:
      "Public complaint summary references unauthorized wallet transfers tied to fraudulent social media investment promises. Full complainant identities remain withheld.",
    sections: ["420", "66D IT Act"],
    location: {
      primary: "Near Museum Junction",
      secondary: "Thiruvananthapuram District"
    },
    officer: {
      name: "Asha K. Nair",
      rank: "Sub Inspector",
      contact: "0471-2468001"
    },
    timeline: [
      {
        date: "24 Oct 2024",
        type: "registered",
        detailEn: "Case registered after the digital fraud complaint was validated for public disclosure."
      },
      {
        date: "25 Oct 2024",
        type: "active",
        detailEn: "Banking transaction trails were requested from the service providers."
      }
    ],
    map: { x: 65, y: 48, intensity: 18 }
  },
  {
    id: "ekm-1104-2024",
    firNumber: "FIR 2024/EKM/1104",
    date: "22 Oct 2024",
    reportedAt: "22 Oct 2024, 08:30 PM",
    district: "Ernakulam",
    station: "Kaloor Police Station",
    categoryEn: "Vehicle Theft",
    categoryMl: "വാഹന മോഷണം",
    status: "unsolved",
    statusLabelEn: "Unsolved",
    summaryEn: "A two-wheeler theft was reported from a public parking area near Kaloor stadium.",
    summaryMl: "കലൂർ സ്റ്റേഡിയത്തിന് സമീപമുള്ള പാർക്കിംഗിൽ നിന്നുള്ള ഇരുചക്രവാഹന മോഷണം.",
    descriptionEn:
      "The case concerns the theft of a registered two-wheeler from an attended parking zone. CCTV-based follow-up remains ongoing and identifying details are withheld.",
    sections: ["379 IPC"],
    location: {
      primary: "Kaloor Stadium Parking",
      secondary: "Ernakulam District"
    },
    officer: {
      name: "M. Anoop Das",
      rank: "Assistant Sub Inspector",
      contact: "0484-2387741"
    },
    timeline: [
      {
        date: "22 Oct 2024",
        type: "registered",
        detailEn: "Vehicle theft FIR was registered and CCTV retrieval was initiated."
      },
      {
        date: "23 Oct 2024",
        type: "active",
        detailEn: "Investigators collected camera footage from adjacent commercial premises."
      }
    ],
    map: { x: 44, y: 52, intensity: 12 }
  },
  {
    id: "knr-0451-2024",
    firNumber: "FIR 2024/KNR/0451",
    date: "20 Oct 2024",
    reportedAt: "20 Oct 2024, 11:10 AM",
    district: "Kannur",
    station: "Kannur Town Station",
    categoryEn: "Cyber Defamation",
    categoryMl: "സൈബർ അപകീർത്തിപ്പെടുത്തൽ",
    status: "resolved",
    statusLabelEn: "Resolved",
    summaryEn: "Case involved circulation of edited media targeting a local institution.",
    summaryMl: "പ്രാദേശിക സ്ഥാപനത്തെ ലക്ഷ്യമിട്ട് തിരുത്തിയ ദൃശ്യങ്ങൾ പ്രചരിപ്പിച്ച സംഭവം.",
    descriptionEn:
      "The matter involved alleged publication of manipulated media through anonymous accounts. Public note reflects only the institutional aspect of the complaint.",
    sections: ["499 IPC", "67 IT Act"],
    location: {
      primary: "Kannur Town Civic Zone",
      secondary: "Kannur District"
    },
    officer: {
      name: "N. Vineetha",
      rank: "Inspector of Police",
      contact: "0497-2718890"
    },
    timeline: [
      {
        date: "20 Oct 2024",
        type: "registered",
        detailEn: "Complaint was registered after a digital defamation petition was received."
      },
      {
        date: "28 Oct 2024",
        type: "completed",
        detailEn: "Linked accounts were identified and takedown compliance was completed."
      }
    ],
    map: { x: 34, y: 24, intensity: 9 }
  },
  {
    id: "kkd-0310-2024",
    firNumber: "FIR 2024/KKD/0310",
    date: "18 Oct 2024",
    reportedAt: "18 Oct 2024, 02:15 PM",
    district: "Kozhikode",
    station: "Nadakkavu Police Station",
    categoryEn: "Theft & Burglary",
    categoryMl: "മോഷണവും കവർച്ചയും",
    status: "court",
    statusLabelEn: "Court Proceedings",
    summaryEn: "Burglary case has moved into court proceedings after recovery and charge submission.",
    summaryMl: "വീട്ടുകയറ്റ മോഷണ കേസ് ചാർജ് സമർപ്പണത്തിന് ശേഷം കോടതിയിൽ.",
    descriptionEn:
      "Public summary relates to a residential burglary where material recovery has already been reported. The portal reflects the case as transitioned to court.",
    sections: ["457 IPC", "380 IPC"],
    location: {
      primary: "Nadakkavu Residential Block",
      secondary: "Kozhikode District"
    },
    officer: {
      name: "S. Dileep Kumar",
      rank: "Circle Inspector",
      contact: "0495-2765132"
    },
    timeline: [
      {
        date: "18 Oct 2024",
        type: "registered",
        detailEn: "Residential burglary complaint registered and scene documentation completed."
      },
      {
        date: "29 Oct 2024",
        type: "court",
        detailEn: "Final report moved into court after recovery list and witness statements were filed."
      }
    ],
    map: { x: 38, y: 40, intensity: 14 }
  }
];

export const districts = [...new Set(caseRecords.map((record) => record.district))];
export const caseCategories = [...new Set(caseRecords.map((record) => record.categoryEn))];
export const mapCategories = caseCategories;

export const statuses = [
  { value: "under-investigation", label: "Under Investigation" },
  { value: "active", label: "Active" },
  { value: "resolved", label: "Resolved" },
  { value: "court", label: "Court Proceedings" },
  { value: "unsolved", label: "Unsolved" }
];

export const newsItems = [
  {
    badge: "Verified Alert",
    date: "24 Oct 2024",
    titleEn: "Cyber Squad dismantles online job-fraud ring in Ernakulam.",
    titleMl: "എറണാകുളത്ത് ഓൺലൈൻ തൊഴിൽ തട്ടിപ്പ് ശൃംഖല പൊളിച്ചു.",
    summaryEn:
      "District cyber officers issued a verified public alert after coordinated arrests related to fake overseas recruitment messages.",
    href: "/news"
  },
  {
    badge: "Official Statement",
    date: "22 Oct 2024",
    titleEn: "Clarification on fake public-order messages circulating in Trivandrum.",
    titleMl: "തിരുവനന്തപുരം മേഖലയിൽ പ്രചരിക്കുന്ന വ്യാജ സന്ദേശങ്ങളെ കുറിച്ചുള്ള വിശദീകരണം.",
    summaryEn:
      "Kerala Police clarified that several viral posts about night restrictions were fabricated and advised citizens to follow official channels only.",
    href: "/news"
  },
  {
    badge: "Traffic Update",
    date: "20 Oct 2024",
    titleEn: "New heavy-vehicle diversion regulations announced for State Highway 1.",
    titleMl: "സംസ്ഥാന പാത 1-ൽ പുതിയ ഹെവി വാഹന നിയന്ത്രണങ്ങൾ പ്രഖ്യാപിച്ചു.",
    summaryEn:
      "The verified advisory includes lane closures, diversion windows, and emergency contact instructions for commuters and operators.",
    href: "/news"
  }
];

export function findCaseById(caseId) {
  return caseRecords.find((record) => record.id === caseId);
}
