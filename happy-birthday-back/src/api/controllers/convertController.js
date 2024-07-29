const express = require('express');
const { parseFile } = require('../services/parseServiceConvert');

exports.convertFile =  async (req, res) => {
  const filePath = req.file.path;

  try {
    const message = await parseFile(filePath);
    console.log('Ajout réussi')
    res.send(message);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error);
  }
};
