}) {
  const [tab, setTab] = useState("incident");
  const tabs = [{
    id: "incident",
    label: "Incident"
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
    bg: "#1e2028",
    text: "#6b6b76",
    border: "#2a2c36"
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
      status: newStatus
    }]);
    setNewText("");
    setNewStatus("Pending");
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
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    style: {
      ...S.input,
      flex: 1,
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
      width: "130px",
      flexShrink: 0,
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
    onUpdate({
      ...a,
      activityLog: [...(a.activityLog || []), {
        ...newLogEntry
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
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    style: {
      ...S.input,
      flex: "0 0 80px",
      fontSize: "11px"
    },
    placeholder: "Time",
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
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 28px",
      borderBottom: "1px solid #1e2028",
      background: "#0e1117",
      position: "sticky",
      top: 0,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://cdn.prod.website-files.com/633edbba35022b924b3e870b/69d4628b063c04e568af298f_logo_brinks_white.png",
    alt: "Brinks",
    style: {
      height: "22px",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "1px",
      height: "24px",
      background: "#2a2c36"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "https://cdn.prod.website-files.com/633edbba35022b924b3e870b/699e06c256d5345a24deda9b_nqub_logo%204.svg",
    alt: "nq\u016Bb",
    style: {
      height: "20px",
      objectFit: "contain"
    }
  })), /*#__PURE__*/React.createElement("div", {
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