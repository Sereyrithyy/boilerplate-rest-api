const paginate = async (model, page, size, filter = {}, sort = {}) => {
    try {
        const pageNumber = parseInt(page) || 1; // Default page is 1
        const pageSize = parseInt(size) || 10; // Default size is 10

        // Calculate skip value
        const skip = (pageNumber - 1) * pageSize;

        // Total number of documents matching the filter
        const total = await model.countDocuments(filter);

        // Fetch paginated data
        const data = await model.find(filter)
            .sort(sort) // Apply sorting if specified
            .skip(skip) // Skip documents for pagination
            .limit(pageSize); // Limit the number of documents

        // Calculate total pages
        const totalPages = Math.ceil(total / pageSize);

        return {
            data,
            paging: {
                page: pageNumber,
                size: pageSize,
                total,
                totalPages,
            },
        };
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = paginate