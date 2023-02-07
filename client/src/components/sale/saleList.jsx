import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { Link } from "react-router-dom";
import { deleteItem } from "../../helper/deleteAlert";
import store from "../../app/store";
import { deleteSaleRequest, listSaleRequest } from "../../APIRequest/saleApi";
import { removeSaleList } from "../../features/sale/saleSlice";

const SaleList = () => {
  let saleListTotal = useSelector((state) => state.sale.saleListTotalListTotal);
  let saleList = useSelector((state) => state.sale.saleList);

  let [pageNo, setPageNo] = useState(1);
  let [perPage, setPerPage] = useState(20);
  let [searchKeyword, setSearchKeyword] = useState("0");
  let [searchValue, setSearchValue] = useState("");
  let totalPage = Math.ceil(saleListTotal / perPage);
  let searchClick = () => {
    if (searchValue.length === 0) {
      setSearchKeyword("0");
    } else {
      setSearchKeyword(searchValue);
    }
  };

  let handleSearchKeyword = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    listSaleRequest(pageNo, perPage, searchKeyword);
  }, [pageNo, perPage, searchKeyword]);

  let perPageOnChange = (e) => {
    setPerPage(e.target.value);
  };

  let handlePageClick = (value) => {
    setPageNo(value.selected + 1);
  };

  let deleteCustomerHandleClick = async (id) => {
    let result = await deleteItem();
    if (result.isConfirmed) {
      let rst = await deleteSaleRequest(id);
      if (rst) {
        store.dispatch(removeSaleList(id));
      }
    }
  };

  const TextSearch = (e) => {
    let rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      row.style.display = row.innerText
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
        ? ""
        : "none";
    });
  };

  return (
    <Fragment>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-4">
                      <h5>Sale List</h5>
                    </div>

                    <div className="col-2">
                      <input
                        onKeyUp={TextSearch}
                        placeholder="Text Filter"
                        className="form-control form-control-sm"
                      />
                    </div>

                    <div className="col-2">
                      <select
                        onChange={perPageOnChange}
                        className="form-control mx-2 form-select-sm form-select form-control-sm"
                      >
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                        <option value="50">50 Per Page</option>
                        <option value="100">100 Per Page</option>
                        <option value="200">200 Per Page</option>
                      </select>
                    </div>
                    <div className="col-4">
                      <div className="input-group mb-3">
                        <input
                          onChange={handleSearchKeyword}
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search.."
                          aria-label="Recipient's username"
                          aria-describedby="button-addon2"
                        />
                        <button
                          onClick={searchClick}
                          className="btn  btn-success btn-sm mb-0"
                          type="button"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive table-section">
                        <table className="table ">
                          <thead className="sticky-top bg-white">
                            <tr>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                #No
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Customer
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Grand Total
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Shipping Cost
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Vat/Tax
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Other Cost
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Discount
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Date
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Action
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {saleList.map((item, i) => (
                              <tr key={i}>
                                <td>
                                  <p className="text-xs text-start">{i + 1}</p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.customer.length > 0
                                      ? item.customer[0].customerName
                                      : ""}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.grandTotal}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.shippingCost}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.vatTax}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.otherCost}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.discount}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {moment(item.createdAt).format("MMM Do YY")}
                                  </p>
                                </td>

                                <td>
                                  <Link
                                    className="btn text-info btn-outline-light p-2 mb-0 btn-sm"
                                    onClick={() =>
                                      Swal.fire({
                                        title:
                                          "<strong>This is not dynamic</strong>",
                                        icon: "info",
                                        html: "<h1>This is not dynamic</h1>",
                                        showCloseButton: true,
                                        // showCancelButton: true,
                                      })
                                    }
                                  >
                                    <GrView color="blue" size={15} />
                                  </Link>
                                  <button
                                    onClick={() =>
                                      deleteCustomerHandleClick(item._id)
                                    }
                                    className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"
                                  >
                                    <AiOutlineDelete size={15} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-12 mt-5">
                      <nav aria-label="Page navigation example">
                        <ReactPaginate
                          previousLabel="<"
                          nextLabel=">"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          breakLabel="..."
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          pageCount={totalPage}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageClick}
                          containerClassName="pagination"
                          activeClassName="active"
                        />
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SaleList;