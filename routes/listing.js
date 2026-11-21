const express = require("express");
const router = express.Router();

const validateListing = require("../middleware/validateListing.js");
const isLoggedIn = require("../middleware/isLoggedIn.js");
const isOwner = require("../middleware/isOwner.js");

const listingControllers = require("../controller/listing.js");
const upload = require("../cloudConfig/multer.js");

// INDEX ROUTE
router.get("/", listingControllers.index);


// NEW ROUTE
router.route("/new")
    .get(isLoggedIn, listingControllers.newForm)
    .post( isLoggedIn, upload.single("image"),validateListing, listingControllers.postListing);

// SHOW ROUTE
router.route("/:id")
    .get(listingControllers.showListing)
    .delete(isLoggedIn, isOwner, listingControllers.deleteListing);


// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, listingControllers.editForm);

// UPDATE ROUTE
router.patch("/:id/new", isLoggedIn, isOwner, validateListing, listingControllers.editListing);




module.exports = router;