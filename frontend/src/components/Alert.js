import React, { useContext } from "react";
import alertContext from "../contexts/alertContext";

function Alert(props) {
  const context = useContext(alertContext);
  const { type, msg } = context;

  return (
    <>
      <div style={{ height: "30px" }}>
        {msg && (
          <>
            <div
              className={`alert alert-${type} alert-dismissible fade show`}
              role="alert"
            >
              <strong>
                {type==="success"?(type.charAt(0).toUpperCase() +
                  type.slice(1)):"Error "}
              </strong>{" "}
              {msg}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Alert;
