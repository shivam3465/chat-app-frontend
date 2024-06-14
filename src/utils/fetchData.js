const asyncFetcher = async (fun) => {
    try {
        const {data} = await fun();
        return [data, null];
    } catch (error) {
        console.error(error);
        return [null, error];
    }
};

export { asyncFetcher };
