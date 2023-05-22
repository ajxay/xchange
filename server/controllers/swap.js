import SwapRequest from "../models/swapRequest.js";
import PostMessage from "../models/postMessage.js";

export const createRequest = async (req, res) => {
  // const creator = await User.findById(req.userId);
  const request = req.body;
  const newRequest = new SwapRequest({
    ...request,
    createdAt: new Date().toISOString(),
  });
  try {
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getRequest = async (req, res) => {
  const user = req.userId;

  try {
    const requests = await SwapRequest.find({
      $or: [{ receiver: user }, { sender: user }],
    });
    res.status(201).json(requests);
    console.log(requests, "req");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const acceptRequest = async (req, res) => {
  const { requestId, selected } = req.query;

  const user = req.userId;

  try {
    const request = await SwapRequest.findById(requestId);
    const post = await PostMessage.findById(request.book);
    post.exchanged = true;
    const updatedPost = await PostMessage.findByIdAndUpdate(
      request.book,
      post,
      {
        new: true,
      }
    );
    const selectedPost = await PostMessage.findById(selected);
    selectedPost.exchanged = true;
    const updatedSelectedPost = await PostMessage.findByIdAndUpdate(
      selected,
      selectedPost
    );
    request.status = "accepted";
    request.opted = selected;
    const updatedRequest = await SwapRequest.findByIdAndUpdate(
      requestId,
      request,
      {
        new: true,
      }
    );

    res.status(201).json(updatedRequest);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};
export const declineRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await SwapRequest.findById(id);

    request.status = "declined";
    const updatedRequest = await SwapRequest.findByIdAndUpdate(id, request, {
      new: true,
    });
    console.log(updatedRequest, "updated");

    res.status(201).json(updatedRequest);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllRequest = async (req, res) => {
  try {
    const request = await SwapRequest.find();
    res.status(200).json(request);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
