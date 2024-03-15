import { useQuery } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import React from "react";

export default function ShowMyOrder({ visible, setVisible, id }) {
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`https://api.islamicposhak.com/api/order/${id}`).then((res) =>
        res.json()
      ),
  });
  const orders = ordersQuery.data;
  console.log(orders);
  return (
    <div>
      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <h2>{id}</h2>
      </Dialog>
    </div>
  );
}
