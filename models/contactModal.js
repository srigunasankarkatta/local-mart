const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: ["please provide a name"],
    },
    email: {
      type: "string",
      required: ["please provide a name"],
    },
    phone: {
      type: "string",
      required: ["please provide a name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
