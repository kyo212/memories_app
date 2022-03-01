const express = require("express");
const jwt = require("jsonwebtoken");

// JWTトークンの認証ミドルウェア - JWTが有効か無効化を検証する
exports.verifyJWT = async (req, res, next) => {
  // クライアントからトークンが送られて、受け取る
  const token = req.cookies.token;
  try {
    // SECRET_KEYを元にverify関数で検証 (token,secret,cb)
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user; // トークンがデコードされたもの
    await next(); // 次のステップに進む
  } catch (err) {
    // トークンの期限が切れているかjwtが渡ってこないとき、クッキーを削除する
    res.clearCookie("token");
    res.redirect("/"); // この記述がないとcookieがclearされない
  }
};
