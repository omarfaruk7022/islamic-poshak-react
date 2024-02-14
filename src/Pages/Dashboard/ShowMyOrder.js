import { useQuery } from "@tanstack/react-query";
import { Dialog } from "primereact/dialog";
import React from "react";

export default function ShowMyOrder({ visible, setVisible, id }) {
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch(`https://frantic-crab-cape.cyclic.app/api/order/${id}`).then(
        (res) => res.json()
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
        <div className="overflow-x-auto overflow-auto   p-5">
          <table className="min-w-full divide-y-2 divide-gray-100 dark:divide-gray-800 text-sm ">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900">
                  Image
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Product name
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Ordered by
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Delivery Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-left text-gray-900 ">
                  Order Date
                </th>
              </tr>
            </thead>
            {orders?.data?.map((order) => (
              <>
                <tbody className="divide-y divide-gray-200 overflow-auto ">
                  <tr>
                    <td className="">
                      <img
                        src={order?.image}
                        alt=""
                        className="rounded-md w-[40px]"
                      ></img>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.quantity}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.deliveryAddress}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-700 dark:text-gray-200">
                      {order?.orderTime} , {order?.orderDate}
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </Dialog>
    </div>
  );
}
