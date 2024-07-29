const express = require('express');
const { parseQuoteFile } = require('../services/parseServiceQuoteConvert');

exports.convertQuoteFile =  async (req, res) => {
  const filePath = req.file.path;

  try {
    const message = await parseQuoteFile(filePath);
    console.log('Ajout réussi')
    res.send({message : "ajout réussi"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};