import Property from "../models/propertyModel.js";
//   runValidators: true,
const createProperty = async (req, res) => {
  const {
    title,
    description,
    price,
    location,
    type,
    bedrooms,
    bathrooms,
    isAvailable,
    area,
    images,
    purpose,
  } = req.body;
  try {
    const newProperty = new Property({
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      isAvailable,
      area,
      images,
      purpose,
      owner: req.user._id,
    });
    //   const newProperty= await Property.create({title,description,price})
    await newProperty.save();
    res.status(201).json({
      message: "property added!",
      property: newProperty,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to add" });
  }
};
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ properties });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to fetch properties" });
  }
};
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email",
    );
    if (!property) {
      return res.status(404).json({ message: "property not found" });
    }
    return res.status(200).json({ property });
  } catch (err) {
    console.error(err);
    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid property id",
      });
    }
    return res.status(500).json({ message: "failed to fetch property" });
  }
};
const updateProperty = async (req, res) => {
  const {
    title,
    description,
    price,
    location,
    type,
    bedrooms,
    bathrooms,
    isAvailable,
    area,
    images,
    purpose,
  } = req.body;
  const updatedData = {
    title,
    description,
    price,
    location,
    type,
    bedrooms,
    bathrooms,
    isAvailable,
    area,
    images,
    purpose,
  };
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "property not found" });
    }
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    Object.assign(property, updatedData);

    await property.save();
    return res.status(200).json({ message: "property updated!", property });
  } catch (err) {
    console.error(err);
    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid property id",
      });
    }
    return res.status(500).json({ message: "failed to update property" });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "property not found" });
    }
    if (
      property.owner.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await property.deleteOne();

    return res.status(200).json({ message: "property deleted" });
  } catch (err) {
    console.error(err);
    if (err.name === "CastError") {
      return res.status(400).json({
        message: "Invalid property id",
      });
    }
    return res.status(500).json({ message: "failed to delete property" });
  }
};
export  {createProperty,getPropertyById,getAllProperties,deleteProperty,updateProperty}