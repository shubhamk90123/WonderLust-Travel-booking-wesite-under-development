const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggiedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controller/listings.js");

//Index route


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggiedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New route
router.get("/new", isLoggiedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router;

//Edit route
router.get(
  "/:id/edit",
  isLoggiedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//update route
router.put(
  "/:id",
  isLoggiedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);

//Delete Route
router.delete(
  "/:id",
  isLoggiedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
