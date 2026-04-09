const { useState, useEffect, useCallback, useRef, createElement } = React;

/* ── constants ── */
const ATTACK_TYPES = [{
  value: "jackpotting",
  label: "Jackpotting",
  cat: "Cyber-Physical"
}, {
  value: "black_box",
  label: "Black box attack",
  cat: "Cyber-Physical"
}, {
  value: "mitm",
  label: "Man-in-the-middle",
  cat: "Cyber"
}, {
  value: "hook_chain",
  label: "Hook & chain",
  cat: "Physical"
}, {
  value: "ram_raid",
  label: "Ram raid",
  cat: "Physical"
}];
const CATEGORIES = ["Cyber", "Physical", "Cyber-Physical"];
const MAGNITUDES = ["Low", "Medium", "High", "Critical"];
const OUTCOMES = ["Prevented", "Successful", "Under investigation"];
const STATUSES = ["Open", "In progress", "Closed"];
const TIERS = ["Tier 1 — Fully compliant", "Tier 2 — Compensating controls", "Tier 3 — Non-compliant"];
const TEAMS = ["Brinks", "ACG", "Burroughs", "Cennox"];
const TEAM_MEMBERS = ["Victor Smith", "Tony Mercer", "Jim Reeder", "Byron Lubbe", "Susan Nicholls", "Kyle Suter", "David Barrowman"];
const FIELD_TECHS = ["David Barrowman", "Rowdy", "Curtis", "Cennox tech", "Andrew", "DB2"];
const CURRENT_USER = "Ryan Loesch";
const THREAT_STATUSES = ["Active — crime in progress", "Recent — suspects may be present", "Discovered after the fact"];
const ALERT_SOURCES = ["Cabinet door open", "Transaction anomaly", "Seismic/vibration sensor", "Video analytics", "Manual report", "Host system alert", "Other"];
const PH_REQS = [{
  id: "PH-001",
  name: "Safe rating"
}, {
  id: "PH-002",
  name: "Anchoring & bolt-down"
}, {
  id: "PH-003",
  name: "Anti-ram raid protection"
}, {
  id: "PH-004",
  name: "Anti-hook & chain"
}, {
  id: "PH-005",
  name: "Upper cabinet lock"
}, {
  id: "PH-006",
  name: "Cabinet tamper detection"
}, {
  id: "PH-007",
  name: "Video & lighting"
}, {
  id: "PH-008",
  name: "Physical port protection"
}, {
  id: "PH-009",
  name: "End-of-life PC core"
}];
const SW_REQS = [{
  id: "SW-001",
  name: "BIOS password & boot security"
}, {
  id: "SW-002",
  name: "Full disk encryption"
}, {
  id: "SW-003",
  name: "Application whitelisting"
}, {
  id: "SW-004",
  name: "OS hardening"
}, {
  id: "SW-005",
  name: "Communications encryption"
}, {
  id: "SW-006",
  name: "Credential management"
}, {
  id: "SW-007",
  name: "Firewall configuration"
}, {
  id: "SW-008",
  name: "Patch management"
}, {
  id: "SW-009",
  name: "DMA/PCIe attack prevention"
}, {
  id: "SW-010",
  name: "Dispenser communication"
}, {
  id: "SW-011",
  name: "Remote management security"
}, {
  id: "SW-012",
  name: "USB & removable media"
}, {
  id: "SW-013",
  name: "Secure software distribution"
}, {
  id: "SW-014",
  name: "PIN pad encryption (TR-31/TR-34)"
}, {
  id: "SW-015",
  name: "EMV-only authentication"
}];
const CRT_CONTACTS = [{
  name: "Victor Smith",
  role: "Primary",
  phone: "919-749-7720"
}, {
  name: "Tony Mercer",
  role: "Key player",
  phone: "919-592-2882"
}, {
  name: "Jim Reeder",
  role: "Key player",
  phone: "423-914-0804"
}, {
  name: "Byron Lubbe",
  role: "Key player",
  phone: "682-380-9563"
}, {
  name: "Susan Nicholls",
  role: "Key player",
  phone: "—"
}];
const CAT_STYLE = {
  Cyber: {
    bg: "#1a2e40",
    text: "#5eb8ff",
    border: "#2a4a66"
  },
  Physical: {
    bg: "#3a1c10",
    text: "#f0997b",
    border: "#5a2e1a"
  },
  "Cyber-Physical": {
    bg: "#2a2050",
    text: "#b0a4f0",
    border: "#3e3070"
  }
};
const STATUS_STYLE = {
  Open: {
    bg: "#1a2e40",
    text: "#5eb8ff"
  },
  "In progress": {
    bg: "#3a2a0a",
    text: "#f0c050"
  },
  Closed: {
    bg: "#1a3020",
    text: "#6ecf80"
  }
};
const OUTCOME_STYLE = {
  Prevented: {
    bg: "#1a3020",
    text: "#6ecf80"
  },
  Successful: {
    bg: "#3a1418",
    text: "#f07070"
  },
  "Under investigation": {
    bg: "#3a2a0a",
    text: "#f0c050"
  }
};
const MAG_STYLE = {
  Low: {
    bg: "#1a3020",
    text: "#6ecf80"
  },
  Medium: {
    bg: "#3a2a0a",
    text: "#f0c050"
  },
  High: {
    bg: "#3a2010",
    text: "#f09050"
  },
  Critical: {
    bg: "#3a1418",
    text: "#f07070"
  }
};
const SAMPLE_ATTACKS = [{
  "id": "ATT-001",
  "name": "Ram raid attack",
  "type": "ram_raid",
  "category": "Physical",
  "terminalNumber": "P712582",
  "atmSerial": "",
  "atmModel": "Hyosung 7I",
  "assetId": "BRNK-OK004521",
  "city": "Durant",
  "state": "OK",
  "region": "Southwest",
  "bank": "Vision Bank Oklahoma",
  "liability": "FI-owned",
  "avgDailyCash": "$12,400",
  "magnitude": "High",
  "outcome": "Under investigation",
  "date": "2026-02-17T04:57:00",
  "status": "Open",
  "reportedBy": "Victor Smith",
  "conferenceBridge": "1-800-555-0142",
  "reportAttachment": "incident-report-ATT001.pdf",
  "description": "Physical ram-raid at Vision Bank VB-Durant University, 2514 University Blvd, Durant OK 74701. Cabinet door open alert triggered at 04:57 AM local. Vehicle impact to structure confirmed.",
  "loss": "",
  "assignedTo": "Byron Lubbe",
  "fieldTeam": "David Barrowman",
  "fieldTeamCompany": "Brinks",
  "process": "1. Alert received via monitoring system (cabinet door open)\n2. CCR contacted Victor Smith (primary)\n3. CRT activated: Tony Mercer, Jim Reeder, Byron Lubbe, Susan Nicholls notified\n4. LEO dispatched — local PD, case reference #211166\n5. Field tech David Barrowman dispatched 05:02 AM, arrived 07:56 AM\n6. On-site assessment: vehicle damage to exterior structure, upper cabinet breached\n7. Pending: cash count, safe integrity check, surveillance review",
  "result": "Pending remediation. Unit offline. Insurance claim initiated.",
  "learnings": "Response time exceeded target at 2h54m. CRT notification effective. LEO script used successfully. PH-003 gap identified — no bollards present.",
  "activityLog": [{
    "time": "Feb 17 04:57 AM",
    "action": "Alert triggered",
    "detail": "Cabinet door open — monitoring system"
  }, {
    "time": "Feb 17 05:01 AM",
    "action": "CRT notified",
    "detail": "Victor Smith, Byron Lubbe, Tony Mercer, Jim Reeder, Susan Nicholls"
  }, {
    "time": "Feb 17 05:02 AM",
    "action": "Tech dispatched",
    "detail": "David Barrowman — ETA 3 hours"
  }, {
    "time": "Feb 17 05:08 AM",
    "action": "LEO contacted",
    "detail": "Durant PD — case #211166 assigned"
  }, {
    "time": "Feb 17 07:56 AM",
    "action": "Tech on-site",
    "detail": "David Barrowman arrived, began assessment"
  }],
  "contacts": {
    "Victor Smith": "05:01 AM",
    "Tony Mercer": "05:01 AM",
    "Byron Lubbe": "05:01 AM",
    "Jim Reeder": "05:02 AM",
    "Susan Nicholls": ""
  },
  "leo": {
    "agency": "Durant PD",
    "caseNumber": "#211166",
    "officer": "",
    "dispatchTime": "05:08 AM"
  },
  "techDispatch": {
    "name": "David Barrowman",
    "company": "Brinks",
    "dispatchTime": "05:02 AM",
    "eta": "3 hours",
    "arrivalTime": "07:56 AM"
  },
  "compliance": {
    "PH-001": {
      "status": "pass",
      "finding": "UL 291 Level 1"
    },
    "PH-002": {
      "status": "pass",
      "finding": "4 bolts, 16mm, concrete"
    },
    "PH-003": {
      "status": "fail",
      "finding": "No bollards present"
    },
    "PH-004": {
      "status": "pass",
      "finding": "Level 2 door installed"
    },
    "PH-006": {
      "status": "pass",
      "finding": "Alert fired at 04:57"
    },
    "PH-007": {
      "status": "pass",
      "finding": "Camera present, footage captured"
    }
  },
  "tierCurrent": "Tier 1 — Fully compliant",
  "tierProposed": "Tier 3 — Non-compliant",
  "tierJustification": "PH-003 failure — no anti-ram raid protection present at island unit.",
  "alertSource": {
    "policyName": "Cabinet Door Open",
    "monitoringSystem": "VTS Monitoring",
    "alertStatus": "OPEN-NEW"
  },
  "safetyAssessment": {
    "threatStatus": "Recent — suspects may be present",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": "Vehicle departed scene prior to alert acknowledgment"
  },
  "suspects": [{
    "description": "Unknown — no witnesses at time of discovery",
    "gender": "",
    "age": "",
    "height": "",
    "build": "",
    "clothing": "",
    "distinguishing": ""
  }],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "#211166",
    "socHotline": "SOC 24/7 Hotline",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": ""
  }
}, {
  "id": "ATT-002",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "P891204",
  "atmSerial": "HY7600-0112",
  "atmModel": "Hyosung 7600i",
  "assetId": "BRNK-FL009302",
  "city": "Miami",
  "state": "FL",
  "region": "Southeast",
  "bank": "First National",
  "liability": "Brinks-owned",
  "avgDailyCash": "$18,200",
  "magnitude": "Critical",
  "outcome": "Successful",
  "date": "2026-01-28T17:32:00",
  "status": "Closed",
  "description": "Malware-based jackpotting via hard drive swap. Criminal hard drive recovered. Ploutus variant identified during forensic analysis by Kyle Suter.",
  "loss": "$42,600",
  "assignedTo": "Kyle Suter",
  "fieldTeam": "Curtis",
  "fieldTeamCompany": "Brinks",
  "process": "1. Transaction anomaly detected — multiple unauthorized dispenses\n2. Unit taken offline remotely\n3. Field tech dispatched, criminal hard drive recovered\n4. Forensic analysis initiated by Kyle Suter\n5. Ploutus malware variant confirmed\n6. Unit reimaged with clean golden image",
  "result": "Unit restored to service with patched BIOS. Criminal hard drive in evidence custody.",
  "learnings": "Hard drive swap attack succeeded due to missing BitLocker (SW-002) and no application whitelisting (SW-003). Dispenser communication was not encrypted (SW-010).",
  "activityLog": [{
    "time": "Jan 28 05:32 PM",
    "action": "Anomaly detected",
    "detail": "Multiple dispenses without valid transactions"
  }, {
    "time": "Jan 28 05:35 PM",
    "action": "Unit offline",
    "detail": "Remote shutdown initiated"
  }, {
    "time": "Jan 28 06:10 PM",
    "action": "Tech dispatched",
    "detail": "Curtis — Brinks"
  }, {
    "time": "Jan 28 08:45 PM",
    "action": "Hard drive recovered",
    "detail": "Criminal HDD seized as evidence"
  }],
  "contacts": {},
  "leo": {
    "agency": "Miami-Dade PD",
    "caseNumber": "MD-2026-04521",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "Curtis",
    "company": "Brinks",
    "dispatchTime": "06:10 PM",
    "eta": "2 hours",
    "arrivalTime": "08:15 PM"
  },
  "compliance": {
    "SW-002": {
      "status": "fail",
      "finding": "BitLocker not enabled, no TPM binding"
    },
    "SW-003": {
      "status": "fail",
      "finding": "No whitelisting solution deployed"
    },
    "SW-010": {
      "status": "fail",
      "finding": "Dispenser communication unencrypted"
    },
    "SW-001": {
      "status": "fail",
      "finding": "BIOS password was default"
    }
  },
  "tierCurrent": "Tier 1 — Fully compliant",
  "tierProposed": "Tier 3 — Non-compliant",
  "tierJustification": "Multiple SW control failures. Unit was miscategorized as Tier 1.",
  "alertSource": {
    "policyName": "Transaction anomaly",
    "monitoringSystem": "Host system",
    "alertStatus": "TRIGGERED"
  },
  "safetyAssessment": {
    "threatStatus": "Recent — suspects may be present",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": false,
    "safetyNotes": "Logical attack — no physical threat to personnel"
  },
  "suspects": [{
    "description": "Two males observed on surveillance near ATM during attack window",
    "gender": "Male",
    "age": "25-35",
    "height": "5'10\"",
    "build": "Medium",
    "clothing": "Dark hoodies, jeans",
    "distinguishing": "One wearing baseball cap"
  }],
  "vehicle": {
    "description": "Dark sedan",
    "year": "",
    "make": "",
    "model": "Sedan",
    "color": "Black or dark blue",
    "plate": "Partial: FL tag ending 7X",
    "plateState": "FL",
    "direction": "Southbound on NW 2nd Ave",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Miami-Dade PD case MD-2026-04521"
  }
}, {
  "id": "ATT-003",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "PI200108",
  "atmSerial": "57-55570434",
  "atmModel": "NCR 6688",
  "assetId": "BRNK-KS200108",
  "city": "Topeka",
  "state": "KS",
  "region": "Midwest",
  "bank": "CoreFirst Bank & Trust",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "Critical",
  "outcome": "Successful",
  "date": "2025-10-04T17:19:00",
  "status": "Closed",
  "description": "Jackpotting attack at CoreFirst West Branch, Topeka KS. Front fascia opened 5:19 PM CST, power failure 5:37 PM, router down 7:44-8:00 PM. Core destroyed, HD intact. EJ evidence recovered. Video captured. BIC USB alert fired 10/4 at 8:42 PM but went to Retail team (Chad, Jim) not FICOE. BIC email notifications had been broken since 9/17. Cash cassettes emptied.",
  "loss": "$61,060",
  "assignedTo": "Byron Lubbe",
  "fieldTeam": "Cennox",
  "fieldTeamCompany": "Cennox (BancSource)",
  "process": "1. BIC USB alert 10/4 8:42 PM — sent to Retail (Chad, Jim), not FICOE\n2. Front fascia opened 5:19 PM CST, power failure 5:37 PM\n3. Router down 7:44-8:00 PM CST\n4. Device closed 7:55 PM, back online 10:16 PM MST\n5. Power failed again 10:16, cassettes emptied by 10:27:46\n6. Andrew manually placed dispatch ticket 10/5 12:12 PM CST\n7. Tech onsite 4:24 PM CST — confirmed out of service\n8. 10/6 Monday morning: pictures confirmed damage at 12:26 PM EST",
  "result": "Core destroyed, cash lost. Unit damaged but repairable. Cennox dispatched but no escalation despite clear evidence of break-in.",
  "learnings": "BIC email notifications broken since 9/17 — 17 days before attack. BIC texts configured to send only after 8:00 CST, no real-time overnight alerts. USB alerts routed to Retail not FICOE. Cennox treated as standard incident, no escalation. No E2E theft process existed for FI units.",
  "activityLog": [{
    "time": "Oct 4 05:19 PM",
    "action": "Fascia opened",
    "detail": "Front fascia door opened — CST"
  }, {
    "time": "Oct 4 05:37 PM",
    "action": "Power failure",
    "detail": "Power lost — CST"
  }, {
    "time": "Oct 4 07:44 PM",
    "action": "Router down",
    "detail": "Network router down 7:44-8:00 PM CST"
  }, {
    "time": "Oct 4 08:42 PM",
    "action": "BIC USB alert",
    "detail": "Alert sent to Retail (Chad, Jim) — not FICOE"
  }, {
    "time": "Oct 4 10:16 PM",
    "action": "Power failed again",
    "detail": "Cassettes emptied by 10:27:46"
  }, {
    "time": "Oct 4 12:12 PM",
    "action": "Dispatch placed",
    "detail": "Andrew manually placed ticket 10/5"
  }, {
    "time": "Oct 4 04:24 PM",
    "action": "Tech onsite",
    "detail": "Confirmed out of service — no conversation with FICOE"
  }],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "Cennox tech",
    "company": "Cennox (BancSource)",
    "dispatchTime": "12:12 PM",
    "eta": "",
    "arrivalTime": "04:24 PM"
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Transaction anomaly",
    "monitoringSystem": "BIC",
    "alertStatus": "USB ALERT"
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": "Attack discovered next business day. Cennox tech observed break-in evidence but did not escalate."
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Part of coordinated CoreFirst attack cluster 10/4-10/8/2025"
  }
}, {
  "id": "ATT-004",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "PI200112",
  "atmSerial": "13-55535842",
  "atmModel": "NCR 6626",
  "assetId": "BRNK-KS200112",
  "city": "Topeka",
  "state": "KS",
  "region": "Midwest",
  "bank": "CoreFirst Bank & Trust",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "High",
  "outcome": "Prevented",
  "date": "2025-10-04T23:10:00",
  "status": "Closed",
  "description": "Jackpotting attempt at CoreFirst Dillons East Branch, Topeka KS. Mobile hotspot plugged into USB in terminal. Core destroyed, HD okay. Thumb drive present. No cash loss — cassettes not emptied. BIC text alert 11:10 PM CST. LAN unplugged by attackers at 9:42 PM. Part of coordinated CoreFirst attack cluster.",
  "loss": "$0",
  "assignedTo": "Byron Lubbe",
  "fieldTeam": "Cennox",
  "fieldTeamCompany": "Cennox (BancSource)",
  "process": "1. BIC text alert 11:10 PM CST 10/4\n2. Last transaction 9:18 PM (deposit)\n3. 9:42 PM lost comms — network unplugged by attackers\n4. Manual ticket placed 10/5 8:47 AM CST\n5. Tech onsite 12:12 PM CST\n6. Confirmed out of service — no conversation with FICOE\n7. 10/6 12:26 PM pictures confirmed: core damage, thumb drive in USB, mobile hotspot present",
  "result": "Core destroyed but no significant cash loss. Thumb drive and mobile hotspot recovered as evidence. Black box attack setup confirmed.",
  "learnings": "Mobile hotspot + thumb drive is the black box attack signature. Cennox tech observed thumb drive in USB and clear evidence of break-in but did not escalate — treated as standard incident because 'it was Sunday.' Note: $1,380 appears in the 2025 vandalism tracker for PI200112 on 10/5/25 — likely represents device/equipment damage cost, not cash loss. Needs confirmation.",
  "activityLog": [{
    "time": "Oct 5 09:42 PM",
    "action": "Comms lost",
    "detail": "Network unplugged by attackers"
  }, {
    "time": "Oct 5 11:10 PM",
    "action": "BIC text alert",
    "detail": "USB alert — CST"
  }, {
    "time": "Oct 5 08:47 AM",
    "action": "Dispatch placed",
    "detail": "Manual ticket 10/5"
  }, {
    "time": "Oct 5 12:12 PM",
    "action": "Tech onsite",
    "detail": "Confirmed OOS, thumb drive + hotspot found"
  }],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "Cennox tech",
    "company": "Cennox (BancSource)",
    "dispatchTime": "08:47 AM",
    "eta": "",
    "arrivalTime": "12:12 PM"
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Transaction anomaly",
    "monitoringSystem": "BIC",
    "alertStatus": "USB ALERT"
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": ""
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Part of coordinated CoreFirst attack cluster 10/4-10/8/2025. Referenced as '103' in Rick's shorthand notes — Rick uses last 3 digits of terminal IDs (107=PI200107, 108=PI200108). '103' does not match PI200103 (no such terminal in fleet CSV) but event details (core destroyed, thumb drive + mobile hotspot in USB, no cash loss) match PI200112 Dillons East. Mapping confirmed by event correlation, not terminal ID."
  }
}, {
  "id": "ATT-005",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "PI200107",
  "atmSerial": "57-55570437",
  "atmModel": "NCR 6688",
  "assetId": "BRNK-KS200107",
  "city": "Topeka",
  "state": "KS",
  "region": "Midwest",
  "bank": "CoreFirst Bank & Trust",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "Critical",
  "outcome": "Successful",
  "date": "2025-10-04T23:23:00",
  "status": "Closed",
  "description": "Jackpotting attack at CoreFirst SW Wanamaker Branch, Topeka KS. Supervisor mode entered 11:23 PM CST, LAN unplugged. Core destroyed, HD intact. Video captured. Cash cassettes emptied. BIC text alert 11:49 PM. Part of coordinated CoreFirst attack cluster.",
  "loss": "$54,940",
  "assignedTo": "Byron Lubbe",
  "fieldTeam": "Cennox",
  "fieldTeamCompany": "Cennox (BancSource)",
  "process": "1. Last transaction 9:13 PM CST\n2. 11:23 PM CST supervisor mode entered (door open), LAN unplugged\n3. BIC text alert 11:49 PM\n4. Andrew manual dispatch 10/5 8:46 AM CST\n5. Tech arrived 10/5 12:26 PM — no power, fascia door cannot open, left\n6. 10/6 9:36 AM tech returned — core, fascia door, lock damaged, cassettes empty",
  "result": "Core destroyed, cash lost. Fascia door and lock damaged. Cassettes confirmed empty on second tech visit.",
  "learnings": "Tech arrived 10/5 but left because no power and could not open fascia — no escalation. Lost another day. Second visit 10/6 confirmed full loss. No conversation with FICOE during either visit.",
  "activityLog": [{
    "time": "Oct 5 11:23 PM",
    "action": "Supervisor mode",
    "detail": "Door open — LAN unplugged by attackers"
  }, {
    "time": "Oct 5 11:49 PM",
    "action": "BIC text alert",
    "detail": "Alert sent"
  }, {
    "time": "Oct 5 08:46 AM",
    "action": "Dispatch placed",
    "detail": "Andrew manual dispatch 10/5"
  }, {
    "time": "Oct 5 12:26 PM",
    "action": "Tech onsite",
    "detail": "No power, could not open fascia — left site"
  }, {
    "time": "Oct 5 09:36 AM",
    "action": "Tech returned",
    "detail": "10/6 — confirmed core destroyed, cassettes empty"
  }],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "Cennox tech",
    "company": "Cennox (BancSource)",
    "dispatchTime": "08:46 AM",
    "eta": "",
    "arrivalTime": "12:26 PM"
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Transaction anomaly",
    "monitoringSystem": "BIC",
    "alertStatus": "TEXT ALERT"
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": ""
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Part of coordinated CoreFirst attack cluster 10/4-10/8/2025"
  }
}, {
  "id": "ATT-006",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "PI200176",
  "atmSerial": "57-55570439",
  "atmModel": "NCR 6688",
  "assetId": "BRNK-CO200176",
  "city": "Englewood",
  "state": "CO",
  "region": "West",
  "bank": "CoreFirst Bank & Trust",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "High",
  "outcome": "Successful",
  "date": "2025-10-08T04:16:00",
  "status": "Closed",
  "description": "Jackpotting attack at CoreFirst Vallagio Branch, Englewood CO. Attack at 4:16 AM — fourth hit in the CoreFirst cluster after three Topeka attacks. ROC notified FICOE and LEO dispatched immediately. Cennox emergency dispatch failed — no emergency contact process, tech not onsite until 11:57 AM.",
  "loss": "$10,060",
  "assignedTo": "Byron Lubbe",
  "fieldTeam": "Cennox",
  "fieldTeamCompany": "Cennox (BancSource)",
  "process": "1. Attack at 4:16 AM 10/8\n2. ROC notified FICOE — LEO dispatched immediately\n3. Cennox emergency dispatch attempted but no emergency contact process in place\n4. Cennox would not pick up dispatch until 0800\n5. Tech onsite 11:57 AM\n6. Pre-arranged CO Cennox tech not available as promised, replacement tech did not have software, had to leave site\n7. Follow-up scheduled next day but tech did not return — FICOE did not follow up until late in day",
  "result": "Cash lost. Emergency response faster than Topeka cluster due to lessons learned, but Cennox dispatch failures added delays.",
  "learnings": "LEO dispatch was immediate — improvement over Topeka response. However Cennox had no emergency dispatch process. Pre-arranged tech unavailable, replacement lacked software. Follow-up fell through — another day lost.",
  "activityLog": [{
    "time": "Oct 8 04:16 AM",
    "action": "Attack detected",
    "detail": "ROC notified FICOE immediately"
  }, {
    "time": "Oct 8 04:20 AM",
    "action": "LEO dispatched",
    "detail": "Immediate dispatch — lesson from Topeka cluster"
  }, {
    "time": "Oct 8 11:57 AM",
    "action": "Tech onsite",
    "detail": "Cennox — delayed due to no emergency dispatch process"
  }],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": "04:20 AM"
  },
  "techDispatch": {
    "name": "Cennox tech",
    "company": "Cennox (BancSource)",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": "11:57 AM"
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Transaction anomaly",
    "monitoringSystem": "BIC/ROC",
    "alertStatus": "ALERT"
  },
  "safetyAssessment": {
    "threatStatus": "Active — crime in progress",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": "LEO dispatched immediately after Topeka cluster learnings"
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Part of coordinated CoreFirst attack cluster 10/4-10/8/2025. 4th attack in series."
  }
}, {
  "id": "ATT-007",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "PI200153",
  "atmSerial": "57-55570438",
  "atmModel": "NCR 6688",
  "assetId": "BRNK-KS200153",
  "city": "Topeka",
  "state": "KS",
  "region": "Midwest",
  "bank": "CoreFirst Bank & Trust",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "High",
  "outcome": "Successful",
  "date": "2025-11-15T00:00:00",
  "status": "Closed",
  "description": "Jackpotting attack at CoreFirst Croco Branch, Topeka KS. Part of ongoing CoreFirst attack campaign. Limited detail available — loss confirmed at $23,820.",
  "loss": "$23,820",
  "assignedTo": "",
  "fieldTeam": "Cennox",
  "fieldTeamCompany": "Cennox (BancSource)",
  "process": "",
  "result": "Cash lost. Terminal remained activated in fleet.",
  "learnings": "Fifth CoreFirst attack in ~6 weeks. Same threat actor campaign suspected.",
  "activityLog": [],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "",
    "company": "Cennox (BancSource)",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "",
    "monitoringSystem": "BIC",
    "alertStatus": ""
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": false,
    "safetyNotes": ""
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Part of CoreFirst attack campaign Oct-Dec 2025"
  }
}, {
  "id": "ATT-008",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "PI200176",
  "atmSerial": "57-55570439",
  "atmModel": "NCR 6688",
  "assetId": "BRNK-CO200176",
  "city": "Englewood",
  "state": "CO",
  "region": "West",
  "bank": "CoreFirst Bank & Trust",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "Medium",
  "outcome": "Successful",
  "date": "2025-11-21T00:00:00",
  "status": "Closed",
  "description": "Second attack on CoreFirst Vallagio Branch, Englewood CO. Loss $6,400. Same terminal hit on 10/8. Part of ongoing CoreFirst campaign.",
  "loss": "$6,400",
  "assignedTo": "",
  "fieldTeam": "Cennox",
  "fieldTeamCompany": "Cennox (BancSource)",
  "process": "",
  "result": "Cash lost. Second hit on same terminal within 6 weeks.",
  "learnings": "Repeat attack on previously compromised terminal. Countermeasures from first attack insufficient or not yet deployed.",
  "activityLog": [],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "",
    "company": "Cennox (BancSource)",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "",
    "monitoringSystem": "BIC",
    "alertStatus": ""
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": false,
    "safetyNotes": ""
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "2nd attack on this terminal. 1st was 10/8/2025. CoreFirst campaign."
  }
}, {
  "id": "ATT-009",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "PI200176",
  "atmSerial": "57-55570439",
  "atmModel": "NCR 6688",
  "assetId": "BRNK-CO200176",
  "city": "Englewood",
  "state": "CO",
  "region": "West",
  "bank": "CoreFirst Bank & Trust",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "Low",
  "outcome": "Successful",
  "date": "2025-12-17T00:00:00",
  "status": "Closed",
  "description": "Third attack on CoreFirst Vallagio Branch, Englewood CO. Loss $3,000. Same terminal hit 10/8 and 11/21. Cash levels had been reduced as mitigation.",
  "loss": "$3,000",
  "assignedTo": "",
  "fieldTeam": "Cennox",
  "fieldTeamCompany": "Cennox (BancSource)",
  "process": "",
  "result": "Reduced cash loss due to lowered cash levels. Third hit on same terminal.",
  "learnings": "Cash level reduction partially effective — loss dropped from $10K to $3K. But terminal continues to be targeted. Stronger countermeasures needed.",
  "activityLog": [],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "",
    "company": "Cennox (BancSource)",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "",
    "monitoringSystem": "BIC",
    "alertStatus": ""
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": false,
    "safetyNotes": ""
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "3rd attack on this terminal. CoreFirst campaign."
  }
}, {
  "id": "ATT-010",
  "name": "Hook & chain attack",
  "type": "hook_chain",
  "category": "Physical",
  "terminalNumber": "P712573",
  "atmSerial": "",
  "atmModel": "Hyosung 7I",
  "assetId": "BRNK-OK712573",
  "city": "Ada",
  "state": "OK",
  "region": "Southwest",
  "bank": "Vision Bank Oklahoma",
  "liability": "FI-owned",
  "avgDailyCash": "",
  "magnitude": "Critical",
  "outcome": "Successful",
  "date": "2025-12-15T00:18:00",
  "status": "Closed",
  "description": "Hook & chain attack at Vision Bank Arlington Branch, 1901 Arlington St, Ada OK. Island unit. No alarm triggered — no cabinet door open alert from BIC. CDS reported closed status at 12:18 AM CST. No BIC communication for 585 days prior to attack. TPM chip removed. HD encrypted and whitelisted. Bank-owned cash, customer insures equipment. Secret Service notified at 3:45 PM.",
  "loss": "$88,080",
  "assignedTo": "",
  "fieldTeam": "David Barrowman",
  "fieldTeamCompany": "Brinks",
  "process": "1. CDS closed status reported 12:18 AM CST 12/15\n2. No alarm, no cabinet door open alert from BIC\n3. Daily check-in queued dispatch 8:00 AM CST\n4. Tech (David Barrowman) arrived on site 8:45 AM EST\n5. TPM chip found removed, core accessed\n6. Video captured — sent by bank 12/25/25\n7. Secret Service notified at 3:45 PM\n8. David Barrowman installed updated BIC agent\n9. Assessed remaining VB locations for vulnerability\n10. Bank agreed to daily cassette removal/reinstall\n11. Cash team recommended minimum load amounts",
  "result": "Cash lost. Unit damaged. BIC agent updated. Daily cassette removal implemented as interim measure.",
  "learnings": "No BIC communication for 585 days — unit was effectively unmonitored. No alarm in top hat (alarm only in vault). TPM chip removed indicating physical access to core. Bank owns cash and machines but customer insures. Led to vulnerability assessment of all VB island units.",
  "activityLog": [{
    "time": "Dec 15 12:18 AM",
    "action": "CDS closed status",
    "detail": "Reported — no alarm triggered"
  }, {
    "time": "Dec 15 08:00 AM",
    "action": "Dispatch queued",
    "detail": "Daily check-in triggered dispatch"
  }, {
    "time": "Dec 15 08:45 AM",
    "action": "Tech onsite",
    "detail": "David Barrowman arrived"
  }, {
    "time": "Dec 15 03:45 PM",
    "action": "Secret Service",
    "detail": "Notified"
  }, {
    "time": "Dec 15 04:50 PM",
    "action": "Actions documented",
    "detail": "Customer contacted, BIC updated, vulnerability assessment initiated"
  }],
  "contacts": {},
  "leo": {
    "agency": "U.S. Secret Service",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": "03:45 PM"
  },
  "techDispatch": {
    "name": "David Barrowman",
    "company": "Brinks",
    "dispatchTime": "08:00 AM",
    "eta": "",
    "arrivalTime": "08:45 AM"
  },
  "compliance": {
    "PH-006": {
      "status": "fail",
      "finding": "Alarm in vault but not top hat — no cabinet door open alert"
    },
    "PH-008": {
      "status": "fail",
      "finding": "TPM chip removed — physical access to internal components"
    }
  },
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Other",
    "monitoringSystem": "CDS / BIC",
    "alertStatus": "No alarm — BIC offline 585 days"
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": "No real-time alert. Discovered via daily check-in."
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": ""
  }
}, {
  "id": "ATT-011",
  "name": "Hook & chain attack",
  "type": "hook_chain",
  "category": "Physical",
  "terminalNumber": "T8950140",
  "atmSerial": "",
  "atmModel": "Hyosung 7I",
  "assetId": "BRNK-XX8950140",
  "city": "",
  "state": "",
  "region": "",
  "bank": "American Nat Bank & Trust",
  "liability": "FI-owned",
  "avgDailyCash": "",
  "magnitude": "Critical",
  "outcome": "Successful",
  "date": "2026-01-02T00:00:00",
  "status": "Closed",
  "description": "Hook & chain attack at American National Bank & Trust main branch. Island unit, Hyosung 7I. No alarm, no cabinet door open alert. Customer-owned hardware. Machine removed by customer the week of 1/9/26. Secret Service notified. Dropped Union Square cash levels as precaution (1/5) +100K cash levels.",
  "loss": "$135,800",
  "assignedTo": "",
  "fieldTeam": "",
  "fieldTeamCompany": "",
  "process": "1. No alarm, no cabinet door open alert\n2. Daily check-in queued dispatch\n3. Tech arrived on site — confirmed attack\n4. Secret Service notified\n5. Machine removed by customer week of 1/9/26\n6. Union Square cash levels dropped as precaution",
  "result": "Total cash loss $135,800. Terminal removed from service by customer. Not in fleet CSV — likely deactivated.",
  "learnings": "Highest single-incident loss in fleet history. No Cash Liability for Brinks per contract. Led to proactive cash reduction at proximal Union Square locations.",
  "activityLog": [],
  "contacts": {},
  "leo": {
    "agency": "U.S. Secret Service",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "",
    "company": "",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Other",
    "monitoringSystem": "BIC/CDS",
    "alertStatus": "No alarm"
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": ""
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Terminal not in fleet CSV — removed by customer week of 1/9/26"
  }
}, {
  "id": "ATT-012",
  "name": "Theft — stolen retail unit",
  "type": "hook_chain",
  "category": "Physical",
  "terminalNumber": "",
  "atmSerial": "",
  "atmModel": "",
  "assetId": "",
  "city": "",
  "state": "",
  "region": "",
  "bank": "J&S Supermarket",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "Medium",
  "outcome": "Successful",
  "date": "2026-01-15T00:00:00",
  "status": "Closed",
  "description": "Stolen retail ATM unit at J&S Supermarket. Entire unit taken. Cash liability applies. Net book value of ATM $0 (original acquired value $1,896.95). Retail line of business — not FI.",
  "loss": "$15,000",
  "assignedTo": "",
  "fieldTeam": "",
  "fieldTeamCompany": "",
  "process": "",
  "result": "Unit stolen. Cash liability confirmed. Net book value $0.",
  "learnings": "Retail unit theft — different profile from FI island unit attacks. Full unit extraction vs. cash-only targeting.",
  "activityLog": [],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "",
    "company": "",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "",
    "monitoringSystem": "",
    "alertStatus": ""
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": false,
    "safetyNotes": ""
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Retail unit — not FI. Original ATM value $1,896.95, net book $0."
  }
}, {
  "id": "ATT-013",
  "name": "Hook & chain attack",
  "type": "hook_chain",
  "category": "Physical",
  "terminalNumber": "P447775",
  "atmSerial": "",
  "atmModel": "Hyosung 7600I",
  "assetId": "BRNK-TX447775",
  "city": "Burkburnett",
  "state": "TX",
  "region": "Southwest",
  "bank": "First Bank of Wichita Falls",
  "liability": "FI-owned",
  "avgDailyCash": "",
  "magnitude": "High",
  "outcome": "Successful",
  "date": "2026-01-30T02:42:00",
  "status": "Closed",
  "description": "Hook & chain attack at First Bank WF Burkburnett, 311 S Avenue D, Burkburnett TX 76354. Hyosung 7600I. CDS reported cash reject bin removed at 2:47 AM. Alarm went off, police responded in 3 minutes (2:48 AM CST). Thieves gone by 2:51 AM. No high security door. Unit had alarm and gate. 100K cash load was scheduled for 1/28 but canceled due to weather. No video available. PAI owns equipment, customer insures. Contradicting contract language on liability — seeking legal advice.",
  "loss": "$27,120",
  "assignedTo": "",
  "fieldTeam": "Rowdy",
  "fieldTeamCompany": "Brinks",
  "process": "1. No RMM from BIC at 2:42 AM\n2. CDS reports cash reject bin removed 2:47 AM\n3. Alarm triggered 2:48 AM CST — police responded in 3 minutes\n4. Thieves gone by 2:51 AM CST\n5. Rowdy contacted by bank 8:20 AM\n6. Rowdy headed to site 8:35 AM\n7. P424033 nearby — Susan reducing cash load\n8. Union Square nearby — loads being reduced\n9. Decision: replace unit (not repair)\n10. Gathering list of island units in area (Byron)\n11. Rufus reaching out to client re: next steps\n12. As of 12:54 PM: ATM secured, pickup Monday. Customer OK.",
  "result": "Cash lost. Unit to be replaced. Cash loads reduced at proximal units P424033 and Union Square.",
  "learnings": "No high security door. Police response fast (3 min) but thieves faster — gone in 3 minutes. 100K load canceled by weather saved potential $100K additional loss. Contract language contradicts on liability — under legal review.",
  "activityLog": [{
    "time": "Jan 30 02:42 AM",
    "action": "No RMM from BIC",
    "detail": "First indication"
  }, {
    "time": "Jan 30 02:47 AM",
    "action": "Cash reject bin removed",
    "detail": "CDS report"
  }, {
    "time": "Jan 30 02:48 AM",
    "action": "Alarm triggered",
    "detail": "Police responded in 3 mins"
  }, {
    "time": "Jan 30 02:51 AM",
    "action": "Thieves gone",
    "detail": "Total time on site ~3 minutes"
  }, {
    "time": "Jan 30 08:20 AM",
    "action": "Bank contacted Rowdy",
    "detail": ""
  }, {
    "time": "Jan 30 08:35 AM",
    "action": "Rowdy headed to site",
    "detail": ""
  }, {
    "time": "Jan 30 12:54 PM",
    "action": "ATM secured",
    "detail": "Pickup scheduled Monday"
  }],
  "contacts": {},
  "leo": {
    "agency": "Burkburnett PD",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": "02:48 AM"
  },
  "techDispatch": {
    "name": "Rowdy",
    "company": "Brinks",
    "dispatchTime": "08:35 AM",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {
    "PH-004": {
      "status": "fail",
      "finding": "No high security door"
    },
    "PH-007": {
      "status": "fail",
      "finding": "No video available"
    }
  },
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Cabinet door open",
    "monitoringSystem": "BIC / CDS",
    "alertStatus": "No RMM alert, CDS cash reject bin removed"
  },
  "safetyAssessment": {
    "threatStatus": "Recent — suspects may be present",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": "Alarm triggered, police arrived in 3 min, thieves already gone"
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Contradicting contract language on liability — under legal review. Rufus reaching out to customer."
  }
}, {
  "id": "ATT-014",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "PI2009",
  "atmSerial": "YE44001056",
  "atmModel": "Hyosung 7600I",
  "assetId": "BRNK-OK002009",
  "city": "Yukon",
  "state": "OK",
  "region": "Southwest",
  "bank": "F & M Bank",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "Medium",
  "outcome": "Successful",
  "date": "2026-02-04T00:30:00",
  "status": "Closed",
  "description": "Jackpotting attack at F&M Bank Yukon Surrey Hills, 11000 Surrey Hills Rd, Yukon OK 73099. Hyosung 7600I. First alarm at 12:30 AM but monitoring team was confused and did not dispatch LEO. Second alarm at 1:53 AM — still no LEO. Bank rep arrived on site at 3:55 AM CST and caused thieves to leave. Caught in the act. $7,000 cash lost ($29K remaining). No cabinet door open BIC alert. BIC error for two consecutive transactions. Brinks owns and leases to them.",
  "loss": "$7,000",
  "assignedTo": "",
  "fieldTeam": "",
  "fieldTeamCompany": "",
  "process": "1. 12:30 AM first alarm — monitoring team confused, no LEO dispatched\n2. 1:53 AM second alarm — still no LEO dispatched\n3. Called 855-260-8568 at 5 AM, they said they would report\n4. 12:30 AM unit did a reboot\n5. No cabinet door open BIC alert\n6. BIC error for two consecutive transactions from notes\n7. 3:55 AM CST bank rep arrived on site — thieves fled\n8. Cash loss $7,000 of $36,120 projected\n9. Byron to assess level of security\n10. Susan to do proximity assessment\n11. DB2 to get to site to assess damage",
  "result": "Partial cash loss — thieves interrupted by bank rep. $7,000 lost, $29,120 remaining. Reduced cash levels in proximal client ATMs.",
  "learnings": "Monitoring team confusion on first alarm cost critical response time — 1.5 hours between first alarm and second alarm with no LEO dispatch either time. Bank rep arrival at 3:55 AM (3.5 hours after first alarm) finally interrupted the attack. No cabinet door open BIC alert despite physical intrusion.",
  "activityLog": [{
    "time": "Feb 4 12:30 AM",
    "action": "1st alarm",
    "detail": "Monitoring confused — no LEO dispatched"
  }, {
    "time": "Feb 4 01:53 AM",
    "action": "2nd alarm",
    "detail": "Still no LEO dispatched"
  }, {
    "time": "Feb 4 03:55 AM",
    "action": "Bank rep on site",
    "detail": "Caused thieves to leave"
  }, {
    "time": "Feb 4 05:00 AM",
    "action": "Phone report",
    "detail": "Called 855-260-8568, they said they would report"
  }],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "DB2",
    "company": "",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {
    "PH-006": {
      "status": "fail",
      "finding": "No cabinet door open BIC alert despite physical intrusion"
    }
  },
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Seismic/vibration sensor",
    "monitoringSystem": "BIC",
    "alertStatus": "Alarm fired but monitoring failed to act"
  },
  "safetyAssessment": {
    "threatStatus": "Active — crime in progress",
    "suspectsPresent": true,
    "cashDispensing": true,
    "physicalTampering": true,
    "safetyNotes": "Thieves on site from ~12:30 AM to 3:55 AM. Bank rep caused them to flee."
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "855-260-8568",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": ""
  }
}, {
  "id": "ATT-015",
  "name": "Hook & chain attack",
  "type": "hook_chain",
  "category": "Physical",
  "terminalNumber": "P447779",
  "atmSerial": "",
  "atmModel": "Hyosung 7600I",
  "assetId": "BRNK-TX447779",
  "city": "Wichita Falls",
  "state": "TX",
  "region": "Southwest",
  "bank": "First Bank of Wichita Falls",
  "liability": "FI-owned",
  "avgDailyCash": "",
  "magnitude": "Critical",
  "outcome": "Successful",
  "date": "2026-02-05T03:50:00",
  "status": "Closed",
  "description": "Hook & chain attack at First Bank WF Plaza, 2801 Midwestern Parkway #200, Wichita Falls TX. Hyosung 7600I. Safe door open alert from BIC at 3:50 AM EST. Alarm triggered at 3:05 AM CST but thieves gone within 3 minutes. $102,080 cash loss ($110,000 loaded on 2/3/26). No high security door. Video available. PAI owns equipment, customer insures. High security door upgrades deployed post-incident.",
  "loss": "$102,080",
  "assignedTo": "Tony Mercer",
  "fieldTeam": "Rowdy",
  "fieldTeamCompany": "Brinks",
  "process": "1. Safe door open alert from BIC 3:50 AM EST\n2. Alarm triggered 3:05 AM CST — thieves gone within 3 minutes\n3. Rowdy contacted by bank 8:18 AM EST\n4. Rowdy alerted A. Mercer 8:21 AM EST\n5. Craig/Rufus to reach out to client\n6. TM to work on cleanup and device removal\n7. Craig to contact customer re: door upgrade and/or pulling funds\n8. Craig to check with Hyosung for high security door",
  "result": "Cash lost. High security door upgrades deployed. Unit to be replaced.",
  "learnings": "Second First Bank WF attack in 6 days (Burkburnett was 1/30). No high security door. $110K loaded just 2 days before attack. Contradicting contract language on liability — same issue as P447775.",
  "activityLog": [{
    "time": "Feb 5 03:05 AM",
    "action": "Alarm triggered",
    "detail": "Thieves gone within 3 minutes — CST"
  }, {
    "time": "Feb 5 03:50 AM",
    "action": "BIC safe door alert",
    "detail": "EST"
  }, {
    "time": "Feb 5 08:18 AM",
    "action": "Bank contacted Rowdy",
    "detail": "EST"
  }, {
    "time": "Feb 5 08:21 AM",
    "action": "Rowdy alerted Mercer",
    "detail": "A. Mercer notified"
  }],
  "contacts": {
    "Tony Mercer": "08:21 AM"
  },
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "Rowdy",
    "company": "Brinks",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {
    "PH-004": {
      "status": "fail",
      "finding": "No high security door — upgraded post-incident"
    },
    "PH-003": {
      "status": "fail",
      "finding": "No anti-extraction protection"
    }
  },
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Cabinet door open",
    "monitoringSystem": "BIC",
    "alertStatus": "Safe door open alert"
  },
  "safetyAssessment": {
    "threatStatus": "Recent — suspects may be present",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": "Alarm triggered but thieves completed extraction within 3 minutes"
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Contradicting contract language on liability — same issue as P447775. Craig checking Hyosung for high security door."
  }
}, {
  "id": "ATT-016",
  "name": "Jackpotting attack",
  "type": "jackpotting",
  "category": "Cyber-Physical",
  "terminalNumber": "Unknown — '106' in Rick's notes",
  "atmSerial": "",
  "atmModel": "NCR 6688",
  "assetId": "",
  "city": "Topeka",
  "state": "KS",
  "region": "Midwest",
  "bank": "CoreFirst Bank & Trust",
  "liability": "Brinks-owned",
  "avgDailyCash": "",
  "magnitude": "Low",
  "outcome": "Prevented",
  "date": "2025-09-29T00:00:00",
  "status": "Open",
  "description": "Unconfirmed incident at CoreFirst location referenced as '106' in Rick's shorthand notes. NCR 6688. USB alert on September 29, 2025 — 5 days before the coordinated Oct 4 attacks. No cash lost. Physical damage: bill jam, SDM damaged, 16 amp switch damaged. No dispatch sent, no pictures taken. Unit went offline. May represent a failed attempt or early reconnaissance hit before the main Oct 4 coordinated strike. Terminal ID needs to be confirmed — '106' follows Rick's shorthand pattern (last 3 digits) suggesting PI200106, but this terminal does not exist in the fleet CSV.",
  "loss": "$0",
  "assignedTo": "",
  "fieldTeam": "",
  "fieldTeamCompany": "",
  "process": "1. USB alert received on the 29th (Sept 29?)\n2. Status: Unconfirmed — Rick's notes flag this as unconfirmed vs. the other 3 Topeka attacks which are confirmed\n3. No dispatch was sent\n4. No pictures captured\n5. Unit offline",
  "result": "No cash loss. Physical damage to SDM and 16 amp switch. Unit offline. No dispatch or inspection completed.",
  "learnings": "ACTION NEEDED: Chase down terminal ID. Rick's shorthand uses last 3 digits of terminal IDs (107=PI200107, 108=PI200108, 103=PI200112). '106' suggests PI200106 but no such terminal exists in fleet CSV — may be a removed terminal, a different internal ID, or a typo. Confirm with Rick or Byron.",
  "activityLog": [{
    "time": "Sep 29 —",
    "action": "USB alert (29th)",
    "detail": "BIC USB alert — September 29, 2025. Five days before coordinated Oct 4 attacks."
  }, {
    "time": "Sep 29 —",
    "action": "Bill jam",
    "detail": "SDM damaged, 16 amp switch damaged"
  }, {
    "time": "Sep 29 —",
    "action": "Unit offline",
    "detail": "No dispatch, no pictures, no inspection"
  }],
  "contacts": {},
  "leo": {
    "agency": "",
    "caseNumber": "",
    "officer": "",
    "dispatchTime": ""
  },
  "techDispatch": {
    "name": "",
    "company": "",
    "dispatchTime": "",
    "eta": "",
    "arrivalTime": ""
  },
  "compliance": {},
  "tierCurrent": "",
  "tierProposed": "",
  "tierJustification": "",
  "alertSource": {
    "policyName": "Transaction anomaly",
    "monitoringSystem": "BIC",
    "alertStatus": "USB ALERT — Sept 29, 2025"
  },
  "safetyAssessment": {
    "threatStatus": "Discovered after the fact",
    "suspectsPresent": false,
    "cashDispensing": false,
    "physicalTampering": true,
    "safetyNotes": "Unconfirmed incident. No dispatch or on-site inspection completed."
  },
  "suspects": [],
  "vehicle": {
    "description": "",
    "year": "",
    "make": "",
    "model": "",
    "color": "",
    "plate": "",
    "plateState": "",
    "direction": "",
    "condition": ""
  },
  "externalRefs": {
    "vtsId": "",
    "socHotline": "",
    "socEmail": "",
    "conferenceBridge": "",
    "otherRefs": "Part of CoreFirst attack cluster. Referenced as '106' in Rick's shorthand notes (last 3 digits of terminal ID pattern: 107=PI200107, 108=PI200108, 103=PI200112). '106' suggests PI200106 — not in fleet CSV. Needs follow-up with Rick/Byron."
  }
}];

/* ── storage ── */
const STORAGE_KEY = "atm-incident-data";
function loadData() {
  try {
    const raw = window._irs_data;
    if (raw) return raw;
  } catch {}
  return {
    attacks: [...SAMPLE_ATTACKS],
    nextId: 17
  };
}
function saveData(data) {
  window._irs_data = data;
}

/* ── helpers ── */
function getTypeLabel(val) {
  var _ATTACK_TYPES$find;
  return ((_ATTACK_TYPES$find = ATTACK_TYPES.find(t => t.value === val)) === null || _ATTACK_TYPES$find === void 0 ? void 0 : _ATTACK_TYPES$find.label) || val;
}
function getCatForType(val) {
  var _ATTACK_TYPES$find2;
  return ((_ATTACK_TYPES$find2 = ATTACK_TYPES.find(t => t.value === val)) === null || _ATTACK_TYPES$find2 === void 0 ? void 0 : _ATTACK_TYPES$find2.cat) || "";
}
function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function fmtTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

/* ── styles ── */
const S = {
  app: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    background: "#0e1117",
    color: "#d4d4d8",
    minHeight: "100vh",
    fontSize: "13px",
    lineHeight: 1.6
  },
  sidebar: {
    width: "52px",
    background: "#16181f",
    borderRight: "1px solid #1e2028",
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "16px",
    gap: "4px",
    zIndex: 100
  },
  sideIcon: active => ({
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: active ? "#1e2028" : "transparent",
    color: active ? "#fff" : "#6b6b76",
    border: active ? "1px solid #2a2c36" : "1px solid transparent",
    transition: "all 0.15s",
    fontSize: "15px"
  }),
  main: {
    marginLeft: "0",
    padding: "24px 28px",
    maxWidth: "1100px"
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: 600,
    color: "#f0f0f2",
    margin: "0 0 4px",
    letterSpacing: "-0.02em"
  },
  pageSubtitle: {
    fontSize: "13px",
    color: "#6b6b76",
    margin: "0 0 24px"
  },
  card: {
    background: "#16181f",
    border: "1px solid #1e2028",
    borderRadius: "10px",
    padding: "16px 18px",
    marginBottom: "12px",
    cursor: "default",
    transition: "border-color 0.15s"
  },
  cardHover: {
    borderColor: "#2a2c36"
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#4a4a56",
    margin: "24px 0 10px",
    paddingBottom: "6px",
    borderBottom: "1px solid #1e2028"
  },
  badge: style => ({
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: 600,
    letterSpacing: "0.04em",
    background: style.bg,
    color: style.text,
    border: `1px solid ${style.border || "transparent"}`
  }),
  input: {
    width: "100%",
    padding: "8px 10px",
    background: "#0e1117",
    border: "1px solid #2a2c36",
    borderRadius: "6px",
    color: "#d4d4d8",
    fontSize: "13px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box"
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    background: "#0e1117",
    border: "1px solid #2a2c36",
    borderRadius: "6px",
    color: "#d4d4d8",
    fontSize: "13px",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    appearance: "none"
  },
  textarea: {
    width: "100%",
    padding: "8px 10px",
    background: "#0e1117",
    border: "1px solid #2a2c36",
    borderRadius: "6px",
    color: "#d4d4d8",
    fontSize: "13px",
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: "80px",
    boxSizing: "border-box",
    lineHeight: 1.6
  },
  btnPrimary: {
    padding: "8px 18px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit"
  },
  btnSecondary: {
    padding: "8px 18px",
    background: "transparent",
    color: "#6b6b76",
    border: "1px solid #2a2c36",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit"
  },
  btnDanger: {
    padding: "8px 18px",
    background: "#3a1418",
    color: "#f07070",
    border: "1px solid #5a2028",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 600,
    fontFamily: "inherit"
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b6b76",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.06em"
  },
  fieldGroup: {
    marginBottom: "14px"
  },
  mono: {
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    fontSize: "11px"
  },
  dot: color => ({
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: color,
    flexShrink: 0
  })
};
function GlobalStyles() {
  return /*#__PURE__*/React.createElement("style", null, `
      * { box-sizing: border-box; }

      /* ── responsive grids ── */
      .gp-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
      .gp-grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0 16px; }
      .gp-side-by-side { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .gp-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px; }
      .gp-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 24px; }

      /* ── tabs ── */
      .gp-tab-row { display: flex; gap: 2px; margin-bottom: 20px; margin-top: 16px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .gp-tab-row::-webkit-scrollbar { display: none; }
      .gp-tab-btn { white-space: nowrap; flex-shrink: 0; }

      /* ── list header ── */
      .gp-list-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 10px; }

      /* ── filters ── */
      .gp-filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; align-items: center; }

      /* ── detail header ── */
      .gp-detail-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }

      /* ── main padding ── */
      .gp-main { padding: 24px 28px; max-width: 1100px; }

      /* ── activity log row ── */
      .gp-log-row { display: flex; align-items: center; gap: 6px; padding: 6px 0; border-bottom: 1px solid #1e2028; }
      .gp-log-add { display: flex; gap: 8px; margin-top: 12px; padding: 10px; background: #16181f; border-radius: 6px; border: 1px dashed #2a2c36; align-items: center; }

      /* ── suspect row ── */
      .gp-compliance-row { display: flex; align-items: center; gap: 8px; padding: 7px 0; border-bottom: 1px solid #1e2028; }

      @media (max-width: 640px) {
        .gp-main { padding: 14px 12px; }
        .gp-grid2 { grid-template-columns: 1fr; }
        .gp-grid3 { grid-template-columns: 1fr; }
        .gp-side-by-side { grid-template-columns: 1fr; }
        .gp-info-grid { grid-template-columns: 1fr; }
        .gp-cards-grid { grid-template-columns: 1fr; }
        .gp-filters { flex-direction: column; align-items: stretch; }
        .gp-filters > * { max-width: 100% !important; flex: 1 1 100% !important; width: 100% !important; }
        .gp-log-row { flex-wrap: wrap; }
        .gp-log-add { flex-wrap: wrap; }
        .gp-log-add > input { flex: 1 1 100% !important; }
        .gp-compliance-row { flex-wrap: wrap; }
        .gp-compliance-row input { flex: 1 1 100% !important; order: 3; }
      }

      @media (min-width: 641px) and (max-width: 900px) {
        .gp-main { padding: 18px 16px; }
        .gp-grid3 { grid-template-columns: 1fr 1fr; }
        .gp-cards-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
      }
    `);
}

/* ── components ── */
function Badge({
  cat
}) {
  const s = CAT_STYLE[cat];
  if (!s) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: S.badge(s)
  }, cat);
}
function StatusBadge({
  status
}) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.Open;
  return /*#__PURE__*/React.createElement("span", {
    style: S.badge(s)
  }, status);
}
function OutcomeBadge({
  outcome
}) {
  const s = OUTCOME_STYLE[outcome] || OUTCOME_STYLE["Under investigation"];
  return /*#__PURE__*/React.createElement("span", {
    style: S.badge(s)
  }, outcome);
}
function MagBadge({
  mag
}) {
  const s = MAG_STYLE[mag];
  if (!s) return null;
  return /*#__PURE__*/React.createElement("span", {
    style: S.badge(s)
  }, mag);
}
function ComplianceBadge({
  status
}) {
  const colors = {
    pass: {
      bg: "#1a3020",
      text: "#6ecf80"
    },
    fail: {
      bg: "#3a1418",
      text: "#f07070"
    },
    "n/a": {
      bg: "#1e2028",
      text: "#6b6b76"
    }
  };
  const c = colors[status] || colors["n/a"];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      ...S.badge(c),
      minWidth: "54px",
      textAlign: "center"
    }
  }, status);
}
function SwBadge({
  status
}) {
  const isPass = status === "pass";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "3px 10px",
      borderRadius: "5px",
      fontSize: "11px",
      fontWeight: 700,
      background: isPass ? "#1a3020" : "#3a1418",
      color: isPass ? "#6ecf80" : "#f07070",
      border: `1px solid ${isPass ? "#2a5030" : "#5a2028"}`,
      minWidth: "62px",
      justifyContent: "center"
    }
  }, isPass ? "✓" : "×", " ", isPass ? "OK" : "Fail");
}
function Field({
  label,
  children,
  required
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: S.fieldGroup
  }, /*#__PURE__*/React.createElement("label", {
    style: S.label
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#f07070",
      marginLeft: "3px"
    }
  }, "*")), children);
}
function SectionLabel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: S.sectionLabel
  }, children);
}
function InfoRow({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "5px 0",
      borderBottom: "1px solid #1e2028"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#6b6b76",
      fontSize: "12px"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      fontWeight: 500,
      color: "#d4d4d8",
      textAlign: "right",
      maxWidth: "60%"
    }
  }, value || "—"));
}

/* ── nav icons ── */
function IconHome() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "9 22 9 12 15 12 15 22"
  }));
}
function IconShield() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
  }));
}
function IconAlert() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "9",
    x2: "12",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "17",
    x2: "12.01",
    y2: "17"
  }));
}
function IconChart() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "20",
    x2: "18",
    y2: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "20",
    x2: "12",
    y2: "4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "20",
    x2: "6",
    y2: "14"
  }));
}
function IconPlus() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }));
}
function IconX() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }));
}
function IconBack() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "19",
    y1: "12",
    x2: "5",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 19 5 12 12 5"
  }));
}
function IconExport() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "7 10 12 15 17 10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "15",
    x2: "12",
    y2: "3"
  }));
}

/* ── pages ── */

function AttacksListPage({
  attacks,
  onSelect,
  onNew
}) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const regions = [...new Set(attacks.map(a => a.region).filter(Boolean))];
  const filtered = attacks.filter(a => {
    if (search && !`${a.name} ${a.city} ${a.bank} ${a.id} ${a.assetId}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType && a.type !== filterType) return false;
    if (filterRegion && a.region !== filterRegion) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    return true;
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-list-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "10px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://cdn.prod.website-files.com/633edbba35022b924b3e870b/69d4628b063c04e568af298f_logo_brinks_white.png",
    alt: "Brinks",
    style: {
      height: "18px",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "1px",
      height: "16px",
      background: "#2a2c36"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "https://cdn.prod.website-files.com/633edbba35022b924b3e870b/699e06c256d5345a24deda9b_nqub_logo%204.svg",
    alt: "nq\u016Bb",
    style: {
      height: "16px",
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "clamp(16px, 2.5vw, 32px)",
      fontWeight: 700,
      color: "#f56c26",
      margin: "0 0 4px",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      fontFamily: '"Suisse Intl Mono", "JetBrains Mono", "Fira Code", monospace'
    }
  }, "Attacks"), /*#__PURE__*/React.createElement("p", {
    style: S.pageSubtitle
  }, attacks.length, " incidents recorded")), /*#__PURE__*/React.createElement("button", {
    style: S.btnPrimary,
    onClick: onNew
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement(IconPlus, null), " Add attack"))), /*#__PURE__*/React.createElement("div", {
    className: "gp-filters"
  }, /*#__PURE__*/React.createElement("input", {
    style: {
      ...S.input,
      flex: "1 1 200px",
      maxWidth: "280px"
    },
    placeholder: "Search attacks...",
    value: search,
    onChange: e => setSearch(e.target.value)
  }), /*#__PURE__*/React.createElement("select", {
    style: {
      ...S.select,
      flex: "0 0 140px"
    },
    value: filterType,
    onChange: e => setFilterType(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select type"), ATTACK_TYPES.map(t => /*#__PURE__*/React.createElement("option", {
    key: t.value,
    value: t.value
  }, t.label))), /*#__PURE__*/React.createElement("select", {
    style: {
      ...S.select,
      flex: "0 0 130px"
    },
    value: filterRegion,
    onChange: e => setFilterRegion(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select region"), regions.map(r => /*#__PURE__*/React.createElement("option", {
    key: r,
    value: r
  }, r))), /*#__PURE__*/React.createElement("select", {
    style: {
      ...S.select,
      flex: "0 0 130px"
    },
    value: filterStatus,
    onChange: e => setFilterStatus(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select status"), STATUSES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s)))), filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "60px 0",
      color: "#4a4a56"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "15px"
    }
  }, "No attacks match your filters")) : /*#__PURE__*/React.createElement("div", {
    className: "gp-cards-grid"
  }, filtered.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: S.card,
    onClick: () => onSelect(a.id),
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = "#2a2c36";
      e.currentTarget.style.cursor = "pointer";
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = "#1e2028";
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "6px",
      alignItems: "center",
      marginBottom: "8px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...S.mono,
      color: "#4a4a56",
      background: "#1e2028",
      padding: "2px 6px",
      borderRadius: "4px"
    }
  }, a.id), /*#__PURE__*/React.createElement(Badge, {
    cat: a.category
  }), a.magnitude && /*#__PURE__*/React.createElement(MagBadge, {
    mag: a.magnitude
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "15px",
      fontWeight: 600,
      color: "#f0f0f2",
      marginBottom: "4px"
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "#6b6b76",
      marginBottom: "8px"
    }
  }, a.assetId, " \xB7 ", a.city, ", ", a.state), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "#4a4a56",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      lineHeight: 1.5
    }
  }, a.description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "11px",
      color: "#4a4a56"
    }
  }, fmtDate(a.date)), /*#__PURE__*/React.createElement(StatusBadge, {
    status: a.status
  })), a.loss && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "#f07070",
      fontWeight: 600,
      marginTop: "6px"
    }
  }, "Loss: ", a.loss)))));
}
function AddAttackPage({
  onSave,
  onCancel
}) {
  const [form, setForm] = useState({
    terminalNumber: "",
    type: "",
    date: "",
    status: "Open",
    magnitude: "",
    description: "",
    assignedTo: "",
    conferenceBridge: "",
    fieldTeam: "",
    fieldTeamCompany: "",
    alertPolicyName: "",
    alertMonitoringSystem: "",
    suspectCount: "",
    groupComposition: "",
    vehicleDescription: "",
    suspectDescription: ""
  });
  const [reportFile, setReportFile] = useState(null);
  const [evidenceFiles, setEvidenceFiles] = useState({
    exterior: null,
    interior: null,
    surveillance: null,
    serialPlate: null
  });
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const typeObj = ATTACK_TYPES.find(t => t.value === form.type);
  const handleSubmit = () => {
    if (!form.terminalNumber || !form.type || !form.date || !form.description) return;
    onSave({
      ...form,
      reportedBy: CURRENT_USER,
      outcome: "Under investigation",
      category: (typeObj === null || typeObj === void 0 ? void 0 : typeObj.cat) || "",
      name: ((typeObj === null || typeObj === void 0 ? void 0 : typeObj.label) || form.type) + " attack",
      atmSerial: "",
      atmModel: "",
      assetId: "BRNK-XX" + form.terminalNumber.replace(/\D/g, "").slice(-6),
      city: "",
      state: "",
      region: "",
      bank: "",
      liability: "",
      avgDailyCash: "",
      loss: "",
      process: "",
      result: "",
      learnings: "",
      reportAttachment: reportFile ? reportFile.name : "",
      activityLog: [{
        time: fmtTime(form.date),
        action: "Incident created",
        detail: `Reported by ${CURRENT_USER}`
      }],
      contacts: {},
      leo: {
        agency: "",
        caseNumber: "",
        officer: "",
        dispatchTime: ""
      },
      techDispatch: {
        name: form.fieldTeam,
        company: form.fieldTeamCompany,
        dispatchTime: "",
        eta: "",
        arrivalTime: ""
      },
      compliance: {},
      tierCurrent: "",
      tierProposed: "",
      tierJustification: "",
      alertSource: {
        policyName: form.alertPolicyName,
        monitoringSystem: form.alertMonitoringSystem,
        alertStatus: ""
      },
      suspectInfo: {
        suspectCount: form.suspectCount,
        groupComposition: form.groupComposition,
        vehicleDescription: form.vehicleDescription,
        description: form.suspectDescription
      },
      externalRefs: {
        conferenceBridge: form.conferenceBridge
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      ...S.btnSecondary,
      padding: "6px 10px"
    },
    onClick: onCancel
  }, /*#__PURE__*/React.createElement(IconBack, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: S.pageTitle
  }, "New attack report"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...S.pageSubtitle,
      margin: 0
    }
  }, "Fields marked * are required"))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Asset"), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Terminal number",
    required: true
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    placeholder: "P712582",
    value: form.terminalNumber,
    onChange: e => set("terminalNumber", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Asset ID"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.terminalNumber ? "BRNK-XX" + form.terminalNumber.replace(/\D/g, "").slice(-6) : "",
    disabled: true,
    placeholder: "Auto-generated"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#1a2e40",
      padding: "8px 12px",
      borderRadius: "6px",
      fontSize: "11px",
      color: "#5eb8ff"
    }
  }, "In production: Terminal ID lookup auto-populates Make/Model, Location, Bank, Region, Liability, Avg daily cash.")), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Attack"), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Attack type",
    required: true
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.type,
    onChange: e => set("type", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select type..."), ATTACK_TYPES.map(t => /*#__PURE__*/React.createElement("option", {
    key: t.value,
    value: t.value
  }, t.label)))), /*#__PURE__*/React.createElement(Field, {
    label: "Category"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 0"
    }
  }, typeObj ? /*#__PURE__*/React.createElement(Badge, {
    cat: typeObj.cat
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#4a4a56",
      fontSize: "13px"
    }
  }, "Auto-set from type")))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Date & time",
    required: true
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    type: "datetime-local",
    value: form.date,
    onChange: e => set("date", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Status"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.status,
    onChange: e => set("status", e.target.value)
  }, STATUSES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s))))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Magnitude"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.magnitude,
    onChange: e => set("magnitude", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), MAGNITUDES.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m)))), /*#__PURE__*/React.createElement(Field, {
    label: "Alert source"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.alertPolicyName,
    onChange: e => set("alertPolicyName", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select alert type..."), ALERT_SOURCES.map(a => /*#__PURE__*/React.createElement("option", {
    key: a,
    value: a
  }, a))))), /*#__PURE__*/React.createElement(Field, {
    label: "Monitoring system"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    placeholder: "VTS, Host system, Kaseya...",
    value: form.alertMonitoringSystem,
    onChange: e => set("alertMonitoringSystem", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Description"), /*#__PURE__*/React.createElement("textarea", {
    style: S.textarea,
    placeholder: "Brief description of the incident...",
    value: form.description,
    onChange: e => set("description", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "People"), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Reported by"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 10px",
      background: "#1e2028",
      borderRadius: "6px",
      fontSize: "13px",
      color: "#6b6b76"
    }
  }, CURRENT_USER, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "11px",
      color: "#4a4a56"
    }
  }, "(auto)"))), /*#__PURE__*/React.createElement(Field, {
    label: "Assigned to"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.assignedTo,
    onChange: e => set("assignedTo", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), TEAM_MEMBERS.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m))))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Field tech"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.fieldTeam,
    onChange: e => set("fieldTeam", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), FIELD_TECHS.map(t => /*#__PURE__*/React.createElement("option", {
    key: t,
    value: t
  }, t)))), /*#__PURE__*/React.createElement(Field, {
    label: "Company"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.fieldTeamCompany,
    onChange: e => set("fieldTeamCompany", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), TEAMS.map(t => /*#__PURE__*/React.createElement("option", {
    key: t,
    value: t
  }, t)))), /*#__PURE__*/React.createElement(Field, {
    label: "Conference bridge"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    placeholder: "Bridge number",
    value: form.conferenceBridge,
    onChange: e => set("conferenceBridge", e.target.value)
  })))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Suspect information"), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Suspect count"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.suspectCount,
    onChange: e => set("suspectCount", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Unknown"), ["1", "2", "3", "4", "5", "6+"].map(n => /*#__PURE__*/React.createElement("option", {
    key: n,
    value: n
  }, n)))), /*#__PURE__*/React.createElement(Field, {
    label: "Group composition"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.groupComposition,
    onChange: e => set("groupComposition", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Unknown"), /*#__PURE__*/React.createElement("option", {
    value: "Solo"
  }, "Solo"), /*#__PURE__*/React.createElement("option", {
    value: "Pair"
  }, "Pair"), /*#__PURE__*/React.createElement("option", {
    value: "Small group (3\u20134)"
  }, "Small group (3\u20134)"), /*#__PURE__*/React.createElement("option", {
    value: "Large group (5+)"
  }, "Large group (5+)"))), /*#__PURE__*/React.createElement(Field, {
    label: "Witness vehicle description"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    placeholder: "Color, make, model, plate...",
    value: form.vehicleDescription,
    onChange: e => set("vehicleDescription", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Description"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    placeholder: "Physical description, clothing, distinguishing features...",
    value: form.suspectDescription,
    onChange: e => set("suspectDescription", e.target.value)
  })))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Evidence & incident report"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
      gap: "8px",
      marginBottom: "14px"
    }
  }, [{
    key: "exterior",
    label: "Exterior"
  }, {
    key: "interior",
    label: "Interior"
  }, {
    key: "surveillance",
    label: "Surveillance"
  }, {
    key: "serialPlate",
    label: "Serial plate"
  }].map(({
    key,
    label
  }) => /*#__PURE__*/React.createElement("label", {
    key: key,
    style: {
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4/3",
      borderRadius: "6px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      background: evidenceFiles[key] ? "#1a3020" : "#1e2028",
      border: evidenceFiles[key] ? "1px solid #2a5030" : "1px dashed #2a2c36",
      fontSize: "11px",
      color: evidenceFiles[key] ? "#6ecf80" : "#4a4a56"
    }
  }, evidenceFiles[key] ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "14px"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "10px",
      maxWidth: "90%",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      textAlign: "center"
    }
  }, evidenceFiles[key].name)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "+ ", label)), /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".jpg,.jpeg,.png,.pdf",
    style: {
      display: "none"
    },
    onChange: e => setEvidenceFiles(f => ({
      ...f,
      [key]: e.target.files[0] || null
    }))
  }))))), /*#__PURE__*/React.createElement(Field, {
    label: "Incident report (optional)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "7px 12px",
      background: "#1e2028",
      border: "1px dashed #2a2c36",
      borderRadius: "6px",
      fontSize: "12px",
      color: "#6b6b76",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
  })), reportFile ? reportFile.name : "Choose file…", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: ".pdf,.doc,.docx,.jpg,.png",
    style: {
      display: "none"
    },
    onChange: e => setReportFile(e.target.files[0] || null)
  })), reportFile && /*#__PURE__*/React.createElement("button", {
    style: {
      background: "none",
      border: "none",
      color: "#f07070",
      cursor: "pointer",
      fontSize: "12px"
    },
    onClick: () => setReportFile(null)
  }, "Remove")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "#4a4a56",
      marginTop: "4px"
    }
  }, "Leave empty if the report was verbal."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: S.btnSecondary,
    onClick: onCancel
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    style: S.btnPrimary,
    onClick: handleSubmit,
    disabled: !form.terminalNumber || !form.type || !form.date || !form.description
  }, "Create attack record")));
}
function AttackDetailPage({
  attack,
  onBack,
  onUpdate
}) {
  const [tab, setTab] = useState("incident");
  const tabs = [{
    id: "incident",
    label: "Record"
  }, {
    id: "response",
    label: "Response"
  }, {
    id: "assessment",
    label: "Assessment"
  }];
  const a = attack;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      ...S.btnSecondary,
      padding: "6px 10px"
    },
    onClick: onBack
  }, /*#__PURE__*/React.createElement(IconBack, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "6px",
      alignItems: "center",
      marginBottom: "4px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...S.mono,
      color: "#4a4a56",
      background: "#1e2028",
      padding: "2px 6px",
      borderRadius: "4px"
    }
  }, a.id), /*#__PURE__*/React.createElement(Badge, {
    cat: a.category
  }), /*#__PURE__*/React.createElement(StatusBadge, {
    status: a.status
  }), a.magnitude && /*#__PURE__*/React.createElement(MagBadge, {
    mag: a.magnitude
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...S.pageTitle,
      fontSize: "20px"
    }
  }, a.name), /*#__PURE__*/React.createElement("p", {
    style: {
      ...S.pageSubtitle,
      margin: 0,
      fontSize: "12px"
    }
  }, a.assetId, " \xB7 ", a.city ? `${a.city}, ${a.state}` : "Location pending", " \xB7 ", a.bank || "Bank pending"))), /*#__PURE__*/React.createElement("div", {
    className: "gp-tab-row"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      padding: "8px 16px",
      fontSize: "12px",
      fontWeight: tab === t.id ? 600 : 400,
      fontFamily: "inherit",
      background: tab === t.id ? "#1e2028" : "transparent",
      color: tab === t.id ? "#f0f0f2" : "#6b6b76",
      border: tab === t.id ? "1px solid #2a2c36" : "1px solid transparent",
      borderRadius: "6px",
      cursor: "pointer"
    }
  }, t.label))), tab === "incident" && /*#__PURE__*/React.createElement(DetailTab, {
    attack: a,
    onUpdate: onUpdate
  }), tab === "response" && /*#__PURE__*/React.createElement(ResponseTab, {
    attack: a,
    onUpdate: onUpdate
  }), tab === "assessment" && /*#__PURE__*/React.createElement(AssessmentTab, {
    attack: a,
    onUpdate: onUpdate
  }));
}
const TASK_STATUSES = ["Pending", "In progress", "Completed"];
const TASK_STATUS_STYLE = {
  "Pending": {
    bg: "#2a2c36",
    text: "#f0f0f2",
    border: "#3a3c48"
  },
  "In progress": {
    bg: "#3a2a0a",
    text: "#f0c050",
    border: "#5a4a1a"
  },
  "Completed": {
    bg: "#1a3020",
    text: "#6ecf80",
    border: "#2a5030"
  }
};
function parseProcessToTasks(processStr) {
  if (!processStr) return [];
  return processStr.split("\n").map(line => line.trim()).filter(Boolean).map(line => ({
    text: line.replace(/^\d+\.\s*/, ""),
    status: "Completed"
  }));
}
function ProcessTaskTracker({
  tasks,
  onChange
}) {
  const [newText, setNewText] = useState("");
  const [newStatus, setNewStatus] = useState("Pending");
  const [newAssignee, setNewAssignee] = useState("");
  const updateTask = (i, field, val) => {
    const next = tasks.map((t, idx) => idx === i ? {
      ...t,
      [field]: val
    } : t);
    onChange(next);
  };
  const deleteTask = i => onChange(tasks.filter((_, idx) => idx !== i));
  const addTask = () => {
    if (!newText.trim()) return;
    onChange([...tasks, {
      text: newText.trim(),
      status: newStatus,
      assignee: newAssignee
    }]);
    setNewText("");
    setNewStatus("Pending");
    setNewAssignee("");
  };
  const counts = TASK_STATUSES.reduce((acc, s) => {
    acc[s] = tasks.filter(t => t.status === s).length;
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement("div", null, tasks.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "#4a4a56",
      padding: "12px 0"
    }
  }, "No tasks yet \u2014 add one below."), tasks.map((task, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "8px 10px",
      background: "#1e2028",
      borderRadius: "6px",
      marginBottom: "6px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "3px",
      flexShrink: 0,
      alignSelf: "stretch",
      borderRadius: "2px",
      background: TASK_STATUS_STYLE[task.status].text
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "13px",
      color: "#d4d4d8",
      flex: 1,
      lineHeight: 1.5
    }
  }, task.text), /*#__PURE__*/React.createElement("select", {
    style: {
      ...S.select,
      width: "130px",
      flexShrink: 0,
      fontSize: "11px",
      padding: "4px 8px"
    },
    value: task.assignee || "",
    onChange: e => updateTask(i, "assignee", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Unassigned"), TEAM_MEMBERS.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m))), /*#__PURE__*/React.createElement("select", {
    style: {
      ...S.select,
      width: "120px",
      flexShrink: 0,
      fontSize: "11px",
      padding: "4px 8px",
      background: TASK_STATUS_STYLE[task.status].bg,
      color: TASK_STATUS_STYLE[task.status].text,
      border: `1px solid ${TASK_STATUS_STYLE[task.status].border}`
    },
    value: task.status,
    onChange: e => updateTask(i, "status", e.target.value)
  }, TASK_STATUSES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s))), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteTask(i),
    style: {
      background: "none",
      border: "none",
      color: "#4a4a56",
      cursor: "pointer",
      padding: "2px 4px",
      fontSize: "16px",
      flexShrink: 0,
      lineHeight: 1
    },
    onMouseEnter: e => e.currentTarget.style.color = "#f07070",
    onMouseLeave: e => e.currentTarget.style.color = "#4a4a56"
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      marginTop: "12px",
      padding: "10px",
      background: "#16181f",
      borderRadius: "6px",
      border: "1px dashed #2a2c36",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("input", {
    style: {
      ...S.input,
      flex: "1 1 140px",
      fontSize: "12px"
    },
    placeholder: "New task...",
    value: newText,
    onChange: e => setNewText(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") addTask();
    }
  }), /*#__PURE__*/React.createElement("select", {
    style: {
      ...S.select,
      flex: "0 0 130px",
      fontSize: "11px",
      padding: "4px 8px"
    },
    value: newAssignee,
    onChange: e => setNewAssignee(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Unassigned"), TEAM_MEMBERS.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m))), /*#__PURE__*/React.createElement("select", {
    style: {
      ...S.select,
      flex: "0 0 120px",
      fontSize: "11px",
      padding: "4px 8px",
      background: TASK_STATUS_STYLE[newStatus].bg,
      color: TASK_STATUS_STYLE[newStatus].text,
      border: `1px solid ${TASK_STATUS_STYLE[newStatus].border}`
    },
    value: newStatus,
    onChange: e => setNewStatus(e.target.value)
  }, TASK_STATUSES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s))), /*#__PURE__*/React.createElement("button", {
    style: {
      ...S.btnPrimary,
      padding: "6px 14px",
      fontSize: "12px",
      flexShrink: 0
    },
    onClick: addTask
  }, "+ Add")));
}
function DetailTab({
  attack,
  onUpdate
}) {
  var _a$alertSource, _a$alertSource2, _a$alertSource3, _a$alertSource4, _a$techDispatch, _a$techDispatch2, _a$techDispatch3, _a$techDispatch4, _a$techDispatch5, _a$techDispatch6, _a$techDispatch7;
  const a = attack;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    description: a.description,
    process: a.process,
    result: a.result,
    learnings: a.learnings,
    loss: a.loss,
    status: a.status,
    outcome: a.outcome,
    magnitude: a.magnitude || "",
    assignedTo: a.assignedTo,
    reportedBy: a.reportedBy || "",
    conferenceBridge: a.conferenceBridge || "",
    fieldTeam: a.fieldTeam,
    fieldTeamCompany: a.fieldTeamCompany || "",
    liability: a.liability,
    avgDailyCash: a.avgDailyCash,
    atmModel: a.atmModel,
    terminalNumber: a.terminalNumber,
    city: a.city,
    state: a.state,
    region: a.region,
    bank: a.bank,
    type: a.type,
    date: a.date ? a.date.slice(0, 16) : ""
  });
  const set = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const save = () => {
    const typeObj = ATTACK_TYPES.find(t => t.value === form.type);
    onUpdate({
      ...a,
      ...form,
      category: (typeObj === null || typeObj === void 0 ? void 0 : typeObj.cat) || a.category,
      name: ((typeObj === null || typeObj === void 0 ? void 0 : typeObj.label) || getTypeLabel(form.type)) + " attack"
    });
    setEditing(false);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Main info"), !editing && /*#__PURE__*/React.createElement("button", {
    style: {
      ...S.btnSecondary,
      padding: "4px 12px",
      fontSize: "11px"
    },
    onClick: () => setEditing(true)
  }, "Edit")), editing ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Terminal number"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.terminalNumber,
    onChange: e => set("terminalNumber", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "ATM model"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.atmModel,
    onChange: e => set("atmModel", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Attack type"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.type,
    onChange: e => set("type", e.target.value)
  }, ATTACK_TYPES.map(t => /*#__PURE__*/React.createElement("option", {
    key: t.value,
    value: t.value
  }, t.label)))), /*#__PURE__*/React.createElement(Field, {
    label: "Date & time"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    type: "datetime-local",
    value: form.date,
    onChange: e => set("date", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "City"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.city,
    onChange: e => set("city", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "State"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.state,
    onChange: e => set("state", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Region"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.region,
    onChange: e => set("region", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Bank / FI client"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.bank,
    onChange: e => set("bank", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Liability"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.liability,
    onChange: e => set("liability", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), /*#__PURE__*/React.createElement("option", {
    value: "Brinks-owned"
  }, "Brinks-owned"), /*#__PURE__*/React.createElement("option", {
    value: "FI-owned"
  }, "FI-owned")))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Avg daily cash"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.avgDailyCash,
    onChange: e => set("avgDailyCash", e.target.value),
    placeholder: "$0"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Loss"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.loss,
    onChange: e => set("loss", e.target.value),
    placeholder: "$0"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Assigned to"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.assignedTo,
    onChange: e => set("assignedTo", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Reported by"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.reportedBy,
    onChange: e => set("reportedBy", e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Field tech"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.fieldTeam,
    onChange: e => set("fieldTeam", e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Tech company"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.fieldTeamCompany,
    onChange: e => set("fieldTeamCompany", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), TEAMS.map(t => /*#__PURE__*/React.createElement("option", {
    key: t,
    value: t
  }, t)))), /*#__PURE__*/React.createElement(Field, {
    label: "Conference bridge"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: form.conferenceBridge,
    onChange: e => set("conferenceBridge", e.target.value),
    placeholder: "Bridge number"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Status"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.status,
    onChange: e => set("status", e.target.value)
  }, STATUSES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s)))), /*#__PURE__*/React.createElement(Field, {
    label: "Outcome"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.outcome,
    onChange: e => set("outcome", e.target.value)
  }, OUTCOMES.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o)))), /*#__PURE__*/React.createElement(Field, {
    label: "Magnitude"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: form.magnitude,
    onChange: e => set("magnitude", e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), MAGNITUDES.map(m => /*#__PURE__*/React.createElement("option", {
    key: m,
    value: m
  }, m)))))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoRow, {
    label: "Date",
    value: fmtDate(a.date) + " " + fmtTime(a.date)
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Type",
    value: getTypeLabel(a.type)
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Category",
    value: a.category
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Terminal",
    value: a.terminalNumber
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "ATM model",
    value: a.atmModel
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Magnitude",
    value: a.magnitude
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Bank",
    value: a.bank
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(InfoRow, {
    label: "Location",
    value: a.city && a.state ? `${a.city}, ${a.state}` : "—"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Liability",
    value: a.liability
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Avg daily cash",
    value: a.avgDailyCash
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Loss",
    value: a.loss || "—"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Assigned to",
    value: a.assignedTo
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Reported by",
    value: a.reportedBy
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Field team",
    value: `${a.fieldTeam}${a.fieldTeamCompany ? ` (${a.fieldTeamCompany})` : ""}`
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Conference bridge",
    value: a.conferenceBridge
  }))), a.reportAttachment && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px",
      paddingTop: "12px",
      borderTop: "1px solid #1e2028"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "11px",
      color: "#6b6b76",
      textTransform: "uppercase",
      letterSpacing: "0.06em"
    }
  }, "Incident report"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "6px"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: a.reportAttachment,
    target: "_blank",
    rel: "noreferrer",
    style: {
      fontSize: "12px",
      color: "#5eb8ff",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "#1a2e40",
      padding: "5px 10px",
      borderRadius: "5px",
      border: "1px solid #2a4a66"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  })), "View report"))))), /*#__PURE__*/React.createElement("div", {
    className: "gp-side-by-side"
  }, (_a$alertSource = a.alertSource) !== null && _a$alertSource !== void 0 && _a$alertSource.policyName ? /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Alert source"), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Alert / policy",
    value: (_a$alertSource2 = a.alertSource) === null || _a$alertSource2 === void 0 ? void 0 : _a$alertSource2.policyName
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Monitoring system",
    value: (_a$alertSource3 = a.alertSource) === null || _a$alertSource3 === void 0 ? void 0 : _a$alertSource3.monitoringSystem
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Alert status",
    value: (_a$alertSource4 = a.alertSource) === null || _a$alertSource4 === void 0 ? void 0 : _a$alertSource4.alertStatus
  })) : /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Description"), editing ? /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...S.textarea,
      minHeight: "90px"
    },
    value: form.description,
    onChange: e => set("description", e.target.value)
  }) : /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "13px",
      color: "#b0b0b8",
      lineHeight: 1.7,
      margin: 0,
      whiteSpace: "pre-line"
    }
  }, a.description))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Evidence & media"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: "8px"
    }
  }, ["Exterior", "Interior", "Surveillance", "Serial plate"].map((label, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      aspectRatio: "4/3",
      background: "#1e2028",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      color: "#4a4a56",
      border: "1px dashed #2a2c36",
      cursor: "pointer"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: "4/3",
      background: "#1a2e40",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      color: "#5eb8ff",
      border: "1px dashed #2a4a66",
      cursor: "pointer"
    }
  }, "+ Upload"))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Suspect information"), (() => {
    const si = a.suspectInfo || {};
    return /*#__PURE__*/React.createElement("div", {
      className: "gp-grid2"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Suspect count"
    }, /*#__PURE__*/React.createElement("select", {
      style: S.select,
      value: si.suspectCount || "",
      onChange: e => onUpdate({
        ...a,
        suspectInfo: {
          ...si,
          suspectCount: e.target.value
        }
      })
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Unknown"), ["1", "2", "3", "4", "5", "6+"].map(n => /*#__PURE__*/React.createElement("option", {
      key: n,
      value: n
    }, n)))), /*#__PURE__*/React.createElement(Field, {
      label: "Group composition"
    }, /*#__PURE__*/React.createElement("select", {
      style: S.select,
      value: si.groupComposition || "",
      onChange: e => onUpdate({
        ...a,
        suspectInfo: {
          ...si,
          groupComposition: e.target.value
        }
      })
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Unknown"), /*#__PURE__*/React.createElement("option", {
      value: "Solo"
    }, "Solo"), /*#__PURE__*/React.createElement("option", {
      value: "Pair"
    }, "Pair"), /*#__PURE__*/React.createElement("option", {
      value: "Small group (3\u20134)"
    }, "Small group (3\u20134)"), /*#__PURE__*/React.createElement("option", {
      value: "Large group (5+)"
    }, "Large group (5+)"))), /*#__PURE__*/React.createElement(Field, {
      label: "Witness vehicle description"
    }, /*#__PURE__*/React.createElement("input", {
      style: S.input,
      placeholder: "Color, make, model, plate...",
      value: si.vehicleDescription || "",
      onChange: e => onUpdate({
        ...a,
        suspectInfo: {
          ...si,
          vehicleDescription: e.target.value
        }
      })
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Description"
    }, /*#__PURE__*/React.createElement("input", {
      style: S.input,
      placeholder: "Physical description, clothing, distinguishing features...",
      value: si.description || "",
      onChange: e => onUpdate({
        ...a,
        suspectInfo: {
          ...si,
          description: e.target.value
        }
      })
    })));
  })()), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Tech dispatch"), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid3"
  }, /*#__PURE__*/React.createElement(InfoRow, {
    label: "Technician",
    value: ((_a$techDispatch = a.techDispatch) === null || _a$techDispatch === void 0 ? void 0 : _a$techDispatch.name) || "—"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Company",
    value: ((_a$techDispatch2 = a.techDispatch) === null || _a$techDispatch2 === void 0 ? void 0 : _a$techDispatch2.company) || "—"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Dispatch time",
    value: ((_a$techDispatch3 = a.techDispatch) === null || _a$techDispatch3 === void 0 ? void 0 : _a$techDispatch3.dispatchTime) || "—"
  })), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid3"
  }, /*#__PURE__*/React.createElement(InfoRow, {
    label: "ETA",
    value: ((_a$techDispatch4 = a.techDispatch) === null || _a$techDispatch4 === void 0 ? void 0 : _a$techDispatch4.eta) || "—"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Arrival time",
    value: ((_a$techDispatch5 = a.techDispatch) === null || _a$techDispatch5 === void 0 ? void 0 : _a$techDispatch5.arrivalTime) || "—"
  }), /*#__PURE__*/React.createElement(InfoRow, {
    label: "Response time",
    value: (_a$techDispatch6 = a.techDispatch) !== null && _a$techDispatch6 !== void 0 && _a$techDispatch6.dispatchTime && (_a$techDispatch7 = a.techDispatch) !== null && _a$techDispatch7 !== void 0 && _a$techDispatch7.arrivalTime ? "Calculated" : "—"
  }))), editing && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: S.btnSecondary,
    onClick: () => setEditing(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    style: S.btnPrimary,
    onClick: save
  }, "Save changes")));
}
function ResponseTab({
  attack,
  onUpdate
}) {
  const a = attack;
  const [contacts, setContacts] = useState(a.contacts || {});
  const [leo, setLeo] = useState(a.leo || {
    agency: "",
    caseNumber: "",
    officer: "",
    dispatchTime: ""
  });
  const [tech, setTech] = useState(a.techDispatch || {
    name: "",
    company: "",
    dispatchTime: "",
    eta: "",
    arrivalTime: ""
  });
  const [extRefs, setExtRefs] = useState(a.externalRefs || {
    vtsId: "",
    socHotline: "",
    socEmail: "",
    conferenceBridge: "",
    otherRefs: ""
  });
  const [newLogEntry, setNewLogEntry] = useState({
    time: "",
    action: "",
    detail: ""
  });
  const [processTasks, setProcessTasks] = useState(Array.isArray(a.processTasks) && a.processTasks.length > 0 ? a.processTasks : parseProcessToTasks(a.process));
  const handleProcessChange = tasks => {
    setProcessTasks(tasks);
    onUpdate({
      ...a,
      processTasks: tasks
    });
  };
  const saveResponse = () => {
    onUpdate({
      ...a,
      contacts,
      leo,
      techDispatch: tech,
      externalRefs: extRefs
    });
  };
  const addLogEntry = () => {
    if (!newLogEntry.time || !newLogEntry.action) return;
    const d = new Date(newLogEntry.time);
    const formatted = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    }) + " " + d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
    onUpdate({
      ...a,
      activityLog: [...(a.activityLog || []), {
        ...newLogEntry,
        time: formatted
      }]
    });
    setNewLogEntry({
      time: "",
      action: "",
      detail: ""
    });
  };
  const deleteLogEntry = i => {
    onUpdate({
      ...a,
      activityLog: (a.activityLog || []).filter((_, idx) => idx !== i)
    });
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Process"), /*#__PURE__*/React.createElement(ProcessTaskTracker, {
    tasks: processTasks,
    onChange: handleProcessChange
  })), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Law enforcement dispatch"), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Agency"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: leo.agency,
    onChange: e => setLeo(l => ({
      ...l,
      agency: e.target.value
    })),
    placeholder: "Agency name"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Case / reference number"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: leo.caseNumber,
    onChange: e => setLeo(l => ({
      ...l,
      caseNumber: e.target.value
    })),
    placeholder: "Case #"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Officer name"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: leo.officer,
    onChange: e => setLeo(l => ({
      ...l,
      officer: e.target.value
    })),
    placeholder: "Officer"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Dispatch confirmed"
  }, /*#__PURE__*/React.createElement("input", {
    style: S.input,
    value: leo.dispatchTime,
    onChange: e => setLeo(l => ({
      ...l,
      dispatchTime: e.target.value
    })),
    placeholder: "Time"
  })))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Activity log"), (a.activityLog || []).length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "#4a4a56",
      paddingBottom: "10px"
    }
  }, "No activity recorded yet."), (a.activityLog || []).map((entry, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      padding: "6px 0",
      borderBottom: "1px solid #1e2028"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...S.mono,
      color: "#4a4a56",
      flexShrink: 0,
      width: "64px"
    }
  }, entry.time), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      fontWeight: 600,
      color: "#d4d4d8",
      flexShrink: 0,
      width: "130px"
    }
  }, entry.action), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "12px",
      color: "#6b6b76",
      flex: 1
    }
  }, entry.detail), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteLogEntry(i),
    style: {
      background: "none",
      border: "none",
      color: "#4a4a56",
      cursor: "pointer",
      padding: "2px 4px",
      fontSize: "15px",
      flexShrink: 0,
      lineHeight: 1
    },
    onMouseEnter: e => e.currentTarget.style.color = "#f07070",
    onMouseLeave: e => e.currentTarget.style.color = "#4a4a56"
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      marginTop: "12px",
      padding: "10px",
      background: "#16181f",
      borderRadius: "6px",
      border: "1px dashed #2a2c36",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("input", {
    style: {
      ...S.input,
      flex: "0 0 180px",
      fontSize: "11px"
    },
    type: "datetime-local",
    value: newLogEntry.time,
    onChange: e => setNewLogEntry(l => ({
      ...l,
      time: e.target.value
    }))
  }), /*#__PURE__*/React.createElement("input", {
    style: {
      ...S.input,
      flex: "0 0 140px",
      fontSize: "11px"
    },
    placeholder: "Action",
    value: newLogEntry.action,
    onChange: e => setNewLogEntry(l => ({
      ...l,
      action: e.target.value
    }))
  }), /*#__PURE__*/React.createElement("input", {
    style: {
      ...S.input,
      flex: 1,
      fontSize: "11px"
    },
    placeholder: "Detail",
    value: newLogEntry.detail,
    onChange: e => setNewLogEntry(l => ({
      ...l,
      detail: e.target.value
    })),
    onKeyDown: e => {
      if (e.key === "Enter") addLogEntry();
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      ...S.btnSecondary,
      padding: "6px 12px",
      fontSize: "11px",
      flexShrink: 0
    },
    onClick: addLogEntry
  }, "+ Add"))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Outcome & learnings"), /*#__PURE__*/React.createElement("textarea", {
    style: {
      ...S.textarea,
      minHeight: "120px"
    },
    value: a.outcomeNotes || (a.result ? a.result + (a.learnings ? "\n\n" + a.learnings : "") : ""),
    onChange: e => onUpdate({
      ...a,
      outcomeNotes: e.target.value
    }),
    placeholder: "What was the final outcome? What did we learn? What gaps were identified?"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: S.btnPrimary,
    onClick: saveResponse
  }, "Save response data")));
}
function AssessmentTab({
  attack,
  onUpdate
}) {
  const a = attack;
  const [compliance, setCompliance] = useState(a.compliance || {});
  const [tierCurrent, setTierCurrent] = useState(a.tierCurrent || "");
  const [tierProposed, setTierProposed] = useState(a.tierProposed || "");
  const [tierJustification, setTierJustification] = useState(a.tierJustification || "");
  const PH_CYCLE = ["pass", "fail", "n/a"];
  const togglePH = id => {
    setCompliance(prev => {
      var _next$id;
      const next = {
        ...prev
      };
      const current = ((_next$id = next[id]) === null || _next$id === void 0 ? void 0 : _next$id.status) || "n/a";
      const idx = PH_CYCLE.indexOf(current);
      next[id] = {
        ...(next[id] || {
          finding: ""
        }),
        status: PH_CYCLE[(idx + 1) % PH_CYCLE.length]
      };
      return next;
    });
  };
  const setFinding = (id, finding) => {
    setCompliance(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {
          status: "n/a"
        }),
        finding
      }
    }));
  };
  const save = () => {
    onUpdate({
      ...a,
      compliance,
      tierCurrent,
      tierProposed,
      tierJustification
    });
  };
  const phFails = PH_REQS.filter(r => {
    var _compliance$r$id;
    return ((_compliance$r$id = compliance[r.id]) === null || _compliance$r$id === void 0 ? void 0 : _compliance$r$id.status) === "fail";
  }).length;
  const swFails = SW_REQS.filter(r => {
    var _compliance$r$id2;
    return ((_compliance$r$id2 = compliance[r.id]) === null || _compliance$r$id2 === void 0 ? void 0 : _compliance$r$id2.status) === "fail";
  }).length;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Physical security"), phFails > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "11px",
      color: "#f07070"
    }
  }, phFails, " fail", phFails > 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "#4a4a56",
      marginBottom: "10px"
    }
  }, "Evaluated on-site. Click the status badge to toggle."), PH_REQS.map(req => {
    const c = compliance[req.id];
    const status = (c === null || c === void 0 ? void 0 : c.status) || "n/a";
    return /*#__PURE__*/React.createElement("div", {
      key: req.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "7px 0",
        borderBottom: "1px solid #1e2028"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...S.mono,
        color: "#4a4a56",
        background: "#1e2028",
        padding: "2px 6px",
        borderRadius: "4px",
        flexShrink: 0,
        width: "56px",
        textAlign: "center"
      }
    }, req.id), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "12px",
        fontWeight: 500,
        flex: "1 1 160px",
        color: "#d4d4d8",
        minWidth: 0
      }
    }, req.name), /*#__PURE__*/React.createElement("input", {
      style: {
        ...S.input,
        flex: "1 1 180px",
        fontSize: "11px",
        padding: "4px 8px"
      },
      value: (c === null || c === void 0 ? void 0 : c.finding) || "",
      onChange: e => setFinding(req.id, e.target.value),
      placeholder: "Comment..."
    }), /*#__PURE__*/React.createElement("div", {
      onClick: () => togglePH(req.id),
      style: {
        cursor: "pointer",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(ComplianceBadge, {
      status: status
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Software & configuration"), swFails > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "11px",
      color: "#f07070"
    }
  }, swFails, " fail", swFails > 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "#4a4a56",
      marginBottom: "10px"
    }
  }, "Status populated automatically from system. Comments can be added manually."), SW_REQS.map(req => {
    const c = compliance[req.id];
    const status = (c === null || c === void 0 ? void 0 : c.status) || "pass";
    return /*#__PURE__*/React.createElement("div", {
      key: req.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "7px 0",
        borderBottom: "1px solid #1e2028"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        ...S.mono,
        color: "#4a4a56",
        background: "#1e2028",
        padding: "2px 6px",
        borderRadius: "4px",
        flexShrink: 0,
        width: "56px",
        textAlign: "center"
      }
    }, req.id), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "12px",
        fontWeight: 500,
        flex: "1 1 160px",
        color: "#d4d4d8",
        minWidth: 0
      }
    }, req.name), /*#__PURE__*/React.createElement("input", {
      style: {
        ...S.input,
        flex: "1 1 180px",
        fontSize: "11px",
        padding: "4px 8px"
      },
      value: (c === null || c === void 0 ? void 0 : c.finding) || "",
      onChange: e => setFinding(req.id, e.target.value),
      placeholder: "Comment..."
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(SwBadge, {
      status: status
    })));
  })), phFails + swFails > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#3a1418",
      padding: "12px 14px",
      borderRadius: "8px",
      marginBottom: "12px",
      border: "1px solid #5a2028"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "13px",
      fontWeight: 600,
      color: "#f07070",
      marginBottom: "4px"
    }
  }, phFails + swFails, " requirement", phFails + swFails > 1 ? "s" : "", " failed"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "12px",
      color: "#d08080",
      lineHeight: 1.6
    }
  }, Object.entries(compliance).filter(([, c]) => c.status === "fail").map(([id, c]) => /*#__PURE__*/React.createElement("div", {
    key: id
  }, id, ": ", c.finding || "No comment recorded")))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Tier reclassification"), /*#__PURE__*/React.createElement("div", {
    className: "gp-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Current tier"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: tierCurrent,
    onChange: e => setTierCurrent(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), TIERS.map(t => /*#__PURE__*/React.createElement("option", {
    key: t,
    value: t
  }, t)))), /*#__PURE__*/React.createElement(Field, {
    label: "Proposed tier"
  }, /*#__PURE__*/React.createElement("select", {
    style: S.select,
    value: tierProposed,
    onChange: e => setTierProposed(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select..."), TIERS.map(t => /*#__PURE__*/React.createElement("option", {
    key: t,
    value: t
  }, t))))), /*#__PURE__*/React.createElement(Field, {
    label: "Justification"
  }, /*#__PURE__*/React.createElement("textarea", {
    style: S.textarea,
    value: tierJustification,
    onChange: e => setTierJustification(e.target.value),
    placeholder: "Explain the basis for reclassification..."
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
      marginTop: "8px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: S.btnPrimary,
    onClick: save
  }, "Save assessment")));
}
function ExportPage({
  attacks
}) {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(attacks, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "incident-response-attacks-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const stats = {
    total: attacks.length,
    physical: attacks.filter(a => a.category === "Physical").length,
    cyber: attacks.filter(a => a.category === "Cyber").length,
    cyberPhysical: attacks.filter(a => a.category === "Cyber-Physical").length,
    open: attacks.filter(a => a.status === "Open").length,
    prevented: attacks.filter(a => a.outcome === "Prevented").length,
    successful: attacks.filter(a => a.outcome === "Successful").length,
    totalLoss: attacks.reduce((sum, a) => {
      const num = parseFloat((a.loss || "").replace(/[^0-9.]/g, ""));
      return sum + (isNaN(num) ? 0 : num);
    }, 0)
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: S.pageTitle
  }, "Stats & export"), /*#__PURE__*/React.createElement("p", {
    style: S.pageSubtitle
  }, "Fleet attack summary and data export")), /*#__PURE__*/React.createElement("button", {
    style: S.btnPrimary,
    onClick: exportJSON
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement(IconExport, null), " Export JSON"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gap: "10px",
      marginBottom: "24px"
    }
  }, [{
    label: "Total attacks",
    value: stats.total,
    color: "#d4d4d8"
  }, {
    label: "Physical",
    value: stats.physical,
    color: "#f0997b"
  }, {
    label: "Cyber",
    value: stats.cyber,
    color: "#5eb8ff"
  }, {
    label: "Cyber-Physical",
    value: stats.cyberPhysical,
    color: "#b0a4f0"
  }, {
    label: "Open",
    value: stats.open,
    color: "#f0c050"
  }, {
    label: "Prevented",
    value: stats.prevented,
    color: "#6ecf80"
  }, {
    label: "Successful",
    value: stats.successful,
    color: "#f07070"
  }, {
    label: "Total loss",
    value: "$" + stats.totalLoss.toLocaleString(),
    color: "#f07070"
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "#16181f",
      border: "1px solid #1e2028",
      borderRadius: "8px",
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "#4a4a56",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: "6px"
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "22px",
      fontWeight: 600,
      color: s.color
    }
  }, s.value)))), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Attacks by type"), ATTACK_TYPES.map(t => {
    const count = attacks.filter(a => a.type === t.value).length;
    return /*#__PURE__*/React.createElement("div", {
      key: t.value,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "6px 0",
        borderBottom: "1px solid #1e2028"
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      cat: t.cat
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "13px",
        flex: 1,
        color: "#d4d4d8"
      }
    }, t.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "15px",
        fontWeight: 600,
        color: count > 0 ? "#f0f0f2" : "#4a4a56"
      }
    }, count), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "120px",
        height: "6px",
        background: "#1e2028",
        borderRadius: "3px",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${attacks.length > 0 ? count / attacks.length * 100 : 0}%`,
        height: "100%",
        background: CAT_STYLE[t.cat].text,
        borderRadius: "3px",
        transition: "width 0.3s"
      }
    })));
  })), /*#__PURE__*/React.createElement("div", {
    style: S.card
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Export preview"), /*#__PURE__*/React.createElement("pre", {
    style: {
      background: "#0e1117",
      padding: "12px",
      borderRadius: "6px",
      fontSize: "11px",
      color: "#6b6b76",
      overflow: "auto",
      maxHeight: "300px",
      border: "1px solid #1e2028",
      fontFamily: '"JetBrains Mono", monospace',
      lineHeight: 1.5
    }
  }, JSON.stringify(attacks.length > 0 ? attacks[0] : {}, null, 2)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "11px",
      color: "#4a4a56",
      marginTop: "8px"
    }
  }, "Showing first record. Export button downloads all ", attacks.length, " records as JSON.")));
}

/* ── app ── */
function App() {
  const [data, setData] = useState(loadData);
  const [page, setPage] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const updateData = useCallback(newData => {
    setData(newData);
    saveData(newData);
  }, []);
  const handleSelect = id => {
    setSelectedId(id);
    setPage("detail");
  };
  const handleNew = () => setPage("new");
  const handleBack = () => {
    setPage("list");
    setSelectedId(null);
  };
  const handleSaveNew = attack => {
    const id = `ATT-${String(data.nextId).padStart(3, "0")}`;
    const newAttack = {
      ...attack,
      id
    };
    const newData = {
      attacks: [newAttack, ...data.attacks],
      nextId: data.nextId + 1
    };
    updateData(newData);
    setSelectedId(id);
    setPage("detail");
  };
  const handleUpdate = updated => {
    const newData = {
      ...data,
      attacks: data.attacks.map(a => a.id === updated.id ? updated : a)
    };
    updateData(newData);
  };
  const selectedAttack = data.attacks.find(a => a.id === selectedId);
  return /*#__PURE__*/React.createElement("div", {
    style: S.app
  }, /*#__PURE__*/React.createElement(GlobalStyles, null), /*#__PURE__*/React.createElement("link", {
    href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
    rel: "stylesheet"
  }), /*#__PURE__*/React.createElement("div", {
    className: "gp-main"
  }, page === "list" && /*#__PURE__*/React.createElement(AttacksListPage, {
    attacks: data.attacks,
    onSelect: handleSelect,
    onNew: handleNew
  }), page === "new" && /*#__PURE__*/React.createElement(AddAttackPage, {
    onSave: handleSaveNew,
    onCancel: handleBack
  }), page === "detail" && selectedAttack && /*#__PURE__*/React.createElement(AttackDetailPage, {
    attack: selectedAttack,
    onBack: handleBack,
    onUpdate: handleUpdate
  })));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));