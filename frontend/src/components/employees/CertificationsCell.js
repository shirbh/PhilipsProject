import React, { useEffect, useState } from "react";

const CertificationsCell = ({ products, onCheckChange, checkedCerts }) => {
  const [checkedCertsState, setCheckedCertsState] = useState(checkedCerts);

  console.log({ checkedCerts });
  useEffect(() => {
    setCheckedCertsState(checkedCerts);
  }, [checkedCerts]);
  return (
    <div className="certifications-container">
      {products.map((product) => (
        <div key={product.id} className="certification-checkbox">
          <input
            size={20}
            type="checkbox"
            id={product.id}
            checked={checkedCertsState.includes(product.id)}
            onChange={(e) => {
              onCheckChange(product.id, e.target.checked);
              if (e.target.checked) {
                setCheckedCertsState((prev) => [...prev, product.id]);
              } else {
                setCheckedCertsState((prev) =>
                  prev.filter((i) => i !== product.id)
                );
              }
            }}
          />
          <label
            htmlFor={product.id}
            style={{ fontSize: "20px", marginLeft: "3px" }}
          >{`Product ${product.id}`}</label>
        </div>
      ))}
    </div>
  );
};

export default CertificationsCell;
