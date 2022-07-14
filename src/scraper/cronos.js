

import { sendNotification } from "../email/nodemailer.js"
import Operation from "../schemas/operationsSchema.js"
import User from "../schemas/userSchema.js"
import getTime from "../utils/getTime.js"
import { urlData } from "./indexScraper.js"

export const mappingOperations = async () => {
  // SACAR TODAS LAS OPERACIONES INDIVIDUALIZADAS DE LA BBD Y MAPEARLAS UNA POR UNA PARA EJECUTAR LA COMPROBACION DE LA HORA
  const operations = await Operation.find()

  for (let l = 0; l <= operations.length - 1; l++) {
    const Op = operations[l]
    const lastData = Op.data[Op.data.length - 1]
    const time = Op.time

    const currentTime = new Date(getTime())
    const lastTime = new Date(lastData.date)
    const nextTime = lastTime.setHours(lastTime.getHours() + time)


    // COMPARACIÓN DE SI LA HORA QUE ESTA EN LA BBD ES MENOR A LA ACTUAL Y EJECUCION DEL SCRAPPING  
    if (nextTime < currentTime.getTime()) {
      const data = await urlData(Op.url, Op.selector)
      try {
        await Operation.updateOne({ selector: Op.selector, user: Op.user, url: Op.url },
          { $push: { data: { date: getTime(), data: data } } })
      } catch (error) {
        console.log(error);
      }

      // SI LOS DATOS ESCRAPEADOS CAMBIAN QUE ENVIE UN EMAIL
      if (data !== lastData.data) {
        const emailDB = await User.findById(Op.user).select({ email: 1, _id: 0 })
        const { email } = emailDB
        const mailOptions = {
          from: 'crawlerj6@gmail.com',
          to: `${email}`,
          subject: 'New Data',
          html: `<h1>Hi!</h1><p>The Crawler has found new data in the page ${Op.url}.</p> <br><p>The new data is ${data}</p>`
        }
        sendNotification(mailOptions)
      }
    }



    // console.log(lastTime, time, nextTime / 1000 / 60, currentTime, (nextTime - currentTime.getTime()) / 1000 / 60);

  }
}




export const cronoScraper = () => {
  const fiveMinutes = 1000 * 60 * 5
  setInterval(() => {
    mappingOperations()
  }, `${fiveMinutes}`)
}


