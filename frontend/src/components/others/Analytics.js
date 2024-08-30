import axios from "axios";
import { useState, useEffect } from "react";

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [productToSumFinal, setProductToSum] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const productToSum = {};
      const response = await axios.get("http://localhost:3003/products");
      setProducts(response.data);

      const shiftsResponse = await axios.get("http://localhost:3003/shifts");
      setShifts(shiftsResponse.data);

      for (const machine of Object.keys(shiftsResponse.data)) {
        for (const shift of shiftsResponse.data[machine]) {
          if (productToSum[shift.product.id]) {
            productToSum[shift.product.id] += 400;
          } else {
            productToSum[shift.product.id] = 400;
          }
        }
      }
      setProductToSum(productToSum);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        marginTop: "200px",
        display: "flex",
        justifyContent: "center",
        fontSize: "30px",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "40px",
      }}
    >
      {products.map((product) => {
        console.log({ product });
        return (
          <div>
            {`Expected quantity for upcoming month for product ${
              product.id
            } is: ${productToSumFinal[product.id] ?? 0} units`}
            <div />
          </div>
        );
      })}
    </div>
  );
};

export default Analytics;
