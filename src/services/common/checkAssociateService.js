const checkAssociateService = async (queryObject, dataModel) => {
  try {
    let deleteData = await dataModel.aggregate([{ $match: queryObject }]);

    return deleteData.length > 0;
  } catch (error) {
    return false;
  }
};

module.exports = checkAssociateService;
