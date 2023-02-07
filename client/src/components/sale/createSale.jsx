import React, { Fragment, useEffect, useRef, useState } from "react";
import { BsCartCheck, BsTrash } from "react-icons/bs";

import { useSelector } from "react-redux";
import { IsEmpty } from "../../helper/formValidation/formValidation";
import {
  createSaleRequest,
  customerDropdownListRequest,
  productDropdownListRequest,
} from "../../APIRequest/saleApi";
import store from "../../app/store";
import {
  setSaleFormValue,
  removesetSaleProductListAddToCard,
  setSaleProductListAddToCard,
  setSaleFormValueGrandTotal,
  resetSaleFormValue,
  resetSaleProductListAddToCard,
} from "../../features/sale/saleSlice";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";
import { useNavigate } from "react-router-dom";

const CreateSale = () => {
  let productDropdownList = useSelector(
    (state) => state.sale.productDropdownList
  );
  let customerDropdownList = useSelector(
    (state) => state.sale.customerDropdownList
  );
  let saleAddToCardList = useSelector((state) => state.sale.saleAddToCardList);
  let saleFormValue = useSelector((state) => state.sale.saleFormValue);

  let navigate = useNavigate();

  let [unitPrice, setUnitPrice] = useState(0);
  let [qty, setQty] = useState(0);
  let productRef = useRef();

  const OnAddCart = () => {
    let productId = productRef.value;
    let productName = productRef.selectedOptions[0].text;

    if (!IsEmpty(productId)) {
      ErrorToast("Please select Product");
    } else if (!IsEmpty(unitPrice)) {
      ErrorToast("Unit Price is required");
    } else if (!IsEmpty(qty)) {
      ErrorToast("Quantity is required");
    } else {
      let item = {
        productId,
        productName: productName,
        qty: qty,
        unitCost: unitPrice,
        total: parseInt(qty * unitPrice),
      };
      store.dispatch(setSaleProductListAddToCard(item));
    }
  };

  let grandTotalAmount =
    qty * unitPrice +
    Number(saleFormValue.vatTax) +
    Number(saleFormValue.otherCost) +
    Number(saleFormValue.shippingCost) -
    Number(saleFormValue.discount);

  const removeCart = (i) => {
    store.dispatch(removesetSaleProductListAddToCard(i));
  };

  const handleSumbit = async () => {
    if (!IsEmpty(saleFormValue.customerId)) {
      ErrorToast("Please select Customer");
    } else if (!IsEmpty(saleFormValue.vatTax)) {
      ErrorToast("Please select vat/tax");
    } else if (!saleAddToCardList.length > 0) {
      ErrorToast("Please Add to card Product");
    } else {
      let parent = saleFormValue;
      let childs = saleAddToCardList;
      let result = await createSaleRequest(parent, childs);
      if (result) {
        navigate("/sale-list");
      }
    }
  };

  useEffect(() => {
    customerDropdownListRequest();
    productDropdownListRequest();
    return () => {
      store.dispatch(resetSaleFormValue());
      store.dispatch(resetSaleProductListAddToCard());
    };
  }, []);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <div className="row">
                  <h5>Create Sale</h5>
                  <hr className="bg-light" />
                  <div className="col-12 p-1">
                    <label className="form-label">Customer</label>
                    <select
                      className="form-select form-select-sm"
                      onChange={(e) =>
                        store.dispatch(
                          setSaleFormValue({
                            Name: "customerId",
                            Value: e.target.value,
                          })
                        )
                      }
                    >
                      <option value="">Select Customer</option>
                      {customerDropdownList.map((item, i) => {
                        return (
                          <option key={i.toLocaleString()} value={item._id}>
                            {item.customerName}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Vat/Tax</label>
                    <input
                      onKeyUp={(e) =>
                        store.dispatch(
                          setSaleFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) =>
                        store.dispatch(
                          setSaleFormValue({
                            Name: "vatTax",
                            Value: e.target.value,
                          })
                        )
                      }
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Discount</label>
                    <input
                      onKeyUp={(e) =>
                        store.dispatch(
                          setSaleFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) =>
                        store.dispatch(
                          setSaleFormValue({
                            Name: "discount",
                            Value: e.target.value,
                          })
                        )
                      }
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Other Cost</label>
                    <input
                      onKeyUp={(e) =>
                        store.dispatch(
                          setSaleFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) =>
                        store.dispatch(
                          setSaleFormValue({
                            Name: "otherCost",
                            Value: e.target.value,
                          })
                        )
                      }
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Shipping Cost</label>
                    <input
                      onKeyUp={(e) =>
                        store.dispatch(
                          setSaleFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) =>
                        store.dispatch(
                          setSaleFormValue({
                            Name: "shippingCost",
                            Value: e.target.value,
                          })
                        )
                      }
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Grand Total</label>
                    <input
                      readOnly
                      className="form-control form-control-sm"
                      type="number"
                      value={parseInt(grandTotalAmount)}
                    />
                  </div>

                  <div className="col-12 p-1">
                    <label className="form-label">Note</label>
                    <input
                      onChange={(e) =>
                        store.dispatch(
                          setSaleFormValue({
                            Name: "note",
                            Value: e.target.value,
                          })
                        )
                      }
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                    <button
                      onClick={handleSumbit}
                      className="btn btn-sm my-3 btn-success"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-8 mb-3">
            <div className="card  h-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-6  p-1">
                    <label className="form-label">Select Product</label>
                    <select
                      ref={(input) => (productRef = input)}
                      className="form-select form-select-sm"
                    >
                      <option value="">Select Product</option>
                      {productDropdownList.map((item, i) => {
                        return (
                          <option key={i.toLocaleString()} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Qty</label>
                    <input
                      onKeyUp={(e) =>
                        store.dispatch(
                          setSaleFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) => setQty(e.target.value)}
                      className="form-control form-control-sm"
                      type="number"
                    />
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Unit Price</label>
                    <input
                      onKeyUp={(e) =>
                        store.dispatch(
                          setSaleFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) => setUnitPrice(e.target.value)}
                      type="number"
                      className="form-control form-control-sm"
                    />
                  </div>
                  <div className="col-2 p-1">
                    <label className="form-label">Add to cart</label>
                    <button
                      onClick={OnAddCart}
                      className="btn w-100 btn-success btn-sm"
                    >
                      <BsCartCheck />
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive table-section">
                      <table className="table-sm text-center table">
                        <thead className="sticky-top bg-white">
                          <tr>
                            <th>Name</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {saleAddToCardList.map((item, i) => {
                            return (
                              <tr key={i}>
                                <td>{item.productName}</td>
                                <td>{item.qty}</td>
                                <td>{item.unitCost}</td>
                                <td>{item.total}</td>
                                <td>
                                  <button
                                    onClick={() => removeCart(i)}
                                    className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"
                                  >
                                    <BsTrash />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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

export default CreateSale;
