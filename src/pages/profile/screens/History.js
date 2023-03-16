import React, { useState } from "react";
import { dishesList } from "../../../assets/utils/config";
import DateInput from "../../../components/DateInput/DateInput";
import classes from "../../../components/Layout/Layout.module.scss";
import Search from "../../../components/Search/Search";
import Table from "../../../components/Table/Table";

function History() {
  const today = new Date().toISOString().split("T")[0];
  const [data, setData] = useState(dishesList);
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const filteredDishes = data.filter((dish) => {
    const queryMatches = dish.id.toString().includes(search);
    const dateMatches =
      !selectedDate ||
      new Date(dish.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString();
    return queryMatches && dateMatches;
  });
  const [sorting, setSorting] = useState({ field: null, direction: null });
  const handleSort = (field) => {
    let direction = "asc";
    if (sorting.field === field && sorting.direction === "asc") {
      direction = "desc";
    }
    setSorting({ field, direction });
    setData((prev) =>
      prev.sort((a, b) => {
        if (direction === "asc") {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      })
    );
  };
  return (
    <div className={classes.container__history}>
      <h1>History</h1>
      <br />
      <div className={classes.container__history__search}>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <DateInput
          extraStyles={{ backgroundColor: "#F0F0F7", width: "200px" }}
          id="date"
          name="date"
          max={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <Table data={filteredDishes} onChange={setData} handleSort={handleSort} sorting={sorting}  />
    </div>
  );
}

export default History;
