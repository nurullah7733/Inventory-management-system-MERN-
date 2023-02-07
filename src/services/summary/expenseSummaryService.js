const ExpenseModel = require("../../models/expense/expenseModel");
const ExpenseSummaryService = async (Request) => {
  try {
    let userEmail = Request.headers["email"];
    let data = await ExpenseModel.aggregate([
      { $match: { userEmail: userEmail } },
      {
        $facet: {
          total: [
            {
              $group: {
                _id: 0,
                totalAmount: { $sum: "$amount" },
              },
            },
          ],
          last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                totalAmount: { $sum: "$amount" },
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
module.exports = ExpenseSummaryService;
