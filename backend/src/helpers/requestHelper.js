export const buildPagination = (req) => {
    let pagination = {
        page: 1,
        limit: 10,
        skip: 0
    }

    if (req?.query?.page) {
        pagination.page = Number.parseInt(req.query.page) || 1
    }
    if (req?.query?.limit) {
        pagination.limit = Number.parseInt(req.query.limit) || 10
    }

    pagination.skip = (pagination.page - 1) * pagination.limit

    return pagination;
}