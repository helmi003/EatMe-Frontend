import React from "react";
import classes from "./Table.module.scss";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

function Table({ data,handleSort,sorting }) {
  return (
    <div className={classes.table}>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              <div className={classes.table__th}>
                Order ID{" "}
                {sorting.field === "id" && sorting.direction === "asc" && (
                  <IoMdArrowDropup />
                )}
                {sorting.field === "id" && sorting.direction === "desc" && (
                  <IoMdArrowDropdown />
                )}
              </div>
            </th>
            <th onClick={() => handleSort("date")}>
              <div className={classes.table__th}>
                Date{" "}
                {sorting.field === "date" && sorting.direction === "asc" && (
                  <IoMdArrowDropup />
                )}
                {sorting.field === "date" && sorting.direction === "desc" && (
                  <IoMdArrowDropdown />
                )}
              </div>
            </th>
            <th onClick={() => handleSort("table")}>
              Table{" "}
              {sorting.field === "table" && sorting.direction === "asc" && (
                <IoMdArrowDropup />
              )}
              {sorting.field === "table" && sorting.direction === "desc" && (
                <IoMdArrowDropdown />
              )}
            </th>
            <th onClick={() => handleSort("amount")}>
              Amount{" "}
              {sorting.field === "amount" && sorting.direction === "asc" && (
                <IoMdArrowDropup />
              )}
              {sorting.field === "amount" && sorting.direction === "desc" && (
                <IoMdArrowDropdown />
              )}
            </th>
            <th onClick={() => handleSort("payment")}>
              Payment{" "}
              {sorting.field === "payment" && sorting.direction === "asc" && (
                <IoMdArrowDropup />
              )}
              {sorting.field === "payment" && sorting.direction === "desc" && (
                <IoMdArrowDropdown />
              )}
            </th>
            <th onClick={() => handleSort("phone")}>
              Phone{" "}
              {sorting.field === "phone" && sorting.direction === "asc" && (
                <IoMdArrowDropup />
              )}
              {sorting.field === "phone" && sorting.direction === "desc" && (
                <IoMdArrowDropdown />
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.orderId}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.table || "Online"}</td>
                <td>{item.amount}DT</td>
                <td>{item.payment}</td>
                <td>{item.phone}</td>
              </tr>
            ))
          ) : (
            <tr className={classes.table__noData}>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
