import Client from '../models/client.model';

async function getUserList(req, res, next) {
  const clientListPipeline = [];
  // get the lots of the client and calculate the number of lots
  clientListPipeline.push({
    $lookup: {
      from: 'lots',
      localField: '_id',
      foreignField: 'client',
      as: 'lots',
    },
  });
  clientListPipeline.push({
    $addFields: {
      numberOfLots: {
        $size: '$lots',
      },
    },
  });

  const paginationPipeline = [];
  paginationPipeline.push({ $skip: req.pagination.page * req.pagination.pageSize });
  paginationPipeline.push({ $limit: req.pagination.pageSize });

  // get the total number of the clients
  // for the frontend know if it's the end of the pagination
  clientListPipeline.push({
    $facet: {
      clients: paginationPipeline,
      count: [
        { $count: 'count' },
      ],
    },
  });

  try {
    const result = await Client.aggregate(clientListPipeline);
    // keep some keys that we need
    const processedClients = {
      clients: result[0].clients.map(client => ({
        name: client.fullname,
        email: client.email,
        numberOfLots: client.numberOfLots,
      })),
      count: Array.isArray(result[0].count) && result[0].count.length ?
        result[0].count[0].count : 0,
    };
    return res.json(processedClients);
  } catch (err) {
    return next(new Error('something wrong in the research'));
  }
}

module.exports = {
  getUserList,
};
