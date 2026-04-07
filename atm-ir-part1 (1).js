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
const STATUSES = ["Open", "Active", "Closed"];
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
  Active: {
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
    "time": "04:57 AM",
    "action": "Alert triggered",
    "detail": "Cabinet door open — monitoring system"
  }, {
    "time": "05:01 AM",
    "action": "CRT notified",
    "detail": "Victor Smith, Byron Lubbe, Tony Mercer, Jim Reeder, Susan Nicholls"
  }, {
    "time": "05:02 AM",
    "action": "Tech dispatched",
    "detail": "David Barrowman — ETA 3 hours"
  }, {
    "time": "05:08 AM",
    "action": "LEO contacted",
    "detail": "Durant PD — case #211166 assigned"
  }, {
    "time": "07:56 AM",
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
    "time": "05:32 PM",
    "action": "Anomaly detected",
    "detail": "Multiple dispenses without valid transactions"
  }, {
    "time": "05:35 PM",
    "action": "Unit offline",
    "detail": "Remote shutdown initiated"
  }, {
    "time": "06:10 PM",
    "action": "Tech dispatched",
    "detail": "Curtis — Brinks"
  }, {
    "time": "08:45 PM",
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
    "time": "05:19 PM",
    "action": "Fascia opened",
    "detail": "Front fascia door opened — CST"
  }, {
    "time": "05:37 PM",
    "action": "Power failure",
    "detail": "Power lost — CST"
  }, {
    "time": "07:44 PM",
    "action": "Router down",
    "detail": "Network router down 7:44-8:00 PM CST"
  }, {
    "time": "08:42 PM",
    "action": "BIC USB alert",
    "detail": "Alert sent to Retail (Chad, Jim) — not FICOE"
  }, {
    "time": "10:16 PM",
    "action": "Power failed again",
    "detail": "Cassettes emptied by 10:27:46"
  }, {
    "time": "12:12 PM",
    "action": "Dispatch placed",
    "detail": "Andrew manually placed ticket 10/5"
  }, {
    "time": "04:24 PM",
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
    "time": "09:42 PM",
    "action": "Comms lost",
    "detail": "Network unplugged by attackers"
  }, {
    "time": "11:10 PM",
    "action": "BIC text alert",
    "detail": "USB alert — CST"
  }, {
    "time": "08:47 AM",
    "action": "Dispatch placed",
    "detail": "Manual ticket 10/5"
  }, {
    "time": "12:12 PM",
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
    "time": "11:23 PM",
    "action": "Supervisor mode",
    "detail": "Door open — LAN unplugged by attackers"
  }, {
    "time": "11:49 PM",
    "action": "BIC text alert",
    "detail": "Alert sent"
  }, {
    "time": "08:46 AM",
    "action": "Dispatch placed",
    "detail": "Andrew manual dispatch 10/5"
  }, {
    "time": "12:26 PM",
    "action": "Tech onsite",
    "detail": "No power, could not open fascia — left site"
  }, {
    "time": "09:36 AM",
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
    "time": "04:16 AM",
    "action": "Attack detected",
    "detail": "ROC notified FICOE immediately"
  }, {
    "time": "04:20 AM",
    "action": "LEO dispatched",
    "detail": "Immediate dispatch — lesson from Topeka cluster"
  }, {
    "time": "11:57 AM",
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
    "time": "12:18 AM",
    "action": "CDS closed status",
    "detail": "Reported — no alarm triggered"
  }, {
    "time": "08:00 AM",
    "action": "Dispatch queued",
    "detail": "Daily check-in triggered dispatch"
  }, {
    "time": "08:45 AM",
    "action": "Tech onsite",
    "detail": "David Barrowman arrived"
  }, {
    "time": "03:45 PM",
    "action": "Secret Service",
    "detail": "Notified"
  }, {
    "time": "04:50 PM",
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
    "time": "02:42 AM",
    "action": "No RMM from BIC",
    "detail": "First indication"
  }, {
    "time": "02:47 AM",
    "action": "Cash reject bin removed",
    "detail": "CDS report"
  }, {
    "time": "02:48 AM",
    "action": "Alarm triggered",
    "detail": "Police responded in 3 mins"
  }, {
    "time": "02:51 AM",
    "action": "Thieves gone",
    "detail": "Total time on site ~3 minutes"
  }, {
    "time": "08:20 AM",
    "action": "Bank contacted Rowdy",
    "detail": ""
  }, {
    "time": "08:35 AM",
    "action": "Rowdy headed to site",
    "detail": ""
  }, {
    "time": "12:54 PM",
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
    "time": "12:30 AM",
    "action": "1st alarm",
    "detail": "Monitoring confused — no LEO dispatched"
  }, {
    "time": "01:53 AM",
    "action": "2nd alarm",
    "detail": "Still no LEO dispatched"
  }, {
    "time": "03:55 AM",
    "action": "Bank rep on site",
    "detail": "Caused thieves to leave"
  }, {
    "time": "05:00 AM",
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
    "time": "03:05 AM",
    "action": "Alarm triggered",
    "detail": "Thieves gone within 3 minutes — CST"
  }, {
    "time": "03:50 AM",
    "action": "BIC safe door alert",
    "detail": "EST"
  }, {
    "time": "08:18 AM",
    "action": "Bank contacted Rowdy",
    "detail": "EST"
  }, {
    "time": "08:21 AM",
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
    "time": "Unknown",
    "action": "USB alert (29th)",
    "detail": "BIC USB alert — September 29, 2025. Five days before coordinated Oct 4 attacks."
  }, {
    "time": "Unknown",
    "action": "Bill jam",
    "detail": "SDM damaged, 16 amp switch damaged"
  }, {
    "time": "Unknown",
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