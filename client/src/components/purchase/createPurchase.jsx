import React, { Fragment, useEffect, useRef, useState } from "react";
import { BsCartCheck, BsTrash } from "react-icons/bs";

import { useSelector } from "react-redux";
import { IsEmpty } from "../../helper/formValidation/formValidation";
import {
  createPurchaseRequest,
  productDropdownListRequest,
  supplierDropdownListRequest,
} from "../../APIRequest/purchaseApi";
import store from "../../app/store";
import {
  removePurchaseProductList,
  resetPurchaseFormValue,
  resetPurchaseList,
  setPurchaseFormValue,
  setPurchaseFormValueGrandTotal,
  setPurchaseProductList,
} from "../../features/purchase/purchaseSlice";
import { ErrorToast } from "../../helper/notificationAlert/notificationAlert";
import { useNavigate } from "react-router-dom";

const CreatePurchase = () => {
  let productDropdownList = useSelector(
    (state) => state.purchase.productDropdownList
  );
  let supplierDropdownList = useSelector(
    (state) => state.purchase.supplierDropdownList
  );
  let purchaseProductList = useSelector(
    (state) => state.purchase.purchaseProductList
  );
  let purchaseFormValue = useSelector(
    (state) => state.purchase.purchaseFormValue
  );

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
      store.dispatch(setPurchaseProductList(item));
    }
  };
  console.log(qty * unitPrice);

  let grandTotalAmount =
    qty * unitPrice +
    Number(purchaseFormValue.vatTax) +
    Number(purchaseFormValue.otherCost) +
    Number(purchaseFormValue.shippingCost) -
    Number(purchaseFormValue.discount);

  const removeCart = (i) => {
    store.dispatch(removePurchaseProductList(i));
  };

  const handleSumbit = async () => {
    // purchaseFormValue.grandTotall = grandTotalAmount;
    if (!IsEmpty(purchaseFormValue.supplierId)) {
      ErrorToast("Please select Supplier");
    } else if (!IsEmpty(purchaseFormValue.vatTax)) {
      ErrorToast("Please select vat/tax");
    } else if (!purchaseProductList.length > 0) {
      ErrorToast("Please Select Product Information");
    } else {
      let parent = purchaseFormValue;
      let childs = purchaseProductList;
      let result = await createPurchaseRequest(parent, childs);
      if (result) {
        navigate("/purchase-list");
      }
    }
  };

  useEffect(() => {
    productDropdownListRequest();
    supplierDropdownListRequest();
    return () => {
      store.dispatch(resetPurchaseFormValue());
      store.dispatch(resetPurchaseList());
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
                  <h5>Create Purchase</h5>
                  <hr className="bg-light" />
                  <div className="col-12 p-1">
                    <label className="form-label">Supplier</label>
                    <select
                      className="form-select form-select-sm"
                      onChange={(e) =>
                        store.dispatch(
                          setPurchaseFormValue({
                            Name: "supplierId",
                            Value: e.target.value,
                          })
                        )
                      }
                    >
                      <option value="">Select Supplier</option>
                      {supplierDropdownList.map((item, i) => {
                        return (
                          <option key={i.toLocaleString()} value={item._id}>
                            {item.name}
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
                          setPurchaseFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) =>
                        store.dispatch(
                          setPurchaseFormValue({
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
                          setPurchaseFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) =>
                        store.dispatch(
                          setPurchaseFormValue({
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
                          setPurchaseFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) =>
                        store.dispatch(
                          setPurchaseFormValue({
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
                          setPurchaseFormValueGrandTotal(grandTotalAmount)
                        )
                      }
                      onChange={(e) =>
                        store.dispatch(
                          setPurchaseFormValue({
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
                          setPurchaseFormValue({
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
                          setPurchaseFormValueGrandTotal(grandTotalAmount)
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
                          setPurchaseFormValueGrandTotal(grandTotalAmount)
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
                          {purchaseProductList.map((item, i) => {
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

export default CreatePurchase;
