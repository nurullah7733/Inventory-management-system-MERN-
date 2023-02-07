const ReportService = async (Request, DataModel) => {
  let userEmail = Request.headers.email;
  let fromDate = Request.body.fromDate;
  let toDate = Request.body.toDate;

  try {
    let data = await DataModel.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          total: [{ $group: { _id: 0, totalAmount: { $sum: "$total" } } }],
          rows: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "productName",
              },
            },
            { $unwind: "$productName" },
            {
              $lookup: {
                from: "brands",
                localField: "productName.brandId",
                foreignField: "_id",
                as: "brandName",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "productName.categoryId",
                foreignField: "_id",
                as: "categoryName",
              },
            },
          ],
        },
      },
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = ReportService;
