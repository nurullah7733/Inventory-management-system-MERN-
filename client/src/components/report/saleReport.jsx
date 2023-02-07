import React, { useRef } from "react";
import {
  expenseReportRequest,
  saleReportRequest,
} from "../../APIRequest/reportApi";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";
import { IsEmpty } from "../../helper/formValidation/formValidation";
import { useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import exportFromJSON from "export-from-json";
import moment from "moment";

const SaleReport = () => {
  let saleReport = useSelector((state) => state.report.saleReport);

  let formRef,
    toRef = useRef();

  const handleClick = () => {
    let fromDate = formRef.value;
    let toDate = toRef.value;

    if (!IsEmpty(fromDate)) {
      ErrorToast("Please Select from Date");
    } else if (!IsEmpty(toDate)) {
      ErrorToast("Please Select from Date");
    } else {
      saleReportRequest(fromDate, toDate);
    }
  };

  const OnExport = (exportType, data) => {
    const fileName = "Sales-Report";
    if (data.length > 0) {
      let ReportData = [];
      data.map((item) => {
        let listItem = {
          Product_Name: item["productName"].name,
          Category_Name: item["categoryName"][0].name,
          Brand_Name: item["brandName"][0].name,
          Quantity: item["qty"],
          UnitCost: item["unitCost"],
          Total: item["total"],
          Date: moment(item["createdAt"]).format("MMMM Do YYYY"),
        };
        ReportData.push(listItem);
      });
      exportFromJSON({
        data: ReportData,
        fileName: fileName,
        exportType: exportType,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>Sales Report by Date</h5>
                <hr className="bg-light" />

                <div className="col-4 p-2">
                  <label className="form-label">Date Form:</label>
                  <input
                    ref={(input) => (formRef = input)}
                    className="form-control form-control-sm"
                    type="date"
                  />
                </div>
                <div className="col-4 p-2">
                  <label className="form-label">Date To:</label>
                  <input
                    ref={(input) => (toRef = input)}
                    className="form-control form-control-sm"
                    type="date"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-4 p-2">
                  <button
                    onClick={handleClick}
                    className="btn btn-sm my-3 btn-success"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {saleReport.total ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h6>
                      Total:{" "}
                      {saleReport.total[0]["totalAmount"] >= 0 ? (
                        <CurrencyFormat
                          value={saleReport.total[0]["totalAmount"]}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      ) : (
                        0
                      )}
                    </h6>
                    <button
                      onClick={() => OnExport("csv", saleReport.rows)}
                      className="btn btn-sm my-2 btn-success"
                    >
                      Download CSV
                    </button>
                    <button
                      onClick={() => OnExport("xls", saleReport.rows)}
                      className="btn btn-sm my-2 ms-2 btn-success"
                    >
                      Download XLS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SaleReport;
