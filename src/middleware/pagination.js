const getPagination = (req, res, next) => {
  const page = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.pageSize, 10);
  if (!Number.isNaN(page) && !Number.isNaN(pageSize)) {
    req.pagination = {
      page,
      pageSize,
    };
    return next();
  }
  throw new Error('page setting is incorrect');
};

module.exports = {
  getPagination,
};
