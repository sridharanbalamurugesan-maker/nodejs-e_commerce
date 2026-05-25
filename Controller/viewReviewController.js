const reviewProduct = require("../Models/reviewProduct");

exports.getProductReviews = async (req, res) => {
    try {

        const productId = req.params.id;
        console.log("Product",productId);

        const reviews = await reviewProduct
            .find({ product: productId })
            .populate("user", "name").sort({ createdAt: -1 });;
            // console.log("Reviews", reviews);

        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};