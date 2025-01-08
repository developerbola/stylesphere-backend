const Category = require("../models/category.model.js");

const getCategories = async (_, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        const category = new Category({ name, image });
        await category.save();
        return res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(id)
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(201).json(deletedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


module.exports = {
    getCategories,
    addCategory,
    deleteCategory
}