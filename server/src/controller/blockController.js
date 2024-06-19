import Block from "../model/Block.js";

export const getBlocks = async (_, res) => {
  try {
    const blocks = await Block.find({});
    return res.status(200).json({ success: true, blocks });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

export const addBlock = async (req, res) => {
  try {
    const block = new Block(req.body);
    await block.save();
    const blocks = await Block.find({});
    return res.status(200).json({ success: true, blocks });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

export const updateBlock = async (req, res) => {
  try {
    const block = await Block.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    const blocks = await Block.find({});
    return res.status(200).json({ success: true, blocks, block });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};

export const deleteBlock = async (req, res) => {
  try {
    const block = await Block.findOneAndDelete(
      { _id: req.params.id },
      { new: true }
    );
    if (!block) {
      return res
        .status(404)
        .json({ success: false, message: "Block not found" });
    }
    const blocks = await Block.find({});
    return res.status(200).json({ success: true, blocks });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Something went wrong" });
  }
};
