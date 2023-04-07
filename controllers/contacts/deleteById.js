const {Contact} = require("../../models/contacts");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const contactDelete = await Contact.findByIdAndDelete(id);
  if (!contactDelete) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
