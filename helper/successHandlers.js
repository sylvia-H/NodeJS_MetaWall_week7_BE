function successHandler(res, data) {
  res
    .send({
      status: true,
      data
    })
    .end();
}

module.exports = successHandler;
