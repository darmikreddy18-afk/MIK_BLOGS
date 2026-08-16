const mongoose = require("mongoose");
const path = require("path");
const Category = require("../models/category.js")

require("dotenv").config({
    path: path.join(__dirname, "../.env")
});


const categories = [
    "Web Development",
    "App Development",
    "AI & Machine Learning",
    "Data Science",
    "DSA",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Projects",
    "Hackathons",
    "College Life",
    "Internships",
    "Placements",
    "Career",
    "Entrepreneurship",
    "Startups",
    "Electronics",
    "Robotics",
    "Research",
    "Open Source",
    "Personal Development",
    "Education",
    "Technology",
    "Travel",
    "Photography",
    "Writing",
    "Other"
];

async function seedCategories() {
    try {
        await mongoose.connect(process.env.ATLASDB_URL);

        console.log("Connected to MongoDB");

        await Category.deleteMany({});

        await Category.insertMany(
            categories.map(name => ({ name }))
        );

        console.log("Categories added successfully");

        await mongoose.connection.close();

        console.log("Database connection closed");
    } catch (err) {
        console.error("Error:", err);
    }
}

seedCategories();
