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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: S.pageTitle
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
  }, "All types"), ATTACK_TYPES.map(t => /*#__PURE__*/React.createElement("option", {
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
  }, "All regions"), regions.map(r => /*#__PURE__*/React.createElement("option", {
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
  }, "All statuses"), STATUSES.map(s => /*#__PURE__*/React.createElement("option", {
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