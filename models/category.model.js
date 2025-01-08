const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
    {
        name: { type: String, required: [true, "Category name is required"] },
        image: { type: String, required: [true, "Category image is required"] },
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;