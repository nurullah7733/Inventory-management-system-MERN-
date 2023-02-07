const salesModel = require("../../models/sales/salesModel");
const salesSummaryService = async (Request) => {
  try {
    let userEmail = Request.headers["email"];

    let data = await salesModel.aggregate([
      { $match: { userEmail: userEmail } },
      {
        $facet: {
          total: [
            {
              $group: {
                _id: 0,
                totalAmount: { $sum: "$grandTotal" },
              },
            },
          ],
          last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%d-%m-%Y", date: "$createdAt" },
                },
                totalAmount: { $sum: "$grandTotal" },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = salesSummaryService;
