import React, { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import {
  Area,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import {
  expenseSummaryRequest,
  purchaseSummaryRequest,
  returnSummaryRequest,
  saleSummaryRequest,
} from "../../APIRequest/summaryApi";

const Dashboard = () => {
  const {
    expenseTotal,
    expenseLast30Days,
    saleTotal,
    saleLast30Days,
    purchaseTotal,
    purchaseLast30Days,
    returnTotal,
    returnLast30days,
  } = useSelector((state) => state.summary);

  useEffect(() => {
    expenseSummaryRequest();
    returnSummaryRequest();
    purchaseSummaryRequest();
    saleSummaryRequest();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 p-2">
            <div className="card bg-warning">
              <div className="card-body">
                <span className="h5" style={{ color: "black" }}>
                  <CurrencyFormat
                    value={Number(expenseTotal)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>
                <p style={{ color: "black" }}>Total Expense</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card rounded">
              <div className="card-body bg-primary">
                <span className="h5" style={{ color: "black" }}>
                  <CurrencyFormat
                    value={Number(saleTotal)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>
                <p style={{ color: "black" }}>Total Sale</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card">
              <div className="card-body bg-info">
                <span className="h5" style={{ color: "black" }}>
                  <CurrencyFormat
                    value={Number(purchaseTotal)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>
                <p style={{ color: "black" }}>Total Purchase</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 p-2">
            <div className="card text-body">
              <div className="card-body bg-danger">
                <span className="h5" style={{ color: "black" }}>
                  <CurrencyFormat
                    value={Number(returnTotal)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </span>
                <p style={{ color: "black" }}>Total Return</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 p-2">
            <div className="card">
              <div className="card-body">
                <span className="h6">Expense Last 30 Days</span>
                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                  <AreaChart
                    width={500}
                    height={200}
                    data={expenseLast30Days}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="totalAmount"
                      stroke="#CB0C9F"
                      fill="#CB0C9F"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="card">
              <div className="card-body">
                <span className="h6">Sales Last 30 Days</span>
                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                  <AreaChart
                    width={500}
                    height={200}
                    data={saleLast30Days}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="totalAmount"
                      stroke="#CB0C9F"
                      fill="#CB0C9F"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="card">
              <div className="card-body">
                <span className="h6">Purchase Last 30 Days</span>
                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                  <AreaChart
                    width={500}
                    height={200}
                    data={purchaseLast30Days}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="totalAmount"
                      stroke="#00A884"
                      fill="#00A884"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="card">
              <div className="card-body">
                <span className="h6">Return Last 30 Days</span>
                <ResponsiveContainer className="mt-4" width="100%" height={200}>
                  <AreaChart
                    width={500}
                    height={200}
                    data={returnLast30days}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="totalAmount"
                      stroke="#CB0C9F"
                      fill="#CB0C9F"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
