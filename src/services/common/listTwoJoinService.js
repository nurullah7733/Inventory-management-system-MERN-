const listTwoJoinService = async (
  Request,
  DataModel,
  searchArray,
  joinStage1,
  joinStage2
) => {
  let pageNo = Number(Request.params.pageNo);
  let perPage = Number(Request.params.perPage);
  let searchKeyword = Request.params.searchKeyword;
  let skipRow = (pageNo - 1) * perPage;
  let userEmail = Request.headers.email;

  let data;

  try {
    if (searchKeyword !== "0") {
      let searchQuery = { $or: searchArray };
      data = await DataModel.aggregate([
        { $match: { userEmail: userEmail } },
        joinStage1,
        joinStage2,
        { $match: searchQuery },
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        { $match: { userEmail: userEmail } },
        joinStage1,
        joinStage2,
        {
          $facet: {
            total: [{ $count: "count" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = listTwoJoinService;
