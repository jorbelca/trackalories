import axios from 'axios'
import { JSDOM } from 'jsdom'

export const urlData = async (url, selector) => {
  const urlHost = await transformURL(url)
  { urlHost !== undefined ? urlHost : '' }
  try {
    const { data: html } = await axios.get(url, {
      headers: {
        Accept: 'application/json, text/plain, */*, text/html',
        Connection: "keep-alive",
        'User-Agent': "Mozilla/5.0(Macintosh; Intel Mac OS X 10_15_7)AppleWebKit/605.1.15(KHTML,like Gecko)Version/15.5 Safari/605.1.15",
        Host: `${urlHost}`
      }
    })

    const dom = new JSDOM(html)

    const getElement = (selector) => {
      return dom.window.document.querySelector(selector).textContent
    }
    const data = await getElement(selector)
    return data
  } catch (error) {
    console.log(error);
    return error
  }


}




const transformURL = (url) => { if (url) return url.match(/\b((www)\.)[-A-Z0-9+&@#%?=~_|$!:,.;]*/ig)[0] }