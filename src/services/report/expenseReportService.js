const expenseReportService = async (Request, DataModel) => {
  let userEmail = Request.headers.email;
  let fromDate = Request.body.fromDate;
  let toDate = Request.body.toDate;

  try {
    let result = await DataModel.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          total: [{ $group: { _id: 0, totalAmount: { $sum: "$amount" } } }],
          rows: [
            {
              $lookup: {
                from: "expensetypes",
                localField: "typeId",
                foreignField: "_id",
                as: "type",
              },
            },
          ],
        },
      },
    ]);
    return { status: "success", data: result };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = expenseReportService;
