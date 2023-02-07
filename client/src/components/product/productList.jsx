import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { deleteSupplier, SupplierListApi } from "../../APIRequest/supplierApi";
import { deleteItem } from "../../helper/deleteAlert";
import { removeSupplier } from "../../features/supplier/supplierSlice";
import store from "../../app/store";
import { deleteProduct, listBrandRequest } from "../../APIRequest/productApi";
import { removeProductList } from "../../features/product/productSlice";

const ProductList = () => {
  let { productListTotal, productList } = useSelector((state) => state.product);

  let [pageNo, setPageNo] = useState(1);
  let [perPage, setPerPage] = useState(20);
  let [searchKeyword, setSearchKeyword] = useState("0");
  let [searchValue, setSearchValue] = useState("");
  let totalPage = Math.ceil(productListTotal / perPage);
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
    listBrandRequest(pageNo, perPage, searchKeyword);
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
      let rst = await deleteProduct(id);
      if (rst) {
        store.dispatch(removeProductList(id));
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
                      <h5>Product List</h5>
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
                                Product Name
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Category
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Brand
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Unit
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Details
                              </td>
                              <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Action
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {productList.map((item, i) => (
                              <tr key={i}>
                                <td>
                                  <p className="text-xs text-start">{i + 1}</p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.name}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.category.length > 0
                                      ? item.category[0].name
                                      : ""}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.brand.length > 0
                                      ? item.brand[0].name
                                      : ""}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.unit}
                                  </p>
                                </td>
                                <td>
                                  <p className="text-xs text-start">
                                    {item.details}
                                  </p>
                                </td>

                                <td>
                                  <Link
                                    to={`/product?id=${item._id}`}
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

export default ProductList;
