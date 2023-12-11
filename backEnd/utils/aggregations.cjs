exports.commonAggregations = {
  // Unwind the 'data' array to create a separate document for each element in the array
  unwindData: () => ({ $unwind: '$data' }),

  // Unwind the 'documents' array to create a separate document for each element in the array
  unwindDocuments: () => ({ $unwind: '$documents' }),

  // Match documents where the 'slug' in 'data' is not equal to the specified 'currentSlug'
  matchSlugNotEqual: (currentSlug) => ({
    $match: { 'data.slug': { $ne: `${currentSlug}` } },
  }),

  // Match documents by type
  matchByType: (type) => ({ $match: { type: `${type}` } }),

  // Replace the root document with the 'documents' array
  replaceRootWithDocuments: () => ({ $replaceRoot: { newRoot: '$documents' } }),

  // Project a new field 'slug' based on the 'data.slug' field
  projectSlug: () => ({ $arrayElemAt: [{ $split: ['$data.slug', '/'] }, 1] }),
};
