const listService = async (Request, DataModel, searchArray) => {
  let pageNo = Number(Request.params.pageNo);
  let perPage = Number(Request.params.perPage);
  let searchKeyword = Request.params.searchKeyword;
  let skipRow = (pageNo - 1) * perPage;
  let userEmail = Request.headers.email;

  let data;

  try {
    if (searchKeyword !== "0") {
      //  let searchRegex = {$regex: searchKeyword, $options: "i"};
      let searchQuery = { $or: searchArray };
      data = await DataModel.aggregate([
        { $match: { userEmail: userEmail } },
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

module.exports = listService;
