const aggPipeline = require('./aggPipelineStages.cjs');

// TODO: UNDERSTAND THE DIFFERENCE OF PROJECT WITH MAP AND WITHOUT MAP

exports.createGuideAggPipeline = (type) => [
  aggPipeline.stages.matchByType(type),
  {
    $project: {
      data: {
        $map: {
          input: '$data',
          as: 'item',
          in: {
            title: '$$item.title',
            subtitle: '$$item.subtitle',
            slug: '$$item.slug',
            icon: '$$item.icon',
          },
        },
      },
    },
  },
];

exports.createNewsAggPipeline = (type, slug) => [
  aggPipeline.stages.matchByType(type),
  aggPipeline.stages.unwindData(),
  {
    $match: {
      'data.slug': { $ne: slug },
    },
  },
  {
    $project: {
      data: {
        title: '$data.title',
        coverImg: '$data.coverImg',
        slug: aggPipeline.stages.projectSlug('$data.slug'),
        publishDate: {
          $dateToString: {
            format: '%m/%Y',
            date: '$data.publishDate',
          },
        },
      },
    },
  },
  {
    $replaceRoot: {
      newRoot: '$data',
    },
  },
];

exports.getDataByTypeAgg = (type) => [
  aggPipeline.stages.matchByType(type),
  {
    $project: {
      title: 1,
      subtitle: 1,
      data: {
        $map: {
          input: '$data',
          as: 'item',
          in: {
            slug: '$$item.slug',
            title: '$$item.title',
            content: '$$item.content',
            coverImg: '$$item.coverImg',
          },
        },
      },
    },
  },
];

exports.overviewPagePipeline = [
  {
    // Project stage: Shape the output document by including specific fields
    $project: {
      // Include the 'title' and 'subtitle' fields in the output document
      title: 1,
      subtitle: 1,
      // Use the 'map' operator to transform the 'data' array
      data: {
        $map: {
          // Specify the input array for 'map' as the 'data' field
          input: '$data',
          // Define a variable 'item' to represent each element in the 'data' array
          as: 'item',
          // Specify the transformation for each element in the 'data' array
          in: {
            title: '$$item.title',
            slug: '$$item.slug',
          },
        },
      },
    },
  },
];

exports.guidePagePipeline = (type, slug) => [
  aggPipeline.stages.matchByType(type),
  aggPipeline.stages.unwindData(),
  aggPipeline.stages.matchSlugNotEqual(slug),
  {
    // Group the docs to create a new array 'documents' with specified fields
    $group: {
      _id: null,
      documents: {
        $push: {
          title: '$data.title',
          slug: aggPipeline.stages.projectSlug('$data.slug'),
        },
      },
    },
  },
  aggPipeline.stages.unwindDocuments(),
  aggPipeline.stages.replaceRootWithDocuments(),
];

exports.countDataArr = (type) => [
  aggPipeline.stages.matchByType(type),
  {
    $project: {
      count: {
        $size: '$data',
      },
    },
  },
];
