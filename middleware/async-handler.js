//Handler function to wrap each route.
exports.asyncHandler = (cb) => {
    return async(req,res,next) => {
        try {
            await cb(req,res,next);
        } catch (err) {
            //forward error to the global error handler
            next(err);
        }
    }
}