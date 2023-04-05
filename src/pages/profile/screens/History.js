import React, { useEffect, useState } from "react";
import DateInput from "../../../components/DateInput/DateInput";
import classes from "../../../components/Layout/Layout.module.scss";
import Search from "../../../components/Search/Search";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserError,
  getUserStatus,
  selectHistory,
  userHistory,
} from "../../../features/authSlice";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error";

function History() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: null, direction: null });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userHistory());
  }, [dispatch]);
  const [history, setHistory] = useState([]);
  const historyStatus = useSelector(getUserStatus);
  const histories = useSelector(selectHistory);
  const error = useSelector(getUserError);
  useEffect(() => {
    if (historyStatus === "fetchedHistory") {
      setHistory(Array.from(histories));
    }
  }, [historyStatus, histories]);
  let content;
  if (historyStatus === "loading") {
    content = <Loading />;
  } else if (historyStatus === "error") {
    content = <Error>{error}</Error>;
  } else if (historyStatus === "fetchedHistory") {
    const filteredDishes = history.filter((dish) => {
      const queryMatches = dish.orderId && dish.orderId.toString().includes(search);
      const dateMatches =
        !selectedDate ||
        new Date(dish.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString();
      return queryMatches && dateMatches;
    });

    const handleSort = (field) => {
      let direction = "asc";
      if (sorting.field === field && sorting.direction === "asc") {
        direction = "desc";
      }
      setSorting({ field, direction });
      setHistory((prev) =>
        prev.sort((a, b) => {
          if (direction === "asc") {
            return a[field] > b[field] ? 1 : -1;
          } else {
            return a[field] < b[field] ? 1 : -1;
          }
        })
      );
    };
    content = (
      <Table
        data={filteredDishes}
        onChange={setHistory}
        handleSort={handleSort}
        sorting={sorting}
      />
    );
  }

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
      {content}
    </div>
  );
}

export default History;
