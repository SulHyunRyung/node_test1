import express from "express";
import mongoose from "mongoose";
import Member from "../schemas/member.schema.js";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());

// 회원 전체 목록 조회 API
router.get("/user", async (req, res) => {
  try {
    const members = await Member.find();
    const formattedMembers = members.map((member) => ({
      userId: member._id,
      name: member.name,
      email: member.email,
      pw: member.pw,
    }));
    res.status(200).json(formattedMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "서버에 접근할 수 없습니다." });
  }
});

// 회원 개별 정보 조회 API
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const member = await Member.findOne({ userId });

    if (member) {
      res.status(200).json({
        _id: member._id,
        userId: member.userId,
        name: member.name,
        email: member.email,
        pw: member.pw,
      });
    } else {
      res.status(404).json({ error: "회원 정보를 찾을 수 없습니다." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "서버에 접근할 수 없습니다." });
  }
});

// 회원 정보 추가 API //
router.post("/user", async (req, res) => {
  try {
    const newMember = new Member({
      name: req.body.name,
      email: req.body.email,
      pw: req.body.pw,
    });

    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
