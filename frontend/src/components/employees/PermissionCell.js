import React, { useEffect, useState } from "react";

const PermissionCell = ({ permissions, onCheckChange, id }) => {
  const [permissionState, setPermissionsState] = useState(permissions);

  const getPermissions = (id) => {
    const employee = permissions.find((item) => item.id === id);
    if (!employee || !employee.permissions) {
      return [];
    }
    return employee.permissions;
  };

  useEffect(() => {
    setPermissionsState(getPermissions(id));
  }, [permissions]);

  return (
    <div className="certifications-container">
      <div className="certification-checkbox">
        <input
          size={20}
          type="checkbox"
          id={"admin"}
          checked={permissionState.length !== 0}
          onChange={(e) => {
            onCheckChange(e.target.checked);
            if (e.target.checked) {
              setPermissionsState((prev) => ["admin"]);
            } else {
              setPermissionsState((prev) => []);
            }
          }}
        />
        <label
          htmlFor={"admin"}
          style={{ fontSize: "20px", marginLeft: "3px" }}
        >
          {"admin"}
        </label>
      </div>
    </div>
  );
};

export default PermissionCell;
