import express from 'express'
import { urlData } from "../scraper/indexScraper.js";
import tokenExtractor from '../utils/tokenExtractor.js';


const searchRouter = express.Router()


searchRouter.post('/', tokenExtractor, async (req, res) => {
  const { url, selector } = req.body

  try {
    const response = await urlData(url, selector)


    if (response) res.status(200).send({ response });
  } catch (error) {
    console.log(error);

    return res.status(400).send(error)
  }

});


export default searchRouter