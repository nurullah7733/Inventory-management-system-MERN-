import React, { Fragment, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteExpenseType,
  listExpenseType,
} from "../../APIRequest/expenseTypeApi";
import { deleteItem } from "../../helper/deleteAlert";
import store from "../../app/store";
import { deleteExpenseTypeFromList } from "../../features/expenseType/expenseTypeSlice";

const ExpenseList = () => {
  let total = useSelector((state) => state.expenseType.expenseTypeTotal);
  let list = useSelector((state) => state.expenseType.expenseTypeList);

  let [pageNo, setPageNo] = useState(1);
  let [perPage, setPerPage] = useState(20);
  let [searchKeyword, setSearchKeyword] = useState("0");
  let [searchValue, setSearchValue] = useState("0");
  let totalPage = Math.ceil(total / perPage);

  const handlePageClick = (value) => {
    setPageNo(value.selected + 1);
  };
  const perPageOnChange = (e) => {
    setPerPage(e.target.value);
  };

  const handleSearchKeyword = (e) => {
    setSearchValue(e.target.value);
  };
  const searchClick = () => {
    setPageNo(1);
    if (searchValue.length === 0) {
      setSearchKeyword("0");
    } else {
      setSearchKeyword(searchValue);
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

  useEffect(() => {
    listExpenseType(pageNo, perPage, searchKeyword);
  }, [pageNo, perPage, searchKeyword]);

  const deleteCustomerHandleClick = async (id) => {
    let confirm = await deleteItem();
    if (confirm.isConfirmed) {
      let result = await deleteExpenseType(id);
      if (result) {
        store.dispatch(deleteExpenseTypeFromList(id));
      }
    }
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
                      <h5>Expense List</h5>
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
                                No
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Expense Type
                              </td>

                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Action
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {list.map((item, i) => (
                              <tr key={i}>
                                <td>
                                  <p className="text-xs text-start">{i + 1}</p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    <h6> {item.name}</h6>
                                  </p>
                                </td>

                                <td>
                                  <Link
                                    to={`/expense-type?id=${item._id}`}
                                    className="btn text-info btn-outline-light p-2 mb-0 btn-sm"
                                  >
                                    <AiOutlineEdit size={15} />
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

export default ExpenseList;
